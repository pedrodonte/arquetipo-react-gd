import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Cargando from "../components/Cargando";

import Modal from "react-bootstrap/Modal";
import useApiArquetipo from "../hooks/useApiArquetipo";

function IndexPersona() {
  let apiArquetipo = useApiArquetipo();

  const [show, setShow] = useState(false);
  const cerrarPopUp = () => {
    setShow(false);
    getPersonas();
  };

  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);

  const mostrarPopUp = (persona) => {
    setPersonaSeleccionada(persona);
    setShow(true);
  };

  let navigate = useNavigate();

  const getPersonas = async () => {
    await apiArquetipo.buscarPersonas();
  };

  const confirmarEliminarRegistro = async (id) => {
    await apiArquetipo.eliminarRegistroPersona(id);
  };

  useEffect(() => {
    getPersonas();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="mb-3">Alertas de Seguridad</h4>

        <div className="row row-cols-lg-auto g-3 align-items-center">
          <div className="col-12">
            <Link to="/persona-nuevo" className="btn btn-primary">
              Crear Nuevo Registro
            </Link>
          </div>
          <div className="col-12">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                Filtro que no hace nada
              </span>
              <select className="form-select">
                <option value="EVENTO">Opcion 1</option>
                <option value="DEBILIDAD">Opcion 2</option>
                <option value="INCIDENTE">Opcion 3</option>
              </select>
              {apiArquetipo.loading && <Cargando />}
            </div>
          </div>
        </div>

        {apiArquetipo.error && (
          <div className="alert alert-danger" role="alert">
            {apiArquetipo.error}
          </div>
        )}

        <hr />
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Telefono</th>
              <th scope="col">Genero</th>
              <th scope="col">Fecha Nacimento</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {apiArquetipo.personas.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.apellidos}</td>
                <td>{item.telefono}</td>
                <td>{item.genero}</td>
                <td>{item.fecha_nacimiento.substring(0, 10)}</td>
                <td>
                  <button
                    onClick={() => {
                      navigate("/persona-detalle/" + item.id);
                    }}
                    className="btn btn-link btn-sm ms-1"
                  >
                    ver
                  </button>
                  <button
                    onClick={() => {
                      navigate("/persona-editar/" + item.id);
                    }}
                    className="btn btn-link btn-sm ms-1"
                  >
                    editar
                  </button>
                  <button
                    className="btn btn-link btn-sm ms-1"
                    onClick={() => {
                      mostrarPopUp(item);
                    }}
                  >
                    eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={cerrarPopUp}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {personaSeleccionada && (
            <div>
              <p>
                <strong>Nombre:</strong> {personaSeleccionada.nombre}
              </p>
              <p>
                <strong>Apellido:</strong> {personaSeleccionada.apellidos}
              </p>
              <p>
                <strong>Telefono:</strong> {personaSeleccionada.telefono}
              </p>
              <p>
                <strong>Genero:</strong> {personaSeleccionada.genero}
              </p>
              <p>
                <strong>Fecha Nacimiento:</strong>{" "}
                {personaSeleccionada.fecha_nacimiento.substring(0, 10)}
              </p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  confirmarEliminarRegistro(personaSeleccionada.id);
                  cerrarPopUp();
                }}
              >
                Eliminar Registro
              </button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default IndexPersona;
