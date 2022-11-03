import { useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";

const useApiArquetipo = () => {
  const { token } = useAuth();

  const header_autenticado = {
    Content_Type: "application/json",
    Accept: "*/*",
    Authorization: "Bearer " + token,
  };

  const [data, setData] = useState(null);
  const [personas, setPersonas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getGenerico = async (url) => {
    console.log("getGenerico >> " + url);
    setLoading(true);
    try {
      await axios.get(url, { headers: header_autenticado }).then((res) => {
        setData(res.data);
        setLoading(false);
        setError(null);
      });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const deleteGenerico = async (url, formulario) => {
    console.log("deleteGenerico >> " + url);
    setLoading(true);
    try {
      await axios
        .delete(url, { data: formulario }, { headers: header_autenticado })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const postGenerico = async (url, formulario) => {
    console.log("postGenerico >> " + url);
    setLoading(true);
    try {
      await axios
        .post(url, formulario, { headers: header_autenticado })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const buscarPersonaPorID = async (alerta_id, setValoresFormulario) => {
    setLoading(true);

    try {
      await axios
        .get(process.env.REACT_APP_WS_BENEFICIARIOS + "/" + alerta_id, {
          headers: header_autenticado,
        })
        .then((res) => {
          setLoading(false);
          setError(null);
          setValoresFormulario(res.data);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const crearRegistroPersona = async (formulario) => {
    console.log("useApiArquetipo.crearRegistroPersona");
    console.log(formulario);
    setLoading(true);
    try {
      await axios
        .post(process.env.REACT_APP_WS_BENEFICIARIOS, formulario, {
          headers: header_autenticado,
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const actualizarRegistroPersona = async (formulario) => {
    console.log("useApiArquetipo.actualizarRegistroPersona");
    console.log(formulario);
    setLoading(true);
    try {
      await axios
        .put(
          process.env.REACT_APP_WS_BENEFICIARIOS + "/" + formulario.id,
          formulario,
          {
            headers: header_autenticado,
          }
        )
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (err) {
      console.log(err);
      setError(setError(err.message || "Unexpected Error!"));
      setLoading(false);
    }
  };

  const eliminarRegistroPersona = async (idPersona) => {
    console.log("useApiArquetipo.actualizarRegistroPersona");

    setLoading(true);
    try {
      await axios
        .delete(process.env.REACT_APP_WS_BENEFICIARIOS + "/" + idPersona, {
          headers: header_autenticado,
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (err) {
      console.log(err);
      setError(setError(err.message || "Unexpected Error!"));
      setLoading(false);
    }
  };

  const loginUsuarioFonasa = async (usuario, password, login) => {
    let url = process.env.REACT_APP_WS_LOGIN_FONASA;

    const formData = new FormData();
    formData.append("user", usuario);
    formData.append("password", password);

    console.log("loginUsuarioFonasa >> " + url);
    setLoading(true);
    try {
      await axios.post(url, formData).then((res) => {
        setData(res.data);
        setLoading(false);
        setError(null);
        login(res.data.user_info);
      });
    } catch (error) {
      console.log(error);
      setError(error.response.data.mensaje);
      setLoading(false);
    }
  };

  const buscarPersonas = async () => {
    let url = process.env.REACT_APP_WS_BENEFICIARIOS;
    setLoading(true);

    try {
      await axios
        .get(url, {
          headers: header_autenticado,
        })
        .then((res) => {
          setLoading(false);
          setError(null);
          setPersonas(res.data);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
    setLoading(false);
  };

  return {
    crearRegistroPersona,
    loading,
    error,
    data,
    personas,
    loginUsuarioFonasa,
    actualizarRegistroPersona,
    buscarPersonaPorID,
    buscarPersonas,
    eliminarRegistroPersona,
  };
};

export default useApiArquetipo;
