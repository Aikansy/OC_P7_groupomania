# 01 - CREATE-REACT-APP/YARN initialization

## Install dependencies

    > (root folder) "npx create-react-app front"
    > (front) "npm install --save yarn"
    > (front) "npm install --save react-router-dom"

Initializes the project and installs Create-React-App along with Yarn and its dependencies. Will also create a pre-configured folder.
"npx" is the recommended command to install CRA (Create-React-App)

## front file(s)/folder(s) creation

front:

    > (front/src) "mkdir App"
    > (front/src) "mkdir Components"
    > (front/src) "mkdir Pages"
    > (front/src) "mkdir Routes"
    > (front/src) "mkdir Style"

    > (front/src/App) mv app.jsx in

    > (front/src/Routes) "touch index.jsx"

    > (front/src/Pages) "touch homePage.jsx"
    > (front/src/Pages) "touch signPage.jsx"
    > (front/src/Pages) "touch profilePage.jsx"

    > (front/public) "mkdir Images"
    > (front/public) "mkdir Icons"

## Update index.js

ReactDOM is deprecated! Change ReactDOM to ReactDOMClient.render in index.js.

front/src/index.js:

```javascript
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App/App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Or:

```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  <StrictMode>
);
```

then:

    > (front) "yarn start" or "npm start"

## Update index.html

front/public/index.html:

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="../src/assets/icons/icon-1b3157.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Réseau social exclusif de l'entreprise Groupomania - Spécialiste dans la grande distribution avec plus de 600 collaborateurs."
    />
    <script
      src="https://kit.fontawesome.com/f4914631ba.js"
      crossorigin="anonymous"
    ></script>

    <title>Hauler</title>
  </head>
  <body>
    <main id="root"></main>
  </body>
</html>
```

## Clear folders of unused files

front/public:

    > All images and icons

front/src:

    > All css files
    > App.test.js
    > setupTest.js
    > reportWebVitals.js

## Create PAGES

front/src/Pages:

#### homePage.jsx

```javascript
import React from "react";

export const HomePage = () => {
  return <section className="homeSection">Hello from Home</section>;
};
```

#### signPage.jsx

```javascript
import React from "react";

export const SignPage = () => {
  return <section className="signSection">Hello from Sign</section>;
};
```

#### profilePage.jsx

```javascript
import React from "react";

export const ProfilePage = () => {
  return <section className="profileSection">Hello from Profile</section>;
};
```

## Configure the routes

front/src/Routes/index.jsx:

In react-router-dom v6, "Switch" is replaced by "Routes", just like "Redirect" is replaced by "Navigate".

```javascript
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage } from "../../Pages/homePage";
import { SignPage } from "../../Pages/signPage";
import { ProfilePage } from "../../Pages/profilePage";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default index;
```

## Update & call routes in App.js

front/src/App/app.js

```javascript
import React from "react";
import Routes from "../Routes";

export const App = () => {
  return (
    <div id="coreBlock">
      <Routes />
    </div>
  );
};
```
