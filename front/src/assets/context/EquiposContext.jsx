import { createContext, useState, useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";

const EquiposContext = createContext();

export const EquiposProvider = ({ children }) => {
  const [equipos, setEquipos] = useState([]);
  const [detallesEquipo, setDetallesEquipo] = useState(null); // Para almacenar los detalles del equipo seleccionado
  const [empleadosAsignados, setEmpleadosAsignados] = useState([]); // Para los empleados asignados al equipo seleccionado
  const [error, setError] = useState(null);

  const obtenerEquipos = async () => {
    try {
      const response = await axios.get("http://localhost:3002/equipos");
      setEquipos(response.data);
      setError(null);
    } catch (error) {
      console.error("Error al obtener equipos:", error.message);
      setError("Error al cargar equipos. Por favor, inténtalo de nuevo.");
    }
  };

  const obtenerDetallesEquipoYEmpleados = async (equipoId) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/equipos/${equipoId}`
      );
      // Asegúrate de que la respuesta del servidor tenga la estructura esperada
      setDetallesEquipo(response.data.equipo);
      setEmpleadosAsignados(response.data.empleados);
    } catch (error) {
      console.error(
        "Error al obtener detalles del equipo y empleados:",
        error.message
      );
      setError(
        "Error al cargar los detalles del equipo. Por favor, inténtalo de nuevo."
      );
    }
  };

  const eliminarEquipo = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/equipos/${id}`);
      obtenerEquipos();
    } catch (error) {
      console.error("Error al eliminar equipo:", error.message);
      setError("Error al eliminar equipo. Por favor, inténtalo de nuevo.");
    }
  };
  const confirmarEliminarEquipo = async (id, codigoInventario) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de eliminar el equipo con código de inventario: ${codigoInventario}?`
    );
    if (confirmacion) {
      eliminarEquipo(id);
    }
  };

  const quitarAsignacionEquipo = async (codigo_inventario, numempleado) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres el equipo con código de inventario ${codigo_inventario} y el num empleado ${numempleado}?`
      )
    ) {
      try {
        const response = await fetch(
          `http://localhost:3002/asignaciones/${codigo_inventario}/${numempleado}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();

        alert(data.mensaje); // O maneja la respuesta como prefieras
        // Actualiza tu estado local o refresca los datos para reflejar el cambio en la UI
      } catch (error) {
        console.error("Error al quitar la asignación: ", error);
        alert("No se pudo quitar la asignación."); // O maneja el error como prefieras
      }
    }
  };



  const contextValue = {
    equipos,
    detallesEquipo,
    empleadosAsignados,
    error,
    eliminarEquipo,
    confirmarEliminarEquipo,
    obtenerEquipos,
    obtenerDetallesEquipoYEmpleados,
    quitarAsignacionEquipo,
    // Cualquier otra función o estado que estés proporcionando
  };

  return (
    <EquiposContext.Provider value={contextValue}>
      {children}
    </EquiposContext.Provider>
  );
};

EquiposProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useEquiposContext = () => useContext(EquiposContext);
