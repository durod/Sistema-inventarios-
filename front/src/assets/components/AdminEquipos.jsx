import React from "react";
import { Chart } from "react-google-charts";
import { useEquiposContext } from "../context/EquiposContext";

import "../components/styles/estilosadminequipos.css";

function AdminEquipos() {
  // const { equipos, error, obtenerEquipos } = useEquiposContext();

  /* useEffect(() => {
        obtenerEquipos();
      }, [obtenerEquipos]);
    */
  return (
    <div className="cajaprincipal">
      <div className="cajasecundaria">
        <div className="cajachart">
          <h1>div 1</h1>
        </div>

        <div className="cajachart">
          <h1>div 2</h1>
        </div>

        <div className="cajachart"> 
          <h1>div 3</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminEquipos;
