import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      logout();
    }, 2000);
  }, []);

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Cerrando la Sesión</h1>
      <button className="btn btn-warning" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Redireccionando...
      </button>
    </div>
  );
}

export default Logout;
