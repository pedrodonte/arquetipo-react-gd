import React from "react";
import topIMG from "../assets/top.svg";
import gobFooter from "../assets/gob-footer.svg";
import logoFonasaMini from "../assets/logo-fonasa-mini.svg";

function Footer() {
  const current = new Date();
  const year = current.getFullYear();
  return (
    <footer className="footer mt-auto py-3 h-25">
      <a className="btn-up" href="#">
        <img src={topIMG} alt="button to top" />
      </a>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <img
              className="footer-default-logo"
              src={gobFooter}
              alt="logo Ministerio de Salud"
            />
            <img
              className="footer-mobile-logo"
              src={logoFonasaMini}
              alt="logo Ministerio de Salud"
            />
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-md-12 text-muted">
                © {year} Copyright FONASA, todos los derechos reservados
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-muted">
                División de Técnologías de la Información y Comunicaciones
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
