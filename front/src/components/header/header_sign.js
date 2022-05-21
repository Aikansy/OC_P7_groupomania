import { NavLink } from "react-router-dom";
import groupixLogo from "../../assets/icon_groupi_001.png";
import "../../styles/components/header/header_sign.css";

export const SignHeader = () => {
  return (
    <header id="signHeader">
      <NavLink to="/">
        <img src={groupixLogo} alt="Logo Groupix" className="siteLogo" />
      </NavLink>

      <NavLink to="/">
        <h1 className="siteTitle">Groupix</h1>
      </NavLink>
    </header>
  );
};
