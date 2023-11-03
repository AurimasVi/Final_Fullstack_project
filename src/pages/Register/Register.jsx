import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useState } from "react";

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
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

  return (
    <>
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
          inputName="email"
          placeHolder="El. Paštas"
          className="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          inputName="password"
          placeHolder="Slaptažodis"
          className="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          type="password"
          inputName="repeatPassword"
          placeHolder="Pakartokite slaptažodį"
          className="repeatPassword"
        />
        <Button buttonText="Užsiregistruoti" type="submit" />
      </Form>
      <div>
        <p>Turite anketą? Prisijunkite</p>
        <Button buttonText="Prisijungti" />
      </div>
    </>
  );
};
