import { NavLink } from "react-router-dom";
import { Button } from "../Button/Button";
// import { useState } from "react";

export const Header = () => {
  // const [click, setClick] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div className="header-wrapper">
      <div className="navlinks">
        <NavLink to="/">Home</NavLink>
        {!localStorage.getItem("user") && (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
        {localStorage.getItem("user") && (
          <Button onClick={handleLogout} buttonText="Atsijungti" />
        )}
      </div>
    </div>
  );
};
