import Table from "react-bootstrap/Table";
import axios from "axios";
import { useState, useEffect } from "react";

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

  const renderEquipos = () => {
    return equipos.map((equipo) => (
      <tr key={equipo.id}>
        {/* Información de equipos */}
        <td className="text-center align-middle">{equipo.codigo_inventario}</td>

        <td className="text-center align-middle">1</td>
        <td className="text-center align-middle">{`${equipo.tipo_equipo} ${
          equipo.marca
        } ${equipo.modelo} S/N ${equipo.numero_serie} ${
          equipo.numero_serie_cargador
            ? `Cargador: ${equipo.numero_serie_cargador}`
            : ""
        } ${equipo.teclado ? `Teclado: ${equipo.teclado}` : ""} ${
          equipo.raton ? `Raton: ${equipo.raton}` : ""
        } ${equipo.monitor ? `Monitor: ${equipo.monitor}` : ""}`}</td>

        <td className="text-center align-middle">{equipo.ubicacion}</td>

        <td className="text-center align-middle">{equipo.id_departamento}</td>
        <td className="text-center align-middle">
          <img
            src={`../../../public/uploads/${equipo.codigo_inventario}.jpg`}
            alt={equipo.codigo_inventario}
             // Establece un tamaño máximo para la imagen
          />
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="cajaprincipalauditor">
        <h1>AUDITORES</h1>

        <div>
          <Table striped bordered hover variant="dark" className="custom-table">
            <thead>
              <tr>
                <th colSpan={6} className="text-center align-middle">
                  {" "}
                  ANEXO A
                </th>
              </tr>
              <tr>
                <th className="text-center align-middle"> DOMICILIO:</th>
                <th colSpan={5} className="text-center align-middle">
                  Av. San Jerónimo 458, Col. Jardines del Pedregal, C.P. 01900,
                  México CDMX{" "}
                </th>
              </tr>
              <tr>
                <th className="text-center align-middle">CÓDIGO</th>
                <th className="text-center align-middle">PIEZAS</th>
                <th className="text-center align-middle">
                  DESCRIPCIÓN ESPECÍFICA
                </th>
                <th className="text-center align-middle">UBICACIÓN</th>

                <th className="text-center align-middle">DEPARTAMENTO</th>
                <th className="text-center align-middle">FOTO</th>
              </tr>
            </thead>
            <tbody>{renderEquipos()}</tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default VistaAuditor;
