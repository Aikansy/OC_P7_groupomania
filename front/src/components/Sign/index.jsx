import { useState } from "react";
import { Signup } from "./_signup";
import { Signin } from "./_signin";

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
    <div className="signBlock">
      <div className="signBlock__buttonBlock">
        <button
          onClick={handleModals}
          id="signup"
          className={
            signupModal ? "signBlock__button--active" : "signBlock__button"
          }
        >
          Inscription
        </button>
        <button
          onClick={handleModals}
          id="signin"
          className={
            signinModal ? "signBlock__button--active" : "signBlock__button"
          }
        >
          Connexion
        </button>
      </div>
      <div className="signBlock__form">
        {signupModal && <Signup />}
        {signinModal && <Signin />}
      </div>
    </div>
  );
};
