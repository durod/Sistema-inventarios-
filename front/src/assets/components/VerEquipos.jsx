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
      await axios.delete(`${URI}/${id}`);
      verEquipos();
    } catch (error) {
      console.error("Error al eliminar equipo:", error.message);
    }
  };

  const renderEquipos = () => {
    return equipos.map((equipo) => (
      <tr key={equipo.id}>
        <td className="text-center align-middle">{equipo.codigo_inventario}</td>
      {/*  <td className="text-center align-middle">{equipo.tipo_equipo}</td> */}
        <td className="text-center align-middle">{equipo.numero_serie}</td>
        <td className="text-center align-middle">{equipo.marca}</td>
        <td className="text-center align-middle">{equipo.modelo}</td>
     {/* <td className="text-center align-middle">{equipo.sistema_operativo}</td>
        <td className="text-center align-middle">{equipo.memoria_ram}</td>
        <td className="text-center align-middle">{equipo.procesador}</td>
        <td className="text-center align-middle">{equipo.almacenamiento}</td>
        <td className="text-center align-middle">
          {equipo.numero_serie_cargador}
    </td> */}
        <td className="text-center align-middle">{equipo.monitor}</td>
      {/* <td className="text-center align-middle">{equipo.teclado}</td>
        <td className="text-center align-middle">{equipo.raton}</td>
        <td className="text-center align-middle">{equipo.accesorios}</td>
        <td className="text-center align-middle">
          {equipo.suscripcion_office}
  </td> */}
        <td>
          <Link
            to={`/actualizarequipo/${equipo.id}`}
            className="btn btn-info mb-2"
          >
            Actualizar
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
                <th className="text-center align-middle">
                  Código de Inventario
                </th>
               {/* <th className="text-center align-middle ">Tipo de Equipo</th> */}
                <th className="text-center align-middle">Número de Serie</th>
                <th className="text-center align-middle">Marca</th>
                <th className="text-center align-middle">Modelo</th>
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
