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
        <Route path="/" element={<Sign />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default index;
