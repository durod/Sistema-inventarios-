import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "../components/styles/estilobuscadeequipo.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const BusquedaEquipos = () => {
  const [parametro, setParametro] = useState("");
  const [equipos, setEquipos] = useState([]);
  const [error, setError] = useState(null);

  const buscarEquipos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/buscarEquipo?parametro=${parametro}`
      );
      setEquipos(response.data);
      setError(null);
    } catch (error) {
      console.error("Error al buscar equipos:", error.message);
      setError("Error al buscar equipos. Por favor, inténtalo de nuevo.");
    }
  };
  const eliminarEquipo = async (id, codigoInventario) => {
    try {
      const confirmacion = window.confirm(
        `¿Estás seguro de eliminar el equipo con código de inventario: ${codigoInventario}?`
      );
      if (confirmacion) {
        await axios.delete(`http://localhost:3002/equipos/${id}`);
        buscarEquipos();
      }
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
            onClick={() => eliminarEquipo(equipo.id, equipo.codigo_inventario)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="cajaPrincipal">
      <div className="row">
        <div className="col colbuscar ">
          <div className="form-group mb-3 col-md-4 colbuscarinput">
            <input
              type="text"
              id="parametro"
              className="form-control form-control-sm mr-2"
              placeholder="Parámetro de búsqueda:"
              value={parametro}
              onChange={(e) => setParametro(e.target.value)}
            />
            <button
              className="btn btn-primary mb-3 "
              size="sm"
              onClick={buscarEquipos}
            >
              Buscar
            </button>
          </div>
          <h1>Resultados de Búsqueda de Equipos: </h1>

          {error && <div className="alert alert-danger">{error}</div>}
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
      <Col>
        <Button
          variant="secondary"
          onClick={() => (window.location.href = "/")}
        >
          Ir a Home
        </Button>
      </Col>
    </div>
  );
};

export default BusquedaEquipos;
