import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PageSign } from "../../pages/page_sign";
import { PageHome } from "../../pages/page_home";
import { PageProfile } from "../../pages/page_profile";
import { PagePost } from "../../pages/page_post";
import { HeaderSite } from "../header/header_site";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageSign />} />
        <Route path="/home" element={<HomeChild />} />
        <Route path="/post/:id" element={<PostChild />} />
        <Route path="/profile/:nickname/:id" element={<ProfileChild />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default index;

function PostChild() {
  return (
    <>
      <HeaderSite />
      <main>
        <PagePost />
      </main>
    </>
  );
}

function ProfileChild() {
  return (
    <>
      <HeaderSite />
      <main>
        <PageProfile />
      </main>
    </>
  );
}

function HomeChild() {
  return (
    <>
      <HeaderSite />
      <main>
        <PageHome />
      </main>
    </>
  );
}
