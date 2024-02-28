import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useEquiposContext } from "../context/EquiposContext";

import "../components/styles/estilosadminequipos.css";

function AdminEquipos() {
  const { equipos, obtenerEquipos } = useEquiposContext();
  const [monitorEquipos, setMonitorEquipos] = useState([]);
  const [piso3Equipos, setPiso3Equipos] = useState([]);
  const [piso4Equipos, setPiso4Equipos] = useState([]);

  useEffect(() => {
    obtenerEquipos();
  }, [obtenerEquipos]);

  useEffect(() => {
    // Filtrar equipos por tipo y piso
    const monitorEquiposFiltered = equipos.filter(equipo => equipo.tipo === "monitor");
    const piso3EquiposFiltered = equipos.filter(equipo => equipo.piso === 3);
    const piso4EquiposFiltered = equipos.filter(equipo => equipo.piso === 4);

    setMonitorEquipos(monitorEquiposFiltered);
    setPiso3Equipos(piso3EquiposFiltered);
    setPiso4Equipos(piso4EquiposFiltered);
  }, [equipos]);

  return (
    <div className="cajaprincipal">
      <div className="cajasecundaria">
        <div className="cajachart">
          <h1>Equipos con Monitor</h1>
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Cargando Gráfico</div>}
            data={[
              ['Tipo', 'Cantidad'],
              ['Con Monitor', monitorEquipos.length],
              ['Sin Monitor', equipos.length - monitorEquipos.length],
            ]}
            options={{
              title: 'Distribución de Equipos con Monitor',
            }}
          />
        </div>

        <div className="cajachart">
          <h1>Equipos en Piso 3</h1>
          {/* Inserta aquí el gráfico para equipos en piso 3 */}
        </div>

        <div className="cajachart"> 
          <h1>Equipos en Piso 4</h1>
          {/* Inserta aquí el gráfico para equipos en piso 4 */}
        </div>
      </div>
    </div>
  );
}

export default AdminEquipos;
