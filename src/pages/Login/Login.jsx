import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import style from "./login.module.css";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (user) => {
    localStorage.setItem("user", user._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        const data = await response.json();
        handleLogin(data);
        window.location.href = "http://localhost:3000/";
      } else {
        alert("Prisijungti nepavyko");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={style.loginPageWrapper}>
      <div className={style.loginFormWrapper}>
        <Form onSubmit={handleSubmit} className={style.formElement}>
          <h2 className={style.h2Text}>PRISIJUNGTI</h2>
          <Input
            type="email"
            inputName="email"
            placeHolder="El. Paštas"
            className={style.loginEmailInput}
            value={loginData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            inputName="password"
            placeHolder="Slaptažodis"
            className={style.passwordInput}
            value={loginData.password}
            onChange={handleChange}
          />
          <Button
            buttonText="PRISIJUNGTI"
            type="submit"
            className={style.loginBtn}
          />
        </Form>
      </div>
    </div>
  );
};
