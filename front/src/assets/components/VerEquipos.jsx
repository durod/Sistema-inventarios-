import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const URI = "http://localhost:3002/equipos";
import Table from "react-bootstrap/Table";

function VerEquipos() {
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

  const confirmarEliminarEquipo = async (id, codigoInventario) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de eliminar el equipo con código de inventario: ${codigoInventario}?`
    );
    if (confirmacion) {
      eliminarEquipo(id);
    }
  };

  const eliminarEquipo = async (id) => {
    try {
      console.log("Antes de eliminar el equipo, ID:", id);
      await axios.delete(`${URI}/${id}`);
      console.log("Después de eliminar el equipo");
      verEquipos();
    } catch (error) {
      console.error("Error al eliminar equipo:", error.message);
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
        <td className="text-center align-middle">{equipo.puesto}</td>

        {/* Información de equipos */}
        <td className="text-center align-middle">{equipo.codigo_inventario}</td>
        {/* Resto de las columnas de equipos */}
        <td className="text-center align-middle">{equipo.numero_serie}</td>
        <td className="text-center align-middle">{equipo.marca}</td>
        <td className="text-center align-middle">{equipo.modelo}</td>
        <td className="text-center align-middle">{equipo.monitor}</td>
        {/* Resto de las columnas de equipos */}

        <td>
          <Link
            to={`/datoscompletos/${equipo.id}`}
            className="btn btn-info mb-2"
          >
            Ver Mas
          </Link>
          <button
            className="btn btn-danger mx-auto"
            onClick={() =>
              confirmarEliminarEquipo(equipo.id, equipo.codigo_inventario)
            }
          >
            Eliminar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Lista de Equipos</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="botonesAgregarBuscar">
            <Link to="/agregarequipo" className="btn btn-primary mt-2 mb-2 ">
              Agregar Equipo
            </Link>
            <Link to="/buscarEquipo" className="btn btn-primary mt-2 mb-2">
              Buscar Equipo
            </Link>
          </div>
          <Table striped bordered hover variant="dark" className="custom-table">
            <thead>
              <tr>
                <th className="text-center align-middle">Número de Empleado</th>
                <th className="text-center align-middle">Empleado </th>

                <th className="text-center align-middle">Dirección</th>
                <th className="text-center align-middle">Departamento</th>
                <th className="text-center align-middle">Puesto</th>
                <th className="text-center align-middle">
                  Código de Inventario
                </th>

                <th className="text-center align-middle">Número de Serie</th>
                <th className="text-center align-middle">Marca</th>
                <th className="text-center align-middle">Modelo</th>
                {/* <th className="text-center align-middle ">Tipo de Equipo</th> */}
                {/* <th className="text-center align-middle"> Sistema Operativo</th>
                <th className="text-center align-middle">Memoria RAM</th>
                <th className="text-center align-middle">Procesador</th>
                <th className="text-center align-middle">Almacenamiento</th>
                <th className="text-center align-middle">
                  Número de Serie del Cargador
  </th> */}
                <th className="text-center align-middle">Monitor</th>
                {/*  <th className="text-center align-middle">Teclado</th>
                <th className="text-center align-middle">Ratón</th>
                <th className="text-center align-middle">Accesorios</th>
                <th className="text-center align-middle">
                  Suscripción a Office
</th> */}
                <th className="text-center align-middle">Acciones</th>
              </tr>
            </thead>
            <tbody>{renderEquipos()}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default VerEquipos;
