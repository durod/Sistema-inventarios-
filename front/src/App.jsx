
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EquiposProvider } from "./assets/context/EquiposContext.jsx"; // Importamos el proveedor del contexto
import VerEquipos from "./assets/components/verequipos/VerEquipos";
import AgregarEquipo from "./assets/components/agregarequipo/AgregarEquipo";
import ActualizarEquipo from "./assets/components/actualizarequipos/ActualizarEquipo";
import BusquedaEquipos from "./assets/components/busquedaequipos/BusquedaEquipos";
import DatosCompletos from "./assets/components/datoscompletos/DatosCompletos";
import Responsiva from "./assets/components/responsiva/Responsiva";
import Header from "./assets/components/header/Header";
import VistaAuditor from "./assets/components/vistaauditor/VistaAuditor";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AdminEquipos from "./assets/components/adminequipos/AdminEquipos.jsx";
import Dashboardequipos from "./assets/components/dashboardequipos/Dashboardequipos.jsx";
import RegistrarUsuario from "./assets/components/registrarusuario/RegistrarUsuario.jsx";
import LoginUser from "./assets/components/login/LoginUser.jsx";

function App() {
  return (
    <EquiposProvider> {/* Envolver la aplicación con el proveedor del contexto */}
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<VerEquipos />} />
            <Route path="/adminequipos" element={<AdminEquipos />} />
            <Route path="/agregarequipo" element={<AgregarEquipo />} />
            <Route path="/actualizarequipo/:id" element={<ActualizarEquipo />} />
            <Route path="/datoscompletos/:codigo_inventario/:numempleado" element={<DatosCompletos />} />
            <Route path="/buscarEquipo" element={<BusquedaEquipos />} />
            <Route path="/verResponsiva/:id" element={<Responsiva />} />
            <Route path="/vistaauditor" element={<VistaAuditor />} />
            <Route path="/dashboardequipos" element={<Dashboardequipos />} />
            <Route path="/registrarusuario" element={<RegistrarUsuario />} />
            <Route path="/loginuser" element={<LoginUser />} />
          </Routes>
        </BrowserRouter>
      </>
    </EquiposProvider>
  );
}

export default App;
