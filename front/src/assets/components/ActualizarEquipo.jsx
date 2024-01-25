import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
const URI = "http://localhost:3002/equipos";

const ActualizarEquipo = () => {
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
  });

  useEffect(() => {
    const cargarDatosEquipo = async () => {
      try {
        const response = await axios.get(`${URI}/${id}`);
        setEquipoData(response.data);
      } catch (error) {
        console.error("Error al cargar datos del equipo:", error.message);
      }
    };

    cargarDatosEquipo();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEquipoData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`${URI}/actualizar/${id}`, equipoData); // Cambiado el llamado a la función
      alert("El equipo se ha actualizado correctamente.");
      // Puedes redirigir a la página de VerEquipos o a otra página según tus necesidades
    } catch (error) {
      console.error("Error al actualizar equipo:", error.message);
    }
  };

  return (
    <div className="containerform formagregarActualizarEquipo">
      <h2>Actualizar Equipo</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridInventoryCode">
            <Form.Label className="formLabel">CÓDIGO DE INVENTARIO</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="codigo_inventario"
              value={equipoData.codigo_inventario || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEquipmentType">
            <Form.Label className="formLabel">TIPO DE EQUIPO</Form.Label>
            <Form.Control
              className="text-center-input"
              as="select"
              name="tipo_equipo"
              value={equipoData.tipo_equipo || ""}
              onChange={handleChange}
            >
              <option>Selecciona el tipo de equipo</option>
              <option value="Desktop">Desktop</option>
              <option value="Laptop">Laptop</option>
              <option value="AllInOne">All in One</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSerialNumber">
            <Form.Label className="formLabel">NÚMERO DE SERIE</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="numero_serie"
              value={equipoData.numero_serie || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBrand">
            <Form.Label className="formLabel">MARCA</Form.Label>
            <Form.Control
              className="text-center-input"
              as="select"
              name="marca"
              value={equipoData.marca || ""}
              onChange={handleChange}
            >
              <option>Selecciona la marca</option>
              <option value="">Selecciona la marca</option>
              <option value="Dell">Dell</option>
              <option value="HP">HP</option>
              <option value="Apple">Apple</option>
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
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridOperatingSystem">
            <Form.Label className="formLabel">SISTEMA OPERATIVO</Form.Label>
            <Form.Control
              className="text-center-input"
              as="select"
              name="sistema_operativo"
              value={equipoData.sistema_operativo || ""}
              onChange={handleChange}
            >
              <option>Selecciona el sistema operativo</option>
              <option value="Windows 11">Windows 11</option>
              <option value="Windows 10">Windows 10</option>
              {/* Agrega más opciones según sea necesario */}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridRAM">
            <Form.Label className="formLabel">MEMORIA RAM</Form.Label>
            <Form.Control
              className="text-center-input"
              as="select"
              name="memoria_ram"
              value={equipoData.memoria_ram || ""}
              onChange={handleChange}
            >
              <option>Selecciona la cantidad de memoria RAM</option>
              <option value="4GB">4 GB</option>
              <option value="8GB">8 GB</option>
              <option value="16GB">16 GB</option>
              <option value="32GB">32 GB</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridProcessor">
            <Form.Label className="formLabel">PROCESADOR</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="procesador"
              value={equipoData.procesador || ""}
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridChargerSerial">
            <Form.Label className="formLabel">SERIE DEL CARGADOR</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="numero_serie_cargador"
              value={equipoData.numero_serie_cargador || ""}
              onChange={handleChange}
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
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formGridKeyboard">
          <Form.Label className="formLabel">TECLADO</Form.Label>
          <Form.Control
            className="text-center-input"
            type="text"
            name="teclado"
            value={equipoData.teclado || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formGridMouse">
          <Form.Label className="formLabel">MOUSE</Form.Label>
          <Form.Control
            className="text-center-input"
            type="text"
            name="raton"
            value={equipoData.raton || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAccessories">
            <Form.Label className="formLabel">ACCESORIOS</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="accesorios"
              value={equipoData.accesorios || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridOfficeSubscription">
            <Form.Label className="formLabel">SUSCRIPCIÓN OFFICE</Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="suscripcion_office"
              value={equipoData.suscripcion_office || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button variant="primary" type="submit">
              Actualizar
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              onClick={() => (window.location.href = "/")}
            >
              Ir a Home
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ActualizarEquipo;
