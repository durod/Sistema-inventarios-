import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const EquiposContext = createContext();

export const EquiposProvider = ({ children }) => {
  const [equipos, setEquipos] = useState([]);
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

  const obtenerDatosEquipoPorId = async (id) => {
    try {
      const URI = "http://localhost:3002/equipos";
      const response = await axios.get(`${URI}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos del equipo:", error.message);
      throw new Error(
        "Error al cargar datos del equipo. Por favor, inténtalo de nuevo."
      );
    }
  };

  const agregarEquipo = async (nuevoEquipo) => {
    try {
      await axios.post("http://localhost:3002/equipos", nuevoEquipo);
      obtenerEquipos();
    } catch (error) {
      console.error("Error al agregar equipo:", error.message);
      setError("Error al agregar equipo. Por favor, inténtalo de nuevo.");
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

  const contextValue = {
    equipos,
    error,
    agregarEquipo,
    eliminarEquipo,
    confirmarEliminarEquipo,
    obtenerEquipos,
    obtenerDatosEquipoPorId,
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
