import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useApiArquetipo from "../../hooks/useApiArquetipo";

import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import MensajeExito from "../../components/MensajeExito";

export const FormularioLogin = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  let apiArquetipo = useApiArquetipo();
  const [cssFormulario, setCssFormulario] = useState(
    "row g-3 needs-validation"
  );
  const [valoresFormulario, setValoresFormulario] = useState({
    tipo_usuario: "FONASA",
    rut_externo: "",
    usuario_fonasa: "",
    password: "",
  });
  const gestionarCambioValor = async (evt) => {
    const { target } = evt;
    const { name, value } = target;
    const newValoresFormulario = { ...valoresFormulario, [name]: value };
    setValoresFormulario(newValoresFormulario);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setCssFormulario("was-validated needs-validation row g-3 ");
    } else {
      apiArquetipo.loginUsuarioFonasa(
        valoresFormulario.usuario_fonasa,
        valoresFormulario.password,
        login
      );
      setCssFormulario("needs-validation row g-3 ");
    }
  };

  return (
    <div className="container w-50 mt-4">
      <h1 className="mb-3">Formulario de Acceso</h1>
      {apiArquetipo.loading && <Cargando />}
      {apiArquetipo.error && <MensajeError mensaje={apiArquetipo.error} />}
      {apiArquetipo.data && (
        <>
          <MensajeExito mensaje={apiArquetipo.data.mensaje} />
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Ir a mantenedor
          </button>
          {token}
        </>
      )}
      <form onSubmit={handleSubmit} className={cssFormulario} noValidate>
        {/* tipo_usuario */}
        <div className="col-md-12">
          <div className="form-check">
            <input
              className="form-check-input"
              disabled={true}
              type="radio"
              name="tipo_usuario"
              id="tipo_usuario_externo"
              onChange={gestionarCambioValor}
              value="EXTERNO"
              checked={valoresFormulario.tipo_usuario === "EXTERNO"}
            />
            <label htmlFor="tipo_usuario_externo" className="form-check-label">
              EXTERNO
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              disabled={true}
              type="radio"
              name="tipo_usuario"
              id="tipo_usuario_fonasa"
              onChange={gestionarCambioValor}
              value="FONASA"
              checked={valoresFormulario.tipo_usuario === "FONASA"}
            />
            <label htmlFor="tipo_usuario_fonasa" className="form-check-label">
              FONASA
            </label>
          </div>
        </div>
        <hr />
        <span className="text-danger">Poner cualquier credencial</span>
        <hr />

        {/* usuario_fonasa */}
        <div className="col-md-12 mb-3">
          <label htmlFor="usuario_fonasa" className="form-label">
            Usuario FONASA
          </label>
          <input
            type="text"
            className="form-control"
            id="usuario_fonasa"
            name="usuario_fonasa"
            value={valoresFormulario.usuario_fonasa}
            onChange={gestionarCambioValor}
            required
          />
          <div className="invalid-feedback">Debe ingresar un valor</div>
        </div>

        {/* password */}
        <div className="col-md-12 mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={valoresFormulario.password}
            onChange={gestionarCambioValor}
            required
          />
          <div className="invalid-feedback">Debe ingresar un valor</div>
        </div>

        <div className="col-md-6 mb-3">
          <button
            className="btn btn-sm btn-primary d-flex align-items-center"
            type="submit"
          >
            <em className="material-icons md-18">login</em> Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioLogin;
