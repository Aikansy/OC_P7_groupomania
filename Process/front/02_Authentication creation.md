# 02 - Authentication creation

## Create Components

    > (front/src/Components) "mkdir Sign"
    > (front/src/Components) "touch _componentProviders.jsx"
    > (front/src/Components/Sign) "touch index.jsx"
    > (front/src/Components/Sign) "touch signup.jsx"
    > (front/src/Components/Sign) "touch signin.jsx"
    > (front/src/Components/Sign) "touch _signProviders.jsx"

## \_providers

front/src/Components/\_componentProviders.jsx:

```javascript
export const addSessionUser = async (item) => {
  let user = JSON.parse(sessionStorage.getItem("hauler_user"));

  if (user) {
    sessionStorage.clear("hauler_user");
    sessionStorage.setItem("hauler_user", JSON.stringify(item));
  } else {
    sessionStorage.setItem("hauler_user", JSON.stringify(item));
  }
};

export const getSessionUser = () => {
  const user = JSON.parse(sessionStorage.getItem("hauler_user"));
  const token = user.token;
  return token;
};
```

## \_SignProviders

front/src/Components/Sign/\_signProviders.jsx:

```javascript
export const formError = () => {
  const nickname = document.querySelector("#nickname").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmed = document.querySelector("#confirmedPassword").value;
  const cgu = document.querySelector("#cgu");

  const nicknameError = document.querySelector("#nicknameErrorMsg");
  const emailError = document.querySelector("#emailErrorMsg");
  const passwordError = document.querySelector("#passwordErrorMsg");
  const confirmedError = document.querySelector("#confirmedPasswordErrorMsg");
  const cguError = document.querySelector("#cguErrorMsg");

  let error = false;

  if (!nickname.match(/^[A-Za-zÜ-ü'\s-]{2,50}$/)) {
    nicknameError.textContent = `Caractères acceptés : min: 2, max: 50, lettres majuscules et minuscules, accents, apostrophe, espace et tiret.`;
    error = true;
  } else {
    nicknameError.textContent = "";
  }

  if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    emailError.textContent = `Format email invalide.`;
    error = true;
  } else {
    emailError.textContent = "";
  }

  if (!password.match(/^[\0-9A-Za-z]{8,50}$/)) {
    passwordError.textContent = `Caractères acceptés : min: 8, max: 50, chiffres, lettres majuscules et minuscules.`;
    error = true;
  } else {
    passwordError.textContent = "";
  }

  if (confirmed !== password) {
    confirmedError.textContent = "Les mots de passe ne correspondent pas.";
    error = true;
  } else {
    confirmedError.textContent = "";
  }

  if (!cgu.checked) {
    cguError.textContent = "Vous devez accepter les CGU pour vous inscrire.";
    error = true;
  } else {
    cguError.textContent = "";
  }

  return error;
};
```

## Signup Components

front/src/Components/Sign/signup.jsx:

```javascript
import React, { useState } from "react";
import { addSessionUser } from "../_componentProviders";
import { formError } from "./_signProviders";

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
        <p id="nicknameErrorMsg" className="errorMsg"></p>
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
```

## Signin Components

front/src/Components/Sign/signin.jsx:

```javascript
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
```

## index (Components/Sign)

front/src/Components/Sign/index.jsx:

```javascript
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
```

## Sign page

UPDATE front/src/Pages/signPage.jsx:

```javascript
import React from "react";
import { Sign } from "../Components/Sign";

export const SignPage = () => {
  return (
    <section className="signSection">
      <Sign signin={false} signup={true} />
    </section>
  );
};
```
