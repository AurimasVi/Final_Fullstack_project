import { NavLink } from "react-router-dom";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { subDays, addDays, setHours, setMinutes } from "date-fns";
import { Button } from "../../components/Button/Button";
import Select from "react-select";
import { Modal } from "../../components/Modal/Modal";
import { ModalContent } from "../../components/ModalContent/ModalContent";

export const Home = () => {
  // form
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
        alert(
          "Registracija nepavyko, įvesti netinkami vardas/pavardė prie kliento"
        );
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

  // -------------------------------------------------------------------
  // fetch all appointments
  // -------------------------------------------------------------------
  const [fetchedAppointments, setFetchedAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/clients/getClients"
      );
      if (response.ok && localStorage.getItem("user")) {
        const data = await response.json();
        setFetchedAppointments(data);
      } else {
        alert("Nepavyko gauti duomenu");
      }
    } catch (error) {
      console.error(error);
      alert("Nepavyko gauti duomenu");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);
  // -------------------------------------------------------------------
  // edit and delete appointments
  // -------------------------------------------------------------------
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [editedDate, setEditedDate] = useState(formData.date);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  // modal TODO
  const [showModal, setShowModal] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const handleCloseModal = () => {
    setShowModal(null);
  };

  const handleDeleteAppointment = (clientId, appointmentId) => {
    setSelectedClientId(clientId);
    setSelectedAppointmentId(appointmentId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/clients/updateAppointment/${selectedClientId}/${selectedAppointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "delete" }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        fetchAppointments();
      } else {
        console.error("Deletion failed");
      }
    } catch (error) {
      console.error(error);
    }

    setShowModal(false);
  };

  const handleEditAppointment = (appointmentId) => {
    setIsDatePickerVisible(!isDatePickerVisible);
    setSelectedAppointment(appointmentId);
  };

  const applyEditAppointment = async (clientId, appointmentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/clients/updateAppointment/${clientId}/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "updateDate", date: editedDate }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        fetchAppointments();
        setIsDatePickerVisible(false);
      } else {
        console.error("Edit failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
              inline
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
      {localStorage.getItem("user") && (
        <div>
          <p>Esamos registracijos</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Appointment</th>
              </tr>
            </thead>
            <tbody>
              {fetchedAppointments
                .filter((client) => client.appointments.length > 0)
                .map((client, index) => (
                  <tr key={index}>
                    <td>{client.firstName}</td>
                    <td>{client.lastName}</td>
                    <td>{client.clientEmail}</td>
                    <td>
                      {client.appointments.map((appointment) => (
                        <div key={appointment._id} className="appointment-info">
                          <span>{appointment.service}</span>
                          <span>
                            {" "}
                            {new Date(appointment.date).toLocaleTimeString(
                              "lt-LT",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                          <span>
                            <Button
                              buttonText="Redaguoti"
                              onClick={() =>
                                handleEditAppointment(appointment._id)
                              }
                            />
                          </span>
                          <span>
                            <Button
                              buttonText="Ištrinti"
                              onClick={() =>
                                handleDeleteAppointment(
                                  client._id,
                                  appointment._id
                                )
                              }
                            />
                            {/* MODALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLllllllllllllllllll */}
                            {showModal && (
                              <Modal onClose={handleCloseModal}>
                                <ModalContent
                                  onCancel={handleCloseModal}
                                  onConfirm={confirmDelete}
                                />
                              </Modal>
                            )}
                          </span>
                          {selectedAppointment === appointment._id &&
                            isDatePickerVisible && (
                              <div className="editModal">
                                <DatePicker
                                  selected={editedDate}
                                  onChange={setEditedDate}
                                  inline
                                  placeholderText="Pasirinkite datą..."
                                  name="date"
                                  showTimeSelect
                                  timeFormat="HH:mm"
                                  timeIntervals={30}
                                  timeCaption="time"
                                  dateFormat="MMMM d, yyyy HH:mm"
                                  includeDateIntervals={[
                                    {
                                      start: subDays(new Date(), 1),
                                      end: addDays(new Date(), 60),
                                    },
                                  ]}
                                  minTime={setHours(
                                    setMinutes(new Date(), 0),
                                    9
                                  )}
                                  maxTime={setHours(
                                    setMinutes(new Date(), 30),
                                    20
                                  )}
                                  filterTime={filterPassedTime}
                                />
                                <Button
                                  buttonText="Patvirtinti"
                                  onClick={() =>
                                    applyEditAppointment(
                                      client._id,
                                      appointment._id
                                    )
                                  }
                                />
                                <Button
                                  buttonText="Atšaukti"
                                  onClick={() =>
                                    handleEditAppointment(appointment._id)
                                  }
                                />
                              </div>
                            )}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* TODO MODAL*/}
        </div>
      )}
    </>
  );
};
