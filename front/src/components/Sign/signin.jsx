import React, { useState } from "react";
import { addSessionUser } from "../_componentProviders";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    const response = await fetch(
      `http://localhost:4500/api/auth/signin`,
      options
    );
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
      addSessionUser(result);
      window.location = "/home";
    }
  };

  return (
    <form action="" onSubmit={handleLogin} className="form">
      <h2>Connexion</h2>
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
        <p id="emailErrorMsg"></p>
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
        <p id="passwordErrorMsg"></p>
      </div>
      <div>
        <input type="submit" value="Se connecter"></input>
      </div>
    </form>
  );
};
