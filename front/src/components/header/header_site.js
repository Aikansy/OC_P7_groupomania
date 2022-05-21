import { React } from "react";
import { NavLink } from "react-router-dom";
import { GetSessionUserId } from "../../providers/providers";
import { GetSessionUserNickname } from "../../providers/providers";
import groupiLogo from "../../assets/icon_groupi_001.png";
import signoutLogo from "../../assets/icon_signout_001.png";
import profileLogo from "../../assets/icon_profile_001.png";
import "../../styles/components/header/header_site.css";

export const SiteHeader = () => {
  const nickname = GetSessionUserNickname();
  const userId = GetSessionUserId();

  const logout = async () => {
    localStorage.clear("hauler_user");
  };

  return (
    <header id="siteHeader">
      <NavLink to="/home" className="siteLogoDiv">
        <img src={groupiLogo} alt="Logo Hauler" className="siteLogoDiv__logo" />
      </NavLink>

      <NavLink to="/home" className="siteTitleDiv">
        <h1 className="siteTitleDiv__title">Groupix</h1>
      </NavLink>

      <div className="siteButtonsDiv">
        <ul className="siteHeaderUl">
          <li>
            <NavLink to={`/profile/${nickname}/${userId}`}>
              <img
                src={profileLogo}
                alt="Accès au Profil"
                className="siteHeaderbuttonDiv__button"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={logout}>
              <img
                src={signoutLogo}
                alt="Se déconnecter"
                className="siteHeaderbuttonDiv__button"
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};
