# 02 - Authentication creation

## Create components

    > (front/src/components) "mkdir sign_components"
    > (front/src/components) "touch providers.jsx"
    > (front/src/components/sign_components) "touch index.js"
    > (front/src/components/sign_components) "touch Signup.js"
    > (front/src/components/sign_components) "touch Signin.js"

## Providers

front/src/components/providers.jsx:

```javascript
const addToken = async (item) => {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return false;
  } else {
    localStorage.setItem("user", JSON.stringify(item));
    return true;
  }
};

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  return token;
};

const formValidity = () => {
  const nickname = document.querySelector("#nickname").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const nicknameError = document.querySelector("#nicknameErrorMsg");
  const emailError = document.querySelector("#emailErrorMsg");
  const passwordError = document.querySelector("#passwordErrorMsg");

  let formError = false;

  if (!nickname.match(/^[A-Za-zÜ-ü'\s-]{2,50}$/)) {
    nicknameError.textContent = `(Nombre de caractères acceptés : min: 2, max: 50) Caractères acceptés : lettres majuscules et minuscules, accents, apostrophe, espace et tiret`;
    formError = true;
  } else {
    nicknameError.textContent = "";
  }

  if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    emailError.textContent = `Format email invalide`;
    formError = true;
  } else {
    emailError.textContent = "";
  }

  if (!password.match(/^[\0-9A-Za-z]{8,50}$/)) {
    passwordError.textContent = `(Nombre de caractères acceptés : min: 8, max: 50) Caractères acceptés : chiffres, lettres majuscules et minuscules`;
    formError = true;
  } else {
    passwordError.textContent = "";
  }

  return formError;
};

module.exports.addToken = addToken;
module.exports.getToken = getToken;
module.exports.formValidity = formValidity;
```

## Signup components

front/src/components/log/Signup.js:

```javascript
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
```

## Signin components

front/src/components/log/Signin.js:

```javascript
import React, { useState } from "react";
import { addToken } from "../providers";

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
      addToken(result);
      window.location = "/home";
    }
  };

  return (
    <form action="" onSubmit={handleLogin} className="form">
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

## index components

front/src/components/log/index.js:

```javascript
import React, { useState } from "react";
import { Signup } from "./Signup";
import { Signin } from "./Signin";

const Log = (props) => {
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

export default Log;
```

## Sign page

UPDATE front/src/pages/Sign.js:

```javascript
import React from "react";
import Log from "../components/sign_components";

export const Sign = () => {
  return (
    <section className="signSection">
      <Log signin={false} signup={true} />
    </section>
  );
};
```
