import React, { useState } from "react";
import { addToken, formValidity } from "../providers";

export const Signup = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      nickname: e.target.nickname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (formValidity() === false) {
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

      addToken(result);
      window.location = "/home";
    }
  };

  return (
    <form action="" onSubmit={handleLogin} className="form">
      <div className="form__input">
        <label htmlFor="nickname">Pseudo</label>
        <br />
        <input
          type="text"
          name="nickname"
          id="nickname"
          onChange={(event) => setNickname(event.target.value)}
          value={nickname}
          required
        ></input>
        <p id="nicknameErrorMsg"></p>
      </div>
      <div className="form__input">
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
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
      <input type="submit" value="Se connecter" id="login"></input>
    </form>
  );
};
