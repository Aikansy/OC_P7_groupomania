import { NavLink } from "react-router-dom";
import "../../styles/components/footer/footer_site.css";
import groupomaniaLogo from "../../assets/icon-left-font-monochrome-white.png";

export const SiteFooter = () => {
  return (
    <footer id="signFooter">
      <div id="signFooterLinkDiv">
        <div className="signFooterAboutDiv">
          <h3 className="signFooterAboutDiv__title">A propos</h3>
          <nav>
            <ul>
              <li className="signFooterAboutDiv__li">
                <NavLink to="/" className="signFooterAboutDiv__a">
                  <p className="signFooterAboutDiv__p">
                    Fonctionnement du site
                  </p>
                </NavLink>
              </li>
              <li className="signFooterAboutDiv__li">
                <NavLink to="/" className="signFooterAboutDiv__a">
                  <p className="signFooterAboutDiv__p">
                    Conditions générales d'utilisation
                  </p>
                </NavLink>
              </li>
              <li className="signFooterAboutDiv__li">
                <NavLink to="/" className="signFooterAboutDiv__a">
                  <p className="signFooterAboutDiv__p">
                    Données et confidentialité
                  </p>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="signFooterHelpDiv">
          <h3 className="signFooterHelpDiv__title">Assistance</h3>
          <nav>
            <ul>
              <li className="signFooterHelpDiv__li">
                <NavLink to="/">
                  <p className="signFooterHelpDiv__p">F.A.Q</p>
                </NavLink>
              </li>
              <li className="signFooterHelpDiv__li">
                <NavLink to="/">
                  <p className="signFooterHelpDiv__p">Centre d'aide</p>
                </NavLink>
              </li>
              <li className="signFooterHelpDiv__li">
                <NavLink to="#">
                  <p className="signFooterHelpDiv__p">Nous contacter</p>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="signFooterLogoDiv">
        <NavLink to="#">
          <img
            src={groupomaniaLogo}
            alt="logo groupomania"
            className="signFooterLogoDiv__logo"
          />
        </NavLink>
      </div>
    </footer>
  );
};
