import { useState } from "react";
import { AddSessionUser } from "../../providers/providers";
import "../../styles/components/sign/sign_in.css";

export const Signin = () => {
  const [emailModal, setEmailModal] = useState("");
  const [passwordModal, setPasswordModal] = useState("");
  const emailError = document.querySelector("#emailErrorMsg");
  const passwordError = document.querySelector("#passwordErrorMsg");

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const URI = `http://localhost:4500/api/auth/signin`;
    const response = await fetch(URI, options);
    const result = await response.json();

    if (result.error) {
      if (result.error.includes("Email")) {
        emailError.textContent = "Email inconnu";
      } else {
        emailError.textContent = "";
      }

      if (result.error.includes("Password")) {
        passwordError.textContent = "Mot de passe incorrect";
      } else {
        passwordError.textContent = "";
      }
    } else {
      AddSessionUser(result);
      window.location = "/home";
    }
  };

  return (
    <form onSubmit={handleLogin} id="signinForm">
      <div className="signin__titleDiv">
        <h2 className="groupixColor">CONNEXION</h2>
      </div>

      <div className="signinInputDiv">
        <label htmlFor="email" className="signinInputDiv__label">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="signinInputDiv__input"
          onChange={(event) => setEmailModal(event.target.value)}
          value={emailModal}
          required
        />
        <p id="emailErrorMsg"></p>
      </div>

      <div className="signinInputDiv">
        <label htmlFor="password" className="signinInputDiv__label">
          Mot de passe
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="signinInputDiv__input"
          onChange={(event) => setPasswordModal(event.target.value)}
          value={passwordModal}
          required
        />
        <p id="passwordErrorMsg"></p>
      </div>

      <div className="signinButtonDiv">
        <input
          type="submit"
          value="Se connecter"
          className="signinButtonDiv__button"
        ></input>
      </div>
    </form>
  );
};
