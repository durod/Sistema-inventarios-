import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

//importamos el router
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerEquipos from "./assets/components/VerEquipos";
import AgregarEquipo from "./assets/components/AgregarEquipo";
import ActualizarEquipo from "./assets/components/ActualizarEquipo";
import BusquedaEquipos from "./assets/components/BusquedaEquipos";
import DatosCompletos from "./assets/components/DatosCompletos";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VerEquipos />} />
          <Route path="/agregarequipo" element={<AgregarEquipo />} />
          <Route path="/actualizarequipo/:id" element={<ActualizarEquipo />} />
          <Route path="/datoscompletos/:id" element={<DatosCompletos />} />
          <Route path="/buscarEquipo" element={<BusquedaEquipos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
