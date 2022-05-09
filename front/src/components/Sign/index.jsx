import React, { useState } from "react";
import { Signup } from "./signup";
import { Signin } from "./signin";

export const Sign = (props) => {
  const [signupModal, setSignupModal] = useState(props.signup);
  const [signinModal, setSigninModal] = useState(props.signin);

  const handleModals = (event) => {
    if (event.target.id === "signup") {
      setSignupModal(true);
      setSigninModal(false);
    } else if (event.target.id === "signin") {
      setSignupModal(false);
      setSigninModal(true);
    }
  };

  return (
    <ul className="signBlock">
      <li
        onClick={handleModals}
        id="signup"
        className={
          signupModal ? "signBlock__button--active" : "signBlock__button"
        }
      >
        Inscription
      </li>
      <li
        onClick={handleModals}
        id="signin"
        className={
          signinModal ? "signBlock__button--active" : "signBlock__button"
        }
      >
        Connexion
      </li>
      <div className="signBlock__form">
        {signupModal && <Signup />}
        {signinModal && <Signin />}
      </div>
    </ul>
  );
};
