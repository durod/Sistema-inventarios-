import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import { useEquiposContext } from "../../context/EquiposContext.jsx";
import AdminEquipos from "../adminequipos/AdminEquipos.jsx";

import Accordion from "react-bootstrap/Accordion";
import "../dashboardequipos/estilodashboardequipo.css";

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
      ...ubicacionesChartData.map(([ubicacion, cantidad]) => [
        `${ubicacion}   ${cantidad}`, // Agregar la cantidad de equipos al nombre de la ubicación
        cantidad, // Pasar la cantidad como segundo valor
      ]),
    ]);

    // Contar equipos con y sin suscripción a Office
    const equiposConSuscripcion = equipos.filter(
      (equipo) => equipo.suscripcion_office === "si"
    ).length;
    const equiposSinSuscripcion = equipos.length - equiposConSuscripcion;

    // Establecer los datos para la gráfica de suscripción a Office
    setSuscripcionOfficeData([
      ["Suscripción Office", "Cantidad de Equipos"],
      [`Con Suscripción (${equiposConSuscripcion})`, equiposConSuscripcion], // Agregar la cantidad de equipos con suscripción
      [`Sin Suscripción (${equiposSinSuscripcion})`, equiposSinSuscripcion], // Agregar la cantidad de equipos sin suscripción
    ]);

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
      ...tiposEquiposChartData.map(([tipo, cantidad]) => [
        `${tipo} (${cantidad})`, // Agregar la cantidad de equipos al nombre del tipo de equipo
        cantidad, // Pasar la cantidad como segundo valor
      ]),
    ]);
  }, [equipos]);

  return (
    <div className="containerdashboard">
      <div className="cajaadminequiposdashboard">
        <AdminEquipos />
      </div>

      <div className="cajasecundariadashboard">
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Distribución de Equipos por Ubicación
            </Accordion.Header>
            <Accordion.Body>
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
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              Distribución de Equipos por Suscripción Office
            </Accordion.Header>
            <Accordion.Body>
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
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              Distribución de Tipos de Equipos
            </Accordion.Header>
            <Accordion.Body>
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
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default Dashboardequipos;
