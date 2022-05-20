import "../styles/normalize.css";
import { useState } from "react";
import { Signup } from "../components/sign/sign_up";
import { Signin } from "../components/sign/sign_in";

export const PageSign = () => {
  const [signupModal, setSignupModal] = useState(true);
  const [signinModal, setSigninModal] = useState(false);

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
    <section className="section">
      <h2>Hauler</h2>
      <p>Avec Hauler, partagez et restez en contact avec vos collègues.</p>
      <button
        onClick={handleModals}
        id="signup"
        className={signupModal ? "button--active" : "button"}
      >
        Inscription
      </button>
      <button
        onClick={handleModals}
        id="signin"
        className={signinModal ? "button--active" : "button"}
      >
        Connexion
      </button>
      <div>
        {signupModal && <Signup />}
        {signinModal && <Signin />}
      </div>
    </section>
  );
};
