import React from "react";
import MenuSuperior from "./MenuSuperior";
import Footer from "./Footer";
import { useOutlet } from "react-router-dom";

function LayoutPublico() {
  const outlet = useOutlet();

  return (
    <>
      <MenuSuperior />
      <main className="container h-100">{outlet}</main>

      <Footer />
    </>
  );
}

export default LayoutPublico;
