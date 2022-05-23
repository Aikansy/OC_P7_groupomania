import { useState } from "react";
import { AddSessionUser } from "../../providers/providers";
import { SignupformError } from "../../providers/providers";
import "../../styles/components/sign/sign_up.css";

export const Signup = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const emailError = document.querySelector("#emailErrorMsg");

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      nickname: e.target.nickname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (SignupformError() === false) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const URI = `http://localhost:4500/api/auth/signup`;
      const response = await fetch(URI, requestOptions);
      const result = await response.json();

      if (result.error) {
        console.log(result.error);
        if (result.error.includes("Email")) {
          emailError.textContent = "Email déjà utilisé";
        } else {
          emailError.textContent = "";
        }
      } else {
        AddSessionUser(result);
        window.location = "/home";
      }
    }
  };

  return (
    <form onSubmit={handleLogin} id="signupForm">
      <div className="signupTitleDiv">
        <h2 className="groupixColor">INSCRIPTION</h2>
      </div>

      <div className="signupInputDiv">
        <label htmlFor="nickname" className="signupInputDiv__label">
          Nom d'utilisateur
        </label>
        <input
          type="text"
          name="nickname"
          id="nickname"
          className="signupInputDiv__input"
          onChange={(event) => setNickname(event.target.value)}
          value={nickname}
          required
        />
        <p id="nicknameErrorMsg"></p>
      </div>

      <div className="signupInputDiv">
        <label htmlFor="email" className="signupInputDiv__label">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="signupInputDiv__input"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        />
        <p id="emailErrorMsg"></p>
      </div>

      <div className="signupInputDiv">
        <label htmlFor="password" className="signupInputDiv__label">
          Mot de passe
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="signupInputDiv__input"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          required
        />
        <p id="passwordErrorMsg"></p>
      </div>

      <div className="signupInputDiv">
        <label htmlFor="confirmedPassword" className="signupInputDiv__label">
          Confirmer le mot de passe
        </label>
        <input
          type="password"
          name="confirmedPassword"
          id="confirmedPassword"
          className="signupInputDiv__input"
          onChange={(event) => setConfirmedPassword(event.target.value)}
          value={confirmedPassword}
          required
        />
        <p id="confirmedPasswordErrorMsg"></p>
      </div>

      <div className="signupCguDiv">
        <input type="checkbox" id="cgu" className="signupCguDiv__input" />
        <label htmlFor="cgu">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            id="signupCguDiv__label"
          >
            J'accepte les conditions générales d'utilisation
          </a>
          <p id="cguErrorMsg"></p>
        </label>
      </div>

      <div className="signupButtonDiv">
        <input
          type="submit"
          value="S'inscrire"
          className="signupButtonDiv__button"
        />
      </div>
    </form>
  );
};
