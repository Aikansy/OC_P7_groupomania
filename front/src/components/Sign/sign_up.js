import { useState } from "react";
import { AddSessionUser } from "../../providers/providers";
import { SignupformError } from "../../providers/providers";

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
    <form action="" onSubmit={handleLogin}>
      <div>
        <h2>Inscription</h2>
      </div>

      <div>
        <label htmlFor="nickname">Nom d'utilisateur</label>
        <input
          type="text"
          name="nickname"
          id="nickname"
          onChange={(event) => setNickname(event.target.value)}
          value={nickname}
          required
        />
        <p id="nicknameErrorMsg"></p>
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        />
        <p id="emailErrorMsg"></p>
      </div>

      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          required
        />
        <p id="passwordErrorMsg"></p>
      </div>

      <div>
        <label htmlFor="confirmedPassword">Confirmer le mot de passe</label>
        <input
          type="password"
          name="confirmedPassword"
          id="confirmedPassword"
          onChange={(event) => setConfirmedPassword(event.target.value)}
          value={confirmedPassword}
          required
        />
        <p id="confirmedPasswordErrorMsg"></p>
      </div>

      <div>
        <input type="checkbox" id="cgu" />
        <label htmlFor="cgu">
          {" "}
          J'accepte les{" "}
          <a href="/" target="_blank" rel="noopener noreferrer">
            conditions générales d'utilisation
          </a>
          <p id="cguErrorMsg"></p>
        </label>
      </div>

      <div>
        <input type="submit" value="S'inscrire" />
      </div>
    </form>
  );
};
