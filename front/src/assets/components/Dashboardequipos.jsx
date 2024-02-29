import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import { useEquiposContext } from "../context/EquiposContext";
import "../components/styles/estilodashboardequipo.css";
import AdminEquipos from "./AdminEquipos";

function Dashboardequipos() {
  const { equipos, obtenerEquipos } = useEquiposContext();
  const [ubicacionesData, setUbicacionesData] = useState([]);
  const [suscripcionOfficeData, setSuscripcionOfficeData] = useState([]);
  const [tiposEquiposData, setTiposEquiposData] = useState([]);

  useEffect(() => {
    obtenerEquipos();
  }, [obtenerEquipos]);

  useEffect(() => {
    // Agrupar equipos por ubicación y contar cuántos equipos hay en cada ubicación
    const equiposPorUbicacion = equipos.reduce((acc, equipo) => {
      if (acc[equipo.ubicacion]) {
        acc[equipo.ubicacion] += 1;
      } else {
        acc[equipo.ubicacion] = 1;
      }
      return acc;
    }, {});

    // Convertir los datos en el formato requerido por Google Charts
    const ubicacionesChartData = Object.entries(equiposPorUbicacion).map(
      ([ubicacion, cantidad]) => [ubicacion, cantidad]
    );

    // Establecer los datos para la gráfica de ubicaciones
    setUbicacionesData([
      ["Ubicación", "Cantidad de Equipos"],
      ...ubicacionesChartData,
    ]);

    // Contar equipos con y sin suscripción a Office
    const equiposConSuscripcion = equipos.filter(
      (equipo) => equipo.suscripcion_office === "si"
    ).length;
    const equiposSinSuscripcion = equipos.length - equiposConSuscripcion;

    // Establecer los datos para la gráfica de suscripción a Office
    setSuscripcionOfficeData([
      ["Suscripción Office", "Cantidad de Equipos"],
      ["Con Suscripción", equiposConSuscripcion],
      ["Sin Suscripción", equiposSinSuscripcion],
    ]);

    // Agrupar equipos por tipo y contar cuántos equipos hay de cada tipo
    const equiposPorTipo = equipos.reduce((acc, equipo) => {
      if (acc[equipo.tipo_equipo]) {
        acc[equipo.tipo_equipo] += 1;
      } else {
        acc[equipo.tipo_equipo] = 1;
      }
      return acc;
    }, {});

    // Convertir los datos en el formato requerido por Google Charts
    const tiposEquiposChartData = Object.entries(equiposPorTipo).map(
      ([tipo, cantidad]) => [tipo, cantidad]
    );

    // Establecer los datos para la gráfica de tipos de equipos
    setTiposEquiposData([
      ["Tipo de Equipo", "Cantidad de Equipos"],
      ...tiposEquiposChartData,
    ]);
  }, [equipos]);

  return (
    <div className="principalcontainer">
      <div className="cajaadminequipos">
        <AdminEquipos />
      </div>

      <div className="cajasecundaria">
        <div className="cajachart">
          <h1>Distribución de Equipos por Ubicación</h1>
          <Chart
            width={"100%"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Cargando Gráfico</div>}
            data={ubicacionesData}
            options={{
              title: "Distribución de Equipos por Ubicación",
              pieSliceText: "value",
            }}
          />
          <p>Total de Equipos: {equipos.length}</p>
        </div>
        <div className="cajachart">
          <h1>Distribución de Equipos por Suscripción Office</h1>
          <Chart
            width={"100%"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Cargando Gráfico</div>}
            data={suscripcionOfficeData}
            options={{
              title: "Distribución de Equipos por Suscripción Office",
              pieSliceText: "value",
            }}
          />
          <p>Total de Equipos: {equipos.length}</p>
        </div>
        <div className="cajachart">
          <h1>Distribución de Tipos de Equipos</h1>
          <Chart
            width={"100%"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Cargando Gráfico</div>}
            data={tiposEquiposData}
            options={{
              title: "Distribución de Tipos de Equipos",
              pieSliceText: "value",
            }}
          />
          <p>Total de Equipos: {equipos.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboardequipos;
