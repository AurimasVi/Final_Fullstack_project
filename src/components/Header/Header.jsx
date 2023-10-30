import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="navlinks">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </div>
  );
};
