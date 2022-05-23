import { useState } from "react";
import { Signup } from "../components/sign/sign_up";
import { Signin } from "../components/sign/sign_in";
import "../styles/pages/page_sign.css";

export const PageSign = () => {
  const [signupModal, setSignupModal] = useState(false);
  const [signinModal, setSigninModal] = useState(true);

  const handleModals = (e) => {
    if (e.target.id === "signup") {
      setSignupModal(true);
      setSigninModal(false);
    } else if (e.target.id === "signin") {
      setSignupModal(false);
      setSigninModal(true);
    }
  };

  return (
    <section id="signSection">
      <div className="background"></div>

      <div className="content">
        <div id="signContentDiv">
          <h2 className="signContentDiv__title groupixColor">Groupix</h2>
          <p id="signContentDiv__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat,
            mi at semper pulvinar, velit nunc tincidunt nisl, ac finibus libero
            purus vel nulla. Nam sed ultrices ante. Mauris ac nibh fermentum,
            lobortis nisl et, aliquam turpis. Cras consectetur convallis
            molestie. Fusce semper fringilla odio at egestas. Cras sapien
            tortor, venenatis at ligula in, viverra vestibulum mauris. Fusce non
            ullamcorper dolor, id sagittis magna.
          </p>
        </div>

        <div id="signButtonDiv">
          <button
            onClick={handleModals}
            id="signup"
            className={
              signupModal
                ? "signButtonDiv__button--active"
                : "signButtonDiv__button"
            }
          >
            Inscription
          </button>

          <button
            onClick={handleModals}
            id="signin"
            className={
              signinModal
                ? "signButtonDiv__button--active"
                : "signButtonDiv__button"
            }
          >
            Connexion
          </button>
        </div>

        <div id="signFormDiv">
          {signupModal && <Signup />}
          {signinModal && <Signin />}
        </div>
      </div>
    </section>
  );
};
