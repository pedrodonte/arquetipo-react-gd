import { useEffect, useState } from "react";
import constantes from "../components/constantes.json";
import { useParams, useNavigate } from "react-router-dom";
import Cargando from "../components/Cargando";
import { useAuth } from "../hooks/useAuth";
import useApiArquetipo from "../hooks/useApiArquetipo";
import MensajeError from "../components/MensajeError";
import MensajeExito from "../components/MensajeExito";

function FormularioPersona(props) {
  let navigate = useNavigate();
  let params = useParams();
  let apiArquetipo = useApiArquetipo();

  const { usuario_jwt } = useAuth();

  const [cssFormulario, setCssFormulario] = useState(
    "row g-3 needs-validation"
  );

  const [formularioDesahabilitado, setFormularioDesahabilitado] =
    useState(false);

  const [valoresFormulario, setValoresFormulario] = useState({
    fecha_nacimiento: "",
    nombre: "",
    foto: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    comuna: "",
    genero: "",
    email: "",
    id: "",
    autor: usuario_jwt().run,
    descripcion: "blah blah blah",
  });

  const gestionarEnvioFormulario = async (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    console.log("gestionarEnvioFormulario");

    if (form.checkValidity() === false) {
      evt.stopPropagation();
      setCssFormulario("was-validated needs-validation row g-3 ");
    } else {
      setCssFormulario("was-validated needs-validation row g-3 ");

      if (valoresFormulario.id) {
        await actualizarAlerta();
      } else {
        await crearRegistroPersona(valoresFormulario);
      }
      setFormularioDesahabilitado(true);
      navigate("/");
    }
  };

  const actualizarAlerta = async () => {
    console.log("actualizarAlerta");
    await console.log("crearRegistroPersona");
    await apiArquetipo.actualizarRegistroPersona(valoresFormulario);
  };

  const crearRegistroPersona = async (formulario) => {
    await console.table(valoresFormulario);
    await console.log("crearRegistroPersona");
    await apiArquetipo.crearRegistroPersona(valoresFormulario);
  };

  const gestionarCambioValor = async (evt) => {
    const { target } = evt;
    const { name, value } = target;
    const newValoresFormulario = { ...valoresFormulario, [name]: value };
    setValoresFormulario(newValoresFormulario);
  };

  const buscarPersonaPorID = async (formulario) => {
    await apiArquetipo.buscarPersonaPorID(params.id, setValoresFormulario);
  };

  const refrescar = async () => {
    buscarPersonaPorID(params.id);
  };

  useEffect(() => {
    if (params.id) {
      buscarPersonaPorID(params.id);
    }
    setFormularioDesahabilitado(!props.editar);
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        {apiArquetipo.loading && <Cargando />}

        {apiArquetipo.error && (
          <div className="alert alert-danger" role="alert">
            {apiArquetipo.error}
          </div>
        )}

        <h4 className="mb-3">Formulario Registro</h4>
        {valoresFormulario && (
          <form
            noValidate
            className={cssFormulario}
            onSubmit={gestionarEnvioFormulario}
          >
            <div className="col-md-2">
              <label htmlFor="id" className="form-label">
                ID
              </label>
              <input
                type="text"
                disabled={formularioDesahabilitado}
                className="form-control"
                id="id"
                name="id"
                value={valoresFormulario.id}
                onChange={gestionarCambioValor}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            <div className="col-md-2">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                disabled={formularioDesahabilitado}
                className="form-control"
                id="nombre"
                name="nombre"
                value={valoresFormulario.nombre}
                onChange={gestionarCambioValor}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            <div className="col-md-2">
              <label htmlFor="apellidos" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                disabled={formularioDesahabilitado}
                className="form-control"
                id="apellidos"
                name="apellidos"
                value={valoresFormulario.apellidos}
                onChange={gestionarCambioValor}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            <div className="col-md-4">
              <label htmlFor="genero" className="form-label">
                Genero
              </label>

              <select
                className="form-select"
                disabled={formularioDesahabilitado}
                id="genero"
                name="genero"
                defaultValue={"HOMBRE"}
                value={valoresFormulario.genero}
                onChange={gestionarCambioValor}
                required
              >
                <option value="HOMBRE">HOMBRE</option>
                <option value="MUJER">MUJER</option>
                <option value="OTRO">OTRO</option>
              </select>
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            <div className="col-md-3">
              <label htmlFor="fecha_nacimiento" className="form-label">
                Fecha Nacimiento
              </label>
              <input
                type="date"
                disabled={formularioDesahabilitado}
                className="form-control"
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                value={valoresFormulario.fecha_nacimiento}
                onChange={gestionarCambioValor}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            <div className="col-md-12">
              <label htmlFor="descripcion" className="form-label">
                Descripcion
              </label>
              <textarea
                className="form-control"
                id="descripcion"
                name="descripcion"
                disabled={formularioDesahabilitado}
                rows="3"
                value={valoresFormulario.descripcion}
                onChange={gestionarCambioValor}
                required
              ></textarea>

              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            <div className="col-md-4">
              <label htmlFor="telefono" className="form-label">
                Telefono
              </label>
              <input
                type="text"
                disabled={formularioDesahabilitado}
                className="form-control"
                id="telefono"
                name="telefono"
                value={valoresFormulario.telefono}
                onChange={gestionarCambioValor}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            <div className="col-md-3">
              <label htmlFor="email" className="form-label">
                Correo Electronico
              </label>
              <input
                type="text"
                disabled={formularioDesahabilitado}
                className="form-control"
                id="email"
                name="email"
                value={valoresFormulario.email}
                onChange={gestionarCambioValor}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            <div className="col-md-3">
              <label htmlFor="direccion" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                disabled={formularioDesahabilitado}
                className="form-control"
                id="direccion"
                name="direccion"
                value={valoresFormulario.direccion}
                onChange={gestionarCambioValor}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            <hr />

            <input
              type="hidden"
              disabled={true}
              className="form-control"
              id="fecha_insert"
              name="fecha_insert"
              value={valoresFormulario.fecha_insert}
              onChange={gestionarCambioValor}
              required
            />

            <input
              type="hidden"
              disabled={true}
              className="form-control"
              id="fecha_update"
              name="fecha_update"
              value={valoresFormulario.fecha_update}
              onChange={gestionarCambioValor}
              required
            />

            <div className=" d-flex  justify-content-start">
              {!formularioDesahabilitado && (
                <button type="submit" className="btn btn-danger btn-sm d-flex">
                  <span className="material-icons ">save</span> Guardar Cambios
                </button>
              )}

              <button
                onClick={() => {
                  navigate(constantes.inicial);
                }}
                className="btn btn-primary btn-sm d-flex ms-2"
              >
                <span className="material-icons ">cancel</span> Cancelar
              </button>
            </div>
          </form>
        )}

        <hr className="my-4" />
      </div>
      <div className="card-footer">
        {apiArquetipo.loading && <Cargando />}
        {apiArquetipo.error && <MensajeError mensaje={apiArquetipo.error} />}
        {apiArquetipo.data && (
          <MensajeExito mensaje={apiArquetipo.data.mensaje} />
        )}
      </div>
    </div>
  );
}

export default FormularioPersona;
