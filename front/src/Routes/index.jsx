import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage } from "../Pages/homePage";
import { SignPage } from "../Pages/signPage";
import { ProfilePage } from "../Pages/profilePage";

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
