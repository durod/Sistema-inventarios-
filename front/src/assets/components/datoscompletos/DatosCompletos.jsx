import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../datoscompletos/estilodatoscompletos.css";

function DatosCompletos() {
  const { codigo_inventario, numempleado } = useParams(); // Extrae los parámetros
  const [datos, setDatos] = useState(null); // Estado para almacenar los datos cargados
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const respuesta = await fetch(
          `http://localhost:3002/datoscompletos/${codigo_inventario}/${
            numempleado || "sinEmpleado"
          }`
        );
        const datosCargados = await respuesta.json();
        setDatos(datosCargados);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    cargarDatos();
  }, [codigo_inventario, numempleado]);

  if (!datos) {
    return <div>Cargando datos...</div>;
  }

  const handleVerResponsivaClick = () => {
    const datosModificados = {
      ...datos,
      textoProhibiciones: `Queda estrictamente prohibido instalar cualquier otro sistema o programa sin la aprobación del área de tecnología,
  así como el uso o acceso a páginas prohibidas por la política del uso de equipo, haciéndome responsable de la debida
  resguarda del mismo.
  
  Así mismo estoy de acuerdo con lo siguiente:
  1) El equipo es propiedad del Periódico El Economista, S.A. de C.V.
  2) Que lo he recibido en el estado en el que se encuentra, incluyendo sus accesorios.
  3) Será usado para los fines EXCLUSIVOS del negocio. De no ser así, el Periódico El Economista, S.A de C.V. me
  solicitará la devolución del mismo.
  4) En caso de desvinculación laboral, la devolución del equipo será inmediata.
  5) El daño o extravío de los equipos serán responsabilidad del empleado y el costo del mismo será descontado vía
  nómina.
  6) En caso de robo, de no presentar acta de denuncia se aplicará el punto anterior.`
    };
  
    navigate(`/verResponsiva/${datos.id}`, {
      state: { datos: datosModificados },
    });
  };
  return (
    <div className="containerform ">
      <h2>Datos completos</h2>
      <Form>
        <div className="botonesdatos">
          <Link
            to={`/actualizarequipo/${datos.id}`}
            className="btn btn-info mb-2"
          >
            Actualizar Datos
          </Link>

          <Button
            variant="secondary"
            onClick={() => (window.location.href = "/")}
          >
            Ir a Home
          </Button>
          <Button variant="info" onClick={handleVerResponsivaClick}>
            Ver Responsiva
          </Button>
        </div>
        <div className="cajaprincipaldatos">
          <div className="cajadatosmepleadoimagen">
            <div className="cajadatos">
              <h2 className="h2datos">Datos del empleado:</h2>
              <Row className="mb-3">
                <Form.Group controlId="formGridEmployeeName">
                  <Form.Label className="formLabel">
                    Nombre Empleado:
                  </Form.Label>
                  <Form.Control
                    className="text-center-input"
                    type="text"
                    name="nombre"
                    value={`${datos.nombre || "No Asignado"} ${datos.appaterno || ""} ${datos.apmaterno || ""}`}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmployeeNumber">
                  <Form.Label className="formLabel">DIRECCIÓN</Form.Label>
                  <Form.Control
                    className="text-center-input"
                    type="text"
                    name="numempleado"
                    value={datos.id_direccion || "No Asignado"}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmployeePuesto">
                  <Form.Label className="formLabel">DEPARTAMENTO:</Form.Label>
                  <Form.Control
                    className="text-center-input"
                    type="text"
                    name="id_direccion"
                    value={datos.id_departamento || "No Asignado"}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmployeedireccion">
                  <Form.Label className="formLabel">PUESTO:</Form.Label>
                  <Form.Control
                    className="text-center-input"
                    type="text"
                    name="numempleado"
                    value={datos.puesto || "No Asignado"}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmployeeNumber">
                  <Form.Label className="formLabel">
                    NÚMERO EMPLEADO:
                  </Form.Label>
                  <Form.Control
                    className="text-center-input"
                    type="text"
                    name="numempleado"
                    value={datos.numempleado || "No Asignado"}
                  />
                </Form.Group>
              </Row>
            </div>

            <div className="cajadatos">
              <div className="cajaprincipalimgequipo">
                <h2 className="h2datos">Imagen del equipo:</h2>
                <div className="cajaimgequipo">
                  <img
                    className="imgequipo"
                    src={`../../../public/uploads/${datos.codigo_inventario}.jpg`}
                    alt={datos.codigo_inventario}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="cajadatosequipo">
            <h2 className="h2datos">Datos del equipo:</h2>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridInventoryCode">
                <Form.Label className="formLabel">CÓDIGO DE INV</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="codigo_inventario"
                  value={datos.codigo_inventario || ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEquipmentType">
                <Form.Label className="formLabel">TIPO DE EQUIPO</Form.Label>
                <Form.Control
                  className="text-center-input"
                  as="select"
                  name="tipo_equipo"
                  value={datos.tipo_equipo || ""}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSerialNumber">
                <Form.Label className="formLabel">NÚMERO DE SERIE</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="numero_serie"
                  value={datos.numero_serie || ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridBrand">
                <Form.Label className="formLabel">MARCA</Form.Label>
                <Form.Control
                  className="text-center-input"
                  as="select"
                  name="marca"
                  value={datos.marca || ""}
                ></Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridModel">
                <Form.Label className="formLabel">MODELO</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="modelo"
                  value={datos.modelo || ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridOperatingSystem">
                <Form.Label className="formLabel">SISTEMA OPERATIVO</Form.Label>
                <Form.Control
                  className="text-center-input"
                  as="select"
                  name="sistema_operativo"
                  value={datos.sistema_operativo || ""}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRAM">
                <Form.Label className="formLabel">MEMORIA RAM</Form.Label>
                <Form.Control
                  className="text-center-input"
                  as="select"
                  name="memoria_ram"
                  value={datos.memoria_ram || ""}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridProcessor">
                <Form.Label className="formLabel">PROCESADOR</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="procesador"
                  value={datos.procesador || ""}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridStorage">
                <Form.Label className="formLabel">ALMACENAMIENTO</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="almacenamiento"
                  value={datos.almacenamiento || ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridChargerSerial">
                <Form.Label className="formLabel">
                  SERIE DEL CARGADOR
                </Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="numero_serie_cargador"
                  value={datos.numero_serie_cargador || ""}
                />
              </Form.Group>
            </Row>
            <Form.Group controlId="formGridMonitor">
              <Form.Label className="formLabel">MONITOR</Form.Label>
              <Form.Control
                className="text-center-input"
                type="text"
                name="monitor"
                value={datos.monitor || ""}
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridKeyboard">
                <Form.Label className="formLabel">TECLADO</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="teclado"
                  value={datos.teclado || ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMouse">
                <Form.Label className="formLabel">MOUSE</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="raton"
                  value={datos.mouse || ""}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAccessories">
                <Form.Label className="formLabel">ACCESORIOS</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="accesorios"
                  value={datos.accesorios || ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridOfficeSubscription">
                <Form.Label className="formLabel">
                  SUSCRIPCIÓN OFFICE
                </Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="suscripcion_office"
                  value={datos.suscripcion_office || ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridubicacion">
                <Form.Label className="formLabel">Ubicación</Form.Label>
                <Form.Control
                  className="text-center-input"
                  as="select"
                  aria-label="Default select example"
                  name="ubicacion"
                  value={datos.ubicacion || ""}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridstatus">
                <Form.Label className="formLabel">Estado del equipo</Form.Label>
                <Form.Control
                  className="text-center-input"
                  as="select"
                  aria-label="Default select example"
                  name="status"
                  value={datos.status || ""}
                ></Form.Control>
              </Form.Group>
            </Row>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default DatosCompletos;
