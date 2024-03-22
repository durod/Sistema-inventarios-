import { useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";

import "../busquedaequipos/estilobuscadeequipo.css";
import AdminEquipos from "../adminequipos/AdminEquipos.jsx";
import { useEquiposContext } from "../../context/EquiposContext.jsx"; // Asegúrate de que la ruta sea correcta

const backendURL = import.meta.env.VITE_BACKEND_URL;

const BusquedaEquipos = () => {
  const [parametro, setParametro] = useState("");
  const [equipos, setEquipos] = useState([]);
  const { usuarioActual, confirmarEliminarEquipo, quitarAsignacionEquipo } =
    useEquiposContext(); // Utiliza las funciones del contexto

  const buscarEquipos = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/buscarEquipo?parametro=${parametro}`
      );
      setEquipos(response.data);
      
    } catch (error) {
      console.error("Error al buscar equipos:", error.message);
    
    }
  };

  const renderEquipos = () => {
    return equipos.map((equipo) => (
      <tr key={equipo.id}>
        {/* Información de empleados */}
        <td className="text-center align-middle">{equipo.numempleado}</td>
        <td className="text-center align-middle">
          {`${equipo.nombre} ${equipo.appaterno} ${equipo.apmaterno}`}
        </td>
        <td className="text-center align-middle">{equipo.id_direccion}</td>
        <td className="text-center align-middle">{equipo.id_departamento}</td>

        <td className="text-center align-middle">{equipo.codigo_inventario}</td>
        <td className="text-center align-middle">{equipo.numero_serie}</td>
        <td className="text-center align-middle">{equipo.marca}</td>
        <td className="text-center align-middle">{equipo.modelo}</td>
        <td className="text-center align-middle">{equipo.monitor}</td>

        <td>
          <Link
            to={`/datoscompletos/${equipo.codigo_inventario}/${
              equipo.numempleado || "sinEmpleado"
            }`}
            className="btn btn-info mb-2"
          >
            Ver Más
          </Link>
          {usuarioActual && usuarioActual.rol !== "RH" && (
            <>
              <button
                className="btn btn-danger mx-auto"
                onClick={() =>
                  confirmarEliminarEquipo(equipo.id, equipo.codigo_inventario)
                }
              >
                Eliminar
              </button>
              {/* Asegúrate de incluir 'Quitar Asignación' si es una acción disponible y relevante */}
              <button
                className="btn btn-warning mx-auto"
                onClick={() =>
                  quitarAsignacionEquipo(
                    equipo.codigo_inventario,
                    equipo.numempleado
                  )
                }
              >
                Quitar Asignación
              </button>
            </>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="cajaprincipalbusquedaequipos">
      <div className="cajaadminequiposbusquedaequipos">
        <AdminEquipos />
      </div>
      <div className=" colbuscar ">
        <div className="form-group mb-3 col-md-4 colbuscarequipos">
          <input
            type="text"
            id="parametro"
            className="form-control form-control-sm mr-2"
            placeholder="Parámetro de búsqueda:"
            value={parametro}
            onChange={(e) => setParametro(e.target.value)}
          />
          <button
            className="btn btn-success "
            size="sm"
            onClick={buscarEquipos}
          >
            Buscar
          </button>
        </div>
        <h1>Resultados de Búsqueda de Equipos: </h1>

      
        <Table striped bordered hover variant="dark" className="custom-table">
          <thead>
            <tr>
              <th className="text-center align-middle">Número de Empleado</th>
              <th className="text-center align-middle">Empleado </th>

              <th className="text-center align-middle">Dirección</th>
              <th className="text-center align-middle">Departamento</th>

              <th className="text-center align-middle">Código de Inventario</th>

              <th className="text-center align-middle">Número de Serie</th>
              <th className="text-center align-middle">Marca</th>
              <th className="text-center align-middle">Modelo</th>
              <th className="text-center align-middle">Monitor</th>
              <th className="text-center align-middle">Acciones</th>
            </tr>
          </thead>
          <tbody>{renderEquipos()}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default BusquedaEquipos;
