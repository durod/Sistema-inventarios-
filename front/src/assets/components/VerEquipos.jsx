import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Dropdown, Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { useEquiposContext } from "../context/EquiposContext";

import "../components/styles/estiloverequipos.css";


function VerEquipos() {
  const { equipos, error, obtenerEquipos, confirmarEliminarEquipo } = useEquiposContext();
  const [viewStyle, setViewStyle] = useState("table"); // Estado para controlar el estilo de visualización
  
  useEffect(() => {
    obtenerEquipos();
  }, [obtenerEquipos]);

  const toggleViewStyle = () => {
    // Función para cambiar el estilo de visualización
    setViewStyle((prevStyle) => (prevStyle === "table" ? "cards" : "table"));
  };


  const renderEquipos = () => {
    return equipos.map((equipo) => (
      <tr key={equipo.id}>
        {/* Información de empleados */}
        <td className="text-center align-middle">{equipo.numempleado}</td>
        <td className="text-center align-middle">{`${equipo.nombre} ${equipo.appaterno} ${equipo.apmaterno}`}</td>
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
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Acciones
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={`/datoscompletos/${equipo.id}`} className="btn btn-info mb-2">
                  Ver Más
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button
                  className="btn btn-danger mx-auto"
                  onClick={() => confirmarEliminarEquipo(equipo.id, equipo.codigo_inventario)}
                >
                  Eliminar
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    ));
  };

  const renderEquiposAsCards = () => {
    // Función para renderizar los equipos como tarjetas
    return equipos.map((equipo) => (
      <Card key={equipo.id} style={{ width: '18rem' }}>
         <Card.Img variant="top"  src={`../../../public/uploads/${equipo.codigo_inventario}.jpg`}
                    alt={equipo.codigo_inventario} />
        <Card.Body>
          <Card.Title>{equipo.codigo_inventario}</Card.Title>
          <Card.Text>
            Número de Empleado: {equipo.numempleado}<br />
            Dirección: {equipo.id_direccion}<br />           
            Puesto: {equipo.puesto}<br />            
            Número de Serie: {equipo.numero_serie}<br />
            Marca: {equipo.marca}<br />
            Modelo: {equipo.modelo}<br />
            Monitor: {equipo.monitor}
          </Card.Text>
          <Button variant="primary" >Ver Más</Button>
          <Button variant="danger" onClick={() => confirmarEliminarEquipo(equipo.id, equipo.codigo_inventario)}>Eliminar</Button>
        </Card.Body>
      </Card>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Lista de Equipos</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="botonesAgregarBuscar">
            <Link to="/agregarequipo" className="btn btn-primary mt-2 mb-2">
              Agregar Equipo
            </Link>
            <Link to="/buscarEquipo" className="btn btn-primary mt-2 mb-2">
              Buscar Equipo
            </Link>
            <Button variant="info" className="mt-2 mb-2" onClick={toggleViewStyle}>
              {/* Botón para cambiar el estilo de visualización */}
              {viewStyle === "table" ? "Ver como Tarjetas" : "Ver como Tabla"}
            </Button>
          </div>
          {/* Renderizado condicional según el estilo de visualización */}
          {viewStyle === "table" ? (
            <Table striped bordered hover variant="dark" className="custom-table">
              <thead>
                <tr>
                  <th className="text-center align-middle">Número de Empleado</th>
                  <th className="text-center align-middle">Empleado </th>
                  <th className="text-center align-middle">Dirección</th>
                  <th className="text-center align-middle">Departamento</th>
                  <th className="text-center align-middle">Puesto</th>
                  <th className="text-center align-middle">Código de Inventario</th>
                  <th className="text-center align-middle">Número de Serie</th>
                  <th className="text-center align-middle">Marca</th>
                  <th className="text-center align-middle">Modelo</th>
                  <th className="text-center align-middle">Monitor</th>
                  <th className="text-center align-middle"></th>
                </tr>
              </thead>
              <tbody>
                {renderEquipos()}
              </tbody>
            </Table>
          ) : (
            <div className="d-flex flex-wrap">
              {renderEquiposAsCards()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
          }
export default VerEquipos;