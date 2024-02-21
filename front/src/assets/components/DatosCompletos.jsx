import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
//import Table from "react-bootstrap/Table";
import "../components/styles/estilodatoscompletos.css";
const URI = "http://localhost:3002/equipos";

function DatosCompletos() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el parámetro de la URL
  const [equipoData, setEquipoData] = useState({
    codigo_inventario: "",
    tipo_equipo: "",
    numero_serie: "",
    marca: "",
    modelo: "",
    sistema_operativo: "",
    memoria_ram: "",
    procesador: "",
    almacenamiento: "",
    numero_serie_cargador: "",
    monitor: "",
    teclado: "",
    raton: "",
    accesorios: "",
    suscripcion_office: "",
    ubicacion: "",
    numempleado: "",
    nombre: "",
    appaterno: "",
    apmaterno: "",
    id_direccion: "",
    id_departamento: "",
    puesto: "",
  });

  console.log("Equipo Data en DatosCompletos:", equipoData);

  useEffect(() => {
    const cargarDatosEquipo = async () => {
      try {
        const response = await axios.get(`${URI}/${id}`);
        setEquipoData(response.data);
        console.log("equipoData:", response.data);
      } catch (error) {
        console.error("Error al cargar datos del equipo:", error.message);
      }
    };

    cargarDatosEquipo();
  }, [id]);

  const handleVerResponsivaClick = () => {
    // Cambia history.push a navigate
    navigate(`/verResponsiva/${equipoData.id}`, {
      state: { equipoData: equipoData },
    });
  };
  return (
    <div className="containerform ">
      <h2>Datos completos</h2>
      <Form>
      <div className="botonesdatos">
         
            
              <Link
                to={`/actualizarequipo/${equipoData.id}`}
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
          <div className="cajadatos">
            <h2 className="h2datos">Datos del empleado:</h2>
            <Row className="mb-3">
              <Form.Group controlId="formGridEmployeeName">
                <Form.Label className="formLabel">Nombre Empleado:</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="nombre"
                  value={`${equipoData.nombre || ""} ${
                    equipoData.appaterno || ""
                  } ${equipoData.apmaterno || ""}`}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmployeeNumber">
                <Form.Label className="formLabel">DIRECCIÓN</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="numEmpleado"
                  value={equipoData.id_direccion || ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmployeePuesto">
                <Form.Label className="formLabel">DEPARTAMENTO:</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="id_direccion"
                  value={`${equipoData.id_departamento || ""} `}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmployeedireccion">
                <Form.Label className="formLabel">PUESTO:</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="numEmpleado"
                  value={equipoData.puesto || ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmployeeNumber">
                <Form.Label className="formLabel">NÚMERO EMPLEADO:</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="numEmpleado"
                  value={equipoData.numempleado || ""}
                />
              </Form.Group>
            </Row>
          </div>

          <div className="cajadatos">
            <h2 className="h2datos">Datos del equipo:</h2>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridInventoryCode">
                <Form.Label className="formLabel">CÓDIGO DE INV</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="codigo_inventario"
                  value={equipoData.codigo_inventario || ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEquipmentType">
                <Form.Label className="formLabel">TIPO DE EQUIPO</Form.Label>
                <Form.Control
                  className="text-center-input"
                  as="select"
                  name="tipo_equipo"
                  value={equipoData.tipo_equipo || ""}
                >
                  <option>{equipoData.tipo_equipo || ""}</option>
                  
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSerialNumber">
                <Form.Label className="formLabel">NÚMERO DE SERIE</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="numero_serie"
                  value={equipoData.numero_serie || ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridBrand">
                <Form.Label className="formLabel">MARCA</Form.Label>
                <Form.Control
                  className="text-center-input"
                  as="select"
                  name="marca"
                  value={equipoData.marca || ""}
                >
                  <option>{equipoData.marca || ""}</option>
                 
                </Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridModel">
                <Form.Label className="formLabel">MODELO</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="modelo"
                  value={equipoData.modelo || ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridOperatingSystem">
                <Form.Label className="formLabel">SISTEMA OPERATIVO</Form.Label>
                <Form.Control
                  className="text-center-input"
                  as="select"
                  name="sistema_operativo"
                  value={equipoData.sistema_operativo || ""}
                >
                  <option>{equipoData.sistema_operativo || ""}</option>
                 
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRAM">
                <Form.Label className="formLabel">MEMORIA RAM</Form.Label>
                <Form.Control
                  className="text-center-input"
                  as="select"
                  name="memoria_ram"
                  value={equipoData.memoria_ram || ""}
                >
                  <option>{equipoData.memoria_ram || ""}</option>
                 
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridProcessor">
                <Form.Label className="formLabel">PROCESADOR</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  name="procesador"
                  value={equipoData.procesador || ""}
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
                  value={equipoData.almacenamiento || ""}
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
                  value={equipoData.numero_serie_cargador || ""}
                />
              </Form.Group>
            </Row>
            <Form.Group controlId="formGridMonitor">
              <Form.Label className="formLabel">MONITOR</Form.Label>
              <Form.Control
                className="text-center-input"
                type="text"
                name="monitor"
                value={equipoData.monitor || ""}
              />
            </Form.Group>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridKeyboard">
              <Form.Label className="formLabel">TECLADO</Form.Label>
              <Form.Control
                className="text-center-input"
                type="text"
                name="teclado"
                value={equipoData.teclado || ""}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridMouse">
              <Form.Label className="formLabel">MOUSE</Form.Label>
              <Form.Control
                className="text-center-input"
                type="text"
                name="raton"
                value={equipoData.raton || ""}
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
                  value={equipoData.accesorios || ""}
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
                  value={equipoData.suscripcion_office || ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridubicacion">
            <Form.Label className="formLabel">Ubicación</Form.Label>
            <Form.Control
              className="text-center-input"
              as="select"
              aria-label="Default select example"
              name="ubicacion" // Agrega el atributo name con el mismo nombre que el estado
              value={equipoData.ubicacion} // Asigna el valor del estado al value del select
              
            >
              <option>{equipoData.ubicacion}</option>
              
            </Form.Control>
          </Form.Group>
            </Row>
          </div>
        </div>
        
      </Form>
    </div>
  );
}

export default DatosCompletos;
