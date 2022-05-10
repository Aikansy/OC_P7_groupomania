# 01 - Create React App

## Install dependencies

    > (root folder) "npx create-react-app front"
    > (front) "npm install --save yarn"
    > (front) "npm install --save react-router-dom"
    > (front) "npm install --save react-redux"
    > (front) "npm install --save redux"
    > (front) "npm install --save redux-thunk"
    > (front) "npm install --save redux-logger"
    > (front) "npm install --save redux-devtools-extension"
    > (front) "npm install --save @reduxjs/toolkit"

Initializes the project and installs Create-React-App along with Yarn and its dependencies. Will also create a pre-configured folder.
"npx" is the recommended command to install CRA (Create-React-App)

## Clear folders of unused files

front/public:

    > All images and icons

front/src:

    > All css files
    > App.test.js
    > setupTest.js
    > reportWebVitals.js

## front file(s)/folder(s) creation

front:

    > (front/src) "mkdir App"
    > (front/src/App) mv app.jsx in

    > (front/src) "mkdir Assets"
    > (front/src/Assets) "mkdir Logos"
    > (front/src/Assets/Logos) mv all needed logos

    > (front/src) "mkdir Components"
    > (front/src/Components) "mkdir Context"
    > (front/src/Components/Context) "touh appContext.jsx"
    > (front/src/Components) "mkdir Home"
    > (front/src/Components/Home) "touh _fresh.jsx"
    > (front/src/Components/Home) "touh _trending.jsx"
    > (front/src/Components/Home) "touh index.jsx"
    > (front/src/Components) "mkdir Navigation"
    > (front/src/Components/Navigation) "touh index.jsx"
    > (front/src/Components) "mkdir Profile"
    > (front/src/Components/Profile) "touh index.jsx"
    > (front/src/Components) "mkdir Providers"
    > (front/src/Components/Providers) "touh providers.jsx"
    > (front/src/Components) "mkdir Sign"
    > (front/src/Components/Sign) "touh _signin.jsx"
    > (front/src/Components/Sign) "touh _signup.jsx"
    > (front/src/Components/Sign) "touh index.jsx"
    > (front/src) "mkdir Pages"
    > (front/src/Pages) "touch homePage.jsx"
    > (front/src/Pages) "touch profilePage.jsx"
    > (front/src) "mkdir Routes"
    > (front/src/Routes) "touch index.jsx"
    > (front/src) "mkdir Style"

    > (front/public) "mkdir Images"
    > (front/public) "mkdir Icons"

## Update index.js

ReactDOM is deprecated! Change ReactDOM to ReactDOMClient.render in index.js.

front/src/index.js:

```javascript
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App/app";

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
import { App } from "./App/app";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

then:

    > (front) "yarn start"

## Update index.html

front/public/index.html:

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="./Icons/icon-1b3157.png" />
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

## Create PAGES

front/src/Pages:

#### homePage.jsx

```javascript
export const HomePage = () => {
  return <section className="homeSection">Hello from Home</section>;
};
```

#### profilePage.jsx

```javascript
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
import { HomePage } from "../Pages/homePage";
import { ProfilePage } from "../Pages/profilePage";
import { Navbar } from "../Components/Navigation";

const index = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
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
