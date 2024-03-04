import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const URI = "http://localhost:3002/equipos";

function VistaAuditor() {
  const [equipos, setEquipos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    verEquipos();
  }, []);

  const verEquipos = async () => {
    try {
      const response = await axios.get(URI);
      setEquipos(response.data);
      setError(null); // Limpiar el estado de error en caso de éxito
    } catch (error) {
      console.error("Error al obtener equipos:", error.message);
      setError("Error al cargar equipos. Por favor, inténtalo de nuevo."); // Guardar el error en el estado
    }
  };

  // Función para dividir los equipos por ubicación
  const dividirPorUbicacion = () => {
    const equiposPorUbicacion = {
      "PB - Almacén": [],
      "Economista P3": [],
      "Economista P4": [],
      "Santander rotativa": [],
    };
    equipos.forEach((equipo) => {
      switch (equipo.ubicacion) {
        case "pbalmacen":
          equiposPorUbicacion["PB - Almacén"].push(equipo);
          break;
        case "piso3":
          equiposPorUbicacion["Economista P3"].push(equipo);
          break;
        case "piso4":
          equiposPorUbicacion["Economista P4"].push(equipo);
          break;
        case "santander":
          equiposPorUbicacion["Santander rotativa"].push(equipo);
          break;
        default:
          break;
      }
    });
    return equiposPorUbicacion;
  };

  // Función para renderizar las pestañas y tablas por ubicación
  const renderTabs = () => {
    const equiposPorUbicacion = dividirPorUbicacion();
    return Object.entries(equiposPorUbicacion).map(([ubicacion, equipos]) => (
      <Tab key={ubicacion} eventKey={ubicacion} title={ubicacion}>
        <Table striped bordered hover variant="dark" className="custom-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Piezas</th>
              <th>Descripción Específica</th>
              <th>Ubicación</th>
              <th>Departamento</th>
              <th>Foto</th>
            </tr>
          </thead>
          <tbody>
            {equipos.map((equipo) => (
              <tr key={equipo.id}>
                <td>{equipo.codigo_inventario}</td>
                <td>{equipo.piezas}</td>
                <td>{`${equipo.tipo_equipo} ${equipo.marca} ${
                  equipo.modelo
                } S/N ${equipo.numero_serie} ${
                  equipo.numero_serie_cargador
                    ? `Cargador: ${equipo.numero_serie_cargador}`
                    : ""
                } ${equipo.teclado ? `Teclado: ${equipo.teclado}` : ""} ${
                  equipo.raton ? `Raton: ${equipo.raton}` : ""
                } ${equipo.monitor ? `Monitor: ${equipo.monitor}` : ""}`}</td>
                <td>{equipo.ubicacion}</td>
                <td>{equipo.id_departamento}</td>
                <td>
                  <img
                    src={`../../../public/uploads/${equipo.codigo_inventario}.jpg`}
                    alt={equipo.codigo_inventario}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Tab>
    ));
  };

  return (
    <div className="cajaprincipalauditor">
      <h1>AUDITORES</h1>
      <Tabs
        defaultActiveKey="PB - Almacén"
        id="ubicaciones-tabs"
        className="mb-3"
        justify
      >
        {renderTabs()}
      </Tabs>
    </div>
  );
}

export default VistaAuditor;
