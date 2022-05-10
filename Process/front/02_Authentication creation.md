# 02 - Authentication creation

## \_providers

front/src/Components/\_componentProviders.jsx:

```javascript
export const addSessionUser = async (item) => {
  let user = JSON.parse(localStorage.getItem("hauler_user"));

  if (user) {
    localStorage.clear("hauler_user");
    localStorage.setItem("hauler_user", JSON.stringify(item));
  } else {
    localStorage.setItem("hauler_user", JSON.stringify(item));
  }
};

export const getSessionUser = () => {
  const user = JSON.parse(localStorage.getItem("hauler_user"));

  if (!user) {
    const token = "";
    return token;
  } else {
    const token = user.token;
    return token;
  }
};

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

## COMPONENTS/SIGN: \_signup

front/src/Components/Sign/\_signup.jsx:

```javascript
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
```

## COMPONENTS/SIGN: \_signin Components

front/src/Components/Sign/\_signin.jsx:

```javascript
import { useState } from "react";
import { addSessionUser } from "../Providers/providers";

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

## COMPONENTS/SIGN: index (Components/Sign)

front/src/Components/Sign/index.jsx:

```javascript
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
```

## COMPONENTS/HOME: \_fresh.jsx

front/src/Components/Home/\_fresh.jsx:

```javascript
export const Fresh = () => {
  return (
    <div>
      <h2>Messages récents</h2>
    </div>
  );
};
```

## COMPONENTS/HOME: \_trending.jsx

front/src/Components/Home/\_trending.jsx:

```javascript
export const Trending = () => {
  return (
    <div>
      <h2>Messages populaires</h2>
    </div>
  );
};
```

## COMPONENTS/HOME: index.jsx

front/src/Components/Home/index.jsx:

```javascript
import { useState } from "react";
import { Fresh } from "./_fresh";
import { Trending } from "./_trending";

export const Posts = (props) => {
  const [freshModal, setFreshModal] = useState(props.fresh);
  const [trendingModal, setTrendingModal] = useState(props.trending);

  const handleModals = (e) => {
    if (e.target.id === "fresh") {
      setFreshModal(true);
      setTrendingModal(false);
    } else if (e.target.id === "trending") {
      setFreshModal(false);
      setTrendingModal(true);
    }
  };

  return (
    <div className="categoriesBlock">
      <div className="categoriesBlock__buttonBlock">
        <button
          onClick={handleModals}
          id="fresh"
          className={
            freshModal
              ? "categoriesBlock__button--active"
              : "categoriesBlock__button"
          }
        >
          Récent
        </button>
      </div>
      <div className="categoriesBlock__buttonBlock">
        <button
          onClick={handleModals}
          id="trending"
          className={
            trendingModal
              ? "categoriesBlock__button--active"
              : "categoriesBlock__button"
          }
        >
          Populaire
        </button>
      </div>
      <div>
        {freshModal && <Fresh />}
        {trendingModal && <Trending />}
      </div>
    </div>
  );
};
```

## COMPONENTS/PROFILE: index.jsx

front/src/Components/Profile/index.jsx:

```javascript
export const Profile = () => {
  return (
    <div>
      <h2>Mon profil</h2>
    </div>
  );
};
```

## COMPONENTS/CONTEXT: app_context.jsx

front/src/Components/Context/app_context.jsx:

```javascript
import { createContext } from "react";

export const UserIdContext = createContext();
```

## APP: app.jsx

front/src/App/app.jsx:

```javascript
import { useEffect, useState } from "react";
import Routes from "../Routes";
import { UserIdContext } from "../Components/Context/app_context";
import { getSessionUser } from "../Components/Providers/providers";

export const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const sessionToken = getSessionUser();

    const fetchToken = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionToken,
        },
      };

      await fetch("http://localhost:4500/api/jwt", requestOptions)
        .then((res) => res.json())
        .then((resId) => setUserId(resId))
        .catch((error) => console.log(error));
    };

    if (sessionToken) {
      fetchToken();
    }
  }, []);

  return (
    <UserIdContext.Provider value={userId}>
      <Routes />
    </UserIdContext.Provider>
  );
};
```

## COMPONENTS/NAVIGATION: index.jsx

front/src/Components/Navigation/index.jsx:

```javascript
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserIdContext } from "../Context/app_context";
import haulerLogo from "../../Assets/Logos/icon-1b3157.png";
import signinLogo from "../../Assets/Logos/signin.png";
import signoutLogo from "../../Assets/Logos/signout.png";
import profileLogo from "../../Assets/Logos/profile.png";

export const Navbar = () => {
  const userId = useContext(UserIdContext);
  const logout = async () => {
    localStorage.clear("hauler_user");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar__logoBlock">
        <NavLink to="/">
          <img src={haulerLogo} alt="Logo Hauler" height={50} />
        </NavLink>
      </div>
      <div className="navbar__titleBlock">
        <h1>Hauler</h1>
      </div>
      {userId ? (
        <div className="navbar__buttons">
          <NavLink to="/profile">
            <img src={profileLogo} alt="Accès au Profil" height={35} />
          </NavLink>
          <NavLink to="/profile" onClick={logout}>
            <img src={signoutLogo} alt="Se déconnecter" height={35} />
          </NavLink>
        </div>
      ) : (
        <div className="navbar__buttons">
          <NavLink to="/profile">
            <img src={signinLogo} alt="Se connecter" height={35} />
          </NavLink>
        </div>
      )}
    </nav>
  );
};
```

## PAGES: ProfilePage & HomePage

UPDATE front/src/Pages/profilePage.jsx:

```javascript
import { Sign } from "../Components/Sign";
import { Profile } from "../Components/Profile";
import { UserIdContext } from "../Components/Context/app_context";
import { useContext } from "react";

export const ProfilePage = () => {
  const userId = useContext(UserIdContext);

  return (
    <section className="profileSection">
      {userId ? <Profile /> : <Sign signin={false} signup={true} />}
    </section>
  );
};
```

front/src/Pages/homePage.jsx:

```javascript
import { Posts } from "../Components/Home";

export const HomePage = () => {
  return (
    <section className="homeSection">
      <Posts fresh={true} trending={false} />
    </section>
  );
};
```
