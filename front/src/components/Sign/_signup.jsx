import { useState } from "react";
import { addSessionUser } from "../Providers/providers";
import { formError } from "../Providers/providers";

export const Signup = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      nickname: e.target.nickname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (formError() === false) {
      const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `http://localhost:4500/api/auth/signup`,
        options
      );
      const result = await response.json();

      addSessionUser(result);
      window.location = "/home";
    }
  };

  return (
    <form action="" onSubmit={handleLogin} className="form">
      <h2>Inscription</h2>
      <div className="form__input">
        <label htmlFor="nickname">Nom d'utilisateur</label>
        <br />
        <input
          type="text"
          name="nickname"
          id="nickname"
          onChange={(event) => setNickname(event.target.value)}
          value={nickname}
          required
        ></input>
        <p id="nicknameErrorMsg" className="errorMsg"></p>
      </div>
      <div className="form__input">
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        ></input>
        <p id="emailErrorMsg" className="errorMsg"></p>
      </div>
      <div className="form__input">
        <label htmlFor="password">Mot de passe</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          required
        ></input>
        <p id="passwordErrorMsg" className="errorMsg"></p>
      </div>
      <div className="form__input">
        <label htmlFor="confirmedPassword">Confirmer le mot de passe</label>
        <br />
        <input
          type="password"
          name="confirmedPassword"
          id="confirmedPassword"
          onChange={(event) => setConfirmedPassword(event.target.value)}
          value={confirmedPassword}
          required
        ></input>
        <p id="confirmedPasswordErrorMsg" className="errorMsg"></p>
      </div>
      <div className="form__input">
        <input type="checkbox" id="cgu" />
        <label htmlFor="cgu">
          J'accepte les{" "}
          <a href="/" target="_blank" rel="noopener noreferrer">
            conditions générales d'utilisation
          </a>
          <p id="cguErrorMsg" className="errorMsg"></p>
        </label>
      </div>
      <input type="submit" value="S'inscrire" id="login"></input>
    </form>
  );
};
