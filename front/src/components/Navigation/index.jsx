import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserIdContext } from "../Context/app_context";
import haulerLogo from "../../Assets/Logos/icon-1b3157.png";
import signinLogo from "../../Assets/Logos/signin.png";
import signoutLogo from "../../Assets/Logos/signout.png";
import profileLogo from "../../Assets/Logos/profile.png";

export const Navbar = () => {
  const userId = useContext(UserIdContext);
  const logout = async () => {
    localStorage.clear("hauler_user");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar__logoBlock">
        <NavLink to="/">
          <img src={haulerLogo} alt="Logo Hauler" height={50} />
        </NavLink>
      </div>
      <div className="navbar__titleBlock">
        <h1>Hauler</h1>
      </div>
      {userId ? (
        <div className="navbar__buttons">
          <NavLink to="/profile">
            <img src={profileLogo} alt="Accès au Profil" height={35} />
          </NavLink>
          <NavLink to="/profile" onClick={logout}>
            <img src={signoutLogo} alt="Se déconnecter" height={35} />
          </NavLink>
        </div>
      ) : (
        <div className="navbar__buttons">
          <NavLink to="/profile">
            <img src={signinLogo} alt="Se connecter" height={35} />
          </NavLink>
        </div>
      )}
    </nav>
  );
};
