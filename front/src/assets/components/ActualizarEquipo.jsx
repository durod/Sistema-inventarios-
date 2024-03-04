import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
//import Table from "react-bootstrap/Table";
const URI = "http://localhost:3002/equipos";

const ActualizarEquipo = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL
  const [fotoEquipo, setFotoEquipo] = useState(null);
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
    status: "",
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

  const handleFileChange = (event) => {
    setFotoEquipo(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      if (fotoEquipo !== null) {
        formData.append("foto", fotoEquipo);
      }

      // Agregar los datos del equipo al formData
      Object.entries(equipoData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await axios.put(`${URI}/actualizar/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("El equipo se ha actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar equipo:", error.message);
    }
  };

  return (
    <div className="containerform formagregarActualizarEquipo">
      <h2>Actualizar Equipo</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmployeeNumber">
            <Form.Label className="formLabel">
              NÚMERO DE EMPLEADO PARA ASIGNAR
            </Form.Label>
            <Form.Control
              className="text-center-input"
              type="text"
              name="numEmpleado"
              value={equipoData.numEmpleado || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridInventoryCode">
            <Form.Label className="formLabel">CÓDIGO DE INV</Form.Label>
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
              as="select"
              aria-label="Default select example"
              name="suscripcion_office"
              value={equipoData.suscripcion_office || ""}
              onChange={handleChange}
            >
              <option value="no">no</option>
              <option value="si">si</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridubicacion">
            <Form.Label className="formLabel">Ubicación</Form.Label>
            <Form.Control
              className="text-center-input"
              as="select"
              aria-label="Default select example"
              name="ubicacion" // Agrega el atributo name con el mismo nombre que el estado
              value={equipoData.ubicacion} // Asigna el valor del estado al value del select
              onChange={handleChange}
            >
              <option>Selecciona ubicación del equipo</option>
              <option value="pbalmacen">PB - Almacén</option>
              <option value="piso3">Economista P3</option>
              <option value="piso4">Economista P4</option>
              <option value="santander">Santander rotativa</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridfoto">
            <Form.Label className="formLabel">Foto del Equipo</Form.Label>
            <Form.Control
              className="text-center-input"
              type="file" // Cambia el tipo de entrada a "file"
              accept="image/*" // Esto limita la selección de archivos solo a imágenes
              onChange={handleFileChange}
            />
          </Form.Group>


          <Form.Group as={Col} controlId="formGridstatus">
            <Form.Label className="formLabel">Estado del Equipo</Form.Label>
            <Form.Control
              className="text-center-input"
              as="select"
              aria-label="Default select example"
              name="status" // Agrega el atributo name con el mismo nombre que el estado
              value={equipoData.status} // Asigna el valor del estado al value del select
              onChange={handleChange}
            >
              <option>Selecciona estado del equipo</option>
              <option value="1">Activo</option>
              <option value="0">Inactivo </option>
              
            </Form.Control>
          </Form.Group>

        </Row>

        <Row className="mb-3">
          <Col>
            <Button variant="primary" type="submit">
              Guardar Cambios
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
