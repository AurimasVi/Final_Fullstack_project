import { NavLink } from "react-router-dom";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { subDays, addDays, setHours, setMinutes } from "date-fns";
import { Button } from "../../components/Button/Button";
import Select from "react-select";

export const Home = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    clientEmail: "",
    date: new Date(),
    service: null,
  });

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
    console.log(formData);
  };

  const handleServiceChange = (selectedOption) => {
    if (selectedOption) {
      setFormData({
        ...formData,
        service: selectedOption.value,
      });
    } else {
      setFormData({
        ...formData,
        service: null,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // register client's visit API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/clients/registerAppointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = "http://localhost:3000/";
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const options = [
    { value: "Plaukų kirpimas", label: "Plaukų kirpimas" },
    { value: "Manikiūras", label: "Manikiūras" },
    { value: "Barzdos tvarkymas", label: "Barzdos tvarkymas" },
  ];
  return (
    <>
      <div>
        <h1>Klientų registravimo sistema</h1>
        {!localStorage.getItem("user") && (
          <>
            <p>
              Norint užregistruoti klientą jo grožio procedūroms, pirmiausia
              prisijunkite arba užsiregistruokite
            </p>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </div>
      {localStorage.getItem("user") && (
        <div className="clientRegistrationWrapper">
          <p>Užregistruok klientą</p>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              inputName="firstName"
              placeHolder="Vardas"
              className="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              type="text"
              inputName="lastName"
              placeHolder="Pavardė"
              className="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Input
              type="email"
              inputName="clientEmail"
              placeHolder="El. Paštas"
              className="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
            />
            <Select
              options={options}
              value={formData.service}
              onChange={(selectedOption) => handleServiceChange(selectedOption)}
              placeholder={
                formData.service ? formData.service : "Pasirinkite paslauga..."
              }
            />
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              placeholderText="Pasirinkite datą..."
              name="date"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="MMMM d, yyyy HH:mm"
              includeDateIntervals={[
                { start: subDays(new Date(), 1), end: addDays(new Date(), 60) },
              ]}
              minTime={setHours(setMinutes(new Date(), 0), 9)}
              maxTime={setHours(setMinutes(new Date(), 30), 20)}
              filterTime={filterPassedTime}
            />
            <Button buttonText="Užregistruoti klientą" type="submit" />
          </Form>
        </div>
      )}
    </>
  );
};
