import { NavLink } from "react-router-dom";
import { Button } from "../Button/Button";
import style from "./header.module.css";

export const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div className={style.headerWrapper}>
      <div className={style.navlinks}>
        {!localStorage.getItem("user") && (
          <>
            <NavLink to="/">PAGRINDINIS</NavLink>
            <NavLink to="/register">REGISTRUOTIS</NavLink>
            <NavLink to="/login">PRISIJUNGTI</NavLink>
          </>
        )}
        {localStorage.getItem("user") && (
          <Button
            onClick={handleLogout}
            buttonText="Atsijungti"
            className={style.logoutBtn}
          />
        )}
      </div>
    </div>
  );
};
