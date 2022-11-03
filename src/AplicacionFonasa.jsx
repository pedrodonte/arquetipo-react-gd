import { Routes, Route } from "react-router-dom";

import IndexPersona from "./pages/IndexPersona";
import FormularioPersona from "./pages/FormularioPersona";
import FormularioLogin from "./pages/autenticacion/FormularioLogin";
import Logout from "./pages/autenticacion/Logout";

import { HomePage } from "./pages/HomePage";

import LayoutFonasa from "./components/LayoutFonasa";
import LayoutPublico from "./components/LayoutPublico";

function AplicacionFonasa() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route element={<LayoutFonasa />}>
        <Route path="/" element={<IndexPersona />} />

        <Route
          path="/persona-nuevo"
          element={<FormularioPersona editar={true} />}
        />
        <Route
          path="/persona-detalle/:id"
          element={<FormularioPersona editar={false} />}
        />
        <Route
          path="/persona-editar/:id"
          element={<FormularioPersona editar={true} />}
        />
      </Route>
      <Route element={<LayoutPublico />}>
        <Route path="/login" element={<FormularioLogin />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
}

export default AplicacionFonasa;
