import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div>
        <h1>Klientų registravimo sistema</h1>
        {!localStorage.getItem("user") && (
          <>
            {" "}
            <p>
              Norint užregistruoti klientą jo grožio procedūroms, pirmiausia
              prisijunkite arba užsiregistruokite
            </p>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </div>
    </>
  );
};
