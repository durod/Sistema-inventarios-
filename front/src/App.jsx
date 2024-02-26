
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EquiposProvider } from "./assets/context/EquiposContext.jsx"; // Importamos el proveedor del contexto
import VerEquipos from "./assets/components/VerEquipos";
import AgregarEquipo from "./assets/components/AgregarEquipo";
import ActualizarEquipo from "./assets/components/ActualizarEquipo";
import BusquedaEquipos from "./assets/components/BusquedaEquipos";
import DatosCompletos from "./assets/components/DatosCompletos";
import Responsiva from "./assets/components/Responsiva";
import Header from "./assets/components/Header";
import VistaAuditor from "./assets/components/VistaAuditor";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <EquiposProvider> {/* Envolver la aplicación con el proveedor del contexto */}
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<VerEquipos />} />
            <Route path="/agregarequipo" element={<AgregarEquipo />} />
            <Route path="/actualizarequipo/:id" element={<ActualizarEquipo />} />
            <Route path="/datoscompletos/:id" element={<DatosCompletos />} />
            <Route path="/buscarEquipo" element={<BusquedaEquipos />} />
            <Route path="/verResponsiva/:id" element={<Responsiva />} />
            <Route path="/vistaauditor" element={<VistaAuditor />} />
          </Routes>
        </BrowserRouter>
      </>
    </EquiposProvider>
  );
}

export default App;
