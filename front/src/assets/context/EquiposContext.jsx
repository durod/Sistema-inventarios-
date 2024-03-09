import { createContext, useState, useContext, useEffect } from "react";
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

  const contextValue = {
    equipos,
    detallesEquipo,
    empleadosAsignados,
    error,
    obtenerEquipos,
    obtenerDetallesEquipoYEmpleados,
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
