import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useState } from "react";
import style from "./register.module.css";
import { NavLink } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        alert("Registracija pavyko ;]");
        window.location.href = "http://localhost:3000/";
      } else {
        alert("Registracija nepavyko ;(");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={style.registrationPageMainWrapper}>
      <div className={style.registrationFormWrapper}>
        <Form onSubmit={handleSubmit} className={style.registrationForm}>
          <h1 className={style.headerText}>ADMINISTRATORIAUS REGISTRACIJA</h1>
          <Input
            type="text"
            inputName="firstName"
            placeHolder="Vardas"
            className={style.firstNameInput}
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            type="text"
            inputName="lastName"
            placeHolder="Pavardė"
            className={style.lastNameInput}
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            type="email"
            inputName="email"
            placeHolder="El. Paštas"
            className={style.emailInput}
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            inputName="password"
            placeHolder="Slaptažodis"
            className={style.passwordInput}
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            buttonText="REGISTRUOTIS"
            type="submit"
            className={style.registerBtn}
          />
        </Form>
      </div>

      <div className={style.subSectionWrapper}>
        <p>TURI ANKETĄ? PRISIJUNKITE</p>
        <NavLink to="/login" className={style.loginBtn}>
          PRISIJUNGTI
        </NavLink>
      </div>
    </div>
  );
};
