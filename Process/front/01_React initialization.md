# 01 - CREATE-REACT-APP/YARN initialization

## Install dependencies

    > (root folder) "npx create-react-app front"
    > (front) "npm install --save yarn"
    > (front) "npm install --save react-router-dom"

Initializes the project and installs Create-React-App along with Yarn and its dependencies. Will also create a pre-configured folder.
"npx" is the recommended command to install CRA (Create-React-App)

## front file(s)/folder(s) creation

front:

    > (front/src) "mkdir app"
    > (front/src) "mkdir components"
    > (front/src) "mkdir pages"
    > (front/src) "mkdir styles"

    > (front/src/pages) "touch HomePage.js"
    > (front/src/pages) "touch SignPage.js"
    > (front/src/pages) "touch ProfilePage.js"

    > (front/src/components) "mkdir routes"
    > (front/src/components/routes) "touch index.js"

    > (front/public) "mkdir images"
    > (front/public) "mkdir icons"

## Update index.js

ReactDOM is deprecated! Change ReactDOM to ReactDOMClient.render in index.js.

front/src/index.js:

```javascript
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

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
    <div id="root"></div>
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

front/src/pages:

#### HomePage.js

```javascript
import React from "react";

export const Home = () => {
  return <section className="homeSection">Hello from Home</section>;
};
```

#### SignPage.js

```javascript
import React from "react";

export const Sign = () => {
  return <section className="signSection">Hello from Sign</section>;
};
```

#### ProfilePage.js

```javascript
import React from "react";

export const Profile = () => {
  return <section className="profileSection">Hello from Profile</section>;
};
```

## Configure the ROUTER

front/src/components/routes/index.js:

In react-router-dom v6, "Switch" is replaced by "Routes", just like "Redirect" is replaced by "Navigate".

```javascript
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "../../pages/HomePage";
import { Sign } from "../../pages/SignPage";
import { Profile } from "../../pages/ProfilePage";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default index;
```

## Update & call ROUTER in App.js

front/src/App.js

```javascript
import React from "react";
import Routes from "./components/routes";

const App = () => {
  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
```
