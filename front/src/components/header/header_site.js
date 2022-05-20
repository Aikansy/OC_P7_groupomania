import { React } from "react";
import { NavLink } from "react-router-dom";
import { GetSessionUserId } from "../../providers/providers";
import { GetSessionUserNickname } from "../../providers/providers";
import groupiLogo from "../../assets/icon_groupi_001.png";
import signoutLogo from "../../assets/icon_signout_001.png";
import profileLogo from "../../assets/icon_profile_001.png";

export const HeaderSite = () => {
  const nickname = GetSessionUserNickname();
  const userId = GetSessionUserId();

  const logout = async () => {
    localStorage.clear("hauler_user");
  };

  return (
    <header className="navbar">
      <NavLink to="/home">
        <img src={groupiLogo} alt="Logo Hauler" height={50} />
      </NavLink>

      <NavLink to="/home">
        <h1>Hauler</h1>
      </NavLink>

      <div>
        <NavLink to={`/profile/${nickname}/${userId}`}>
          <img src={profileLogo} alt="Accès au Profil" height={35} />
        </NavLink>

        <NavLink to="/" onClick={logout}>
          <img src={signoutLogo} alt="Se déconnecter" height={35} />
        </NavLink>
      </div>
    </header>
  );
};
