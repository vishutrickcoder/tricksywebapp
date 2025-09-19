import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "64px", minHeight: "80vh" }}>
         <children />
      </main>
      <Footer />
    </>
  );
}
