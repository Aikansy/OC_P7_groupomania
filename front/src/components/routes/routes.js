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
import { SiteHeader } from "../header/header_site";
import { SignHeader } from "../header/header_sign";
import { SiteFooter } from "../footer/footer_site";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignChild />} />
        <Route path="/home" element={<HomeChild />} />
        <Route path="/post/:id" element={<PostChild />} />
        <Route path="/profile/:nickname/:id" element={<ProfileChild />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default index;

function SignChild() {
  return (
    <>
      <SignHeader />
      <main>
        <PageSign />
      </main>
      <SiteFooter />
    </>
  );
}

function PostChild() {
  return (
    <>
      <SiteHeader />
      <main>
        <PagePost />
      </main>
      <SiteFooter />
    </>
  );
}

function ProfileChild() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageProfile />
      </main>
      <SiteFooter />
    </>
  );
}

function HomeChild() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHome />
      </main>
      <SiteFooter />
    </>
  );
}
