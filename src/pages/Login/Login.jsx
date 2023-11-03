import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";

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
    console.log(JSON.stringify(user._id));
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
        console.log("LOGGED IN");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="loginWrapper">
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          inputName="email"
          placeHolder="El. Paštas"
          className="emailInput"
          value={loginData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          inputName="password"
          placeHolder="Slaptažodis"
          className="passwordInput"
          value={loginData.password}
          onChange={handleChange}
        />
        <Button buttonText="Prisijungti" type="submit" />
      </Form>
    </div>
  );
};
