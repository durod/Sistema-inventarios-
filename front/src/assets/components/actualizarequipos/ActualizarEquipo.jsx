import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import axios from "axios";
import Modal from "react-bootstrap/Modal";
import AdminEquipos from "../adminequipos/AdminEquipos";
import "../actualizarequipos/estiloactualizarequipo.css";

const URI = `${import.meta.env.VITE_BACKEND_URL}/equipos`;

const ActualizarEquipo = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleCloseModal = () => {
    setShowModal(false);
    // Redirigir al usuario a la página de inicio
    window.location.href = "/";
  };

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

      Object.entries(equipoData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await axios.put(`${URI}/actualizar/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setModalMessage("El equipo se ha actualizado correctamente.");
      setShowModal(true);
    } catch (error) {
      console.error("Error al actualizar equipo:", error.message);
      setModalMessage(`Error al actualizar equipo: ${error.message}`);
      setShowModal(true);
    }
  };

  return (
    <div className="formagregaractualizarequipo">
      <div className="cajaadminequiposactualizarequipo">
        <AdminEquipos />
      </div>
      
      <Form onSubmit={handleSubmit} className="formaactualizarequipo">
        <Row className="mb-3">
        <h2>Actualizar Equipo</h2>
          <Form.Group as={Col} controlId="formGridEmployeeNumber">
            <Form.Label className="formlabelactualizarequipo">
              NÚMERO DE EMPLEADO PARA ASIGNAR
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
              type="text"
              name="numEmpleado"
              value={equipoData.numEmpleado || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridInventoryCode">
            <Form.Label className="formlabelactualizarequipo">
              CÓDIGO DE INV
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipoactualizarequipo"
              type="text"
              name="codigo_inventario"
              value={equipoData.codigo_inventario || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEquipmentType">
            <Form.Label className="formlabelactualizarequipo">
              TIPO DE EQUIPO
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
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
            <Form.Label className="formlabelactualizarequipo">
              NÚMERO DE SERIE
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
              type="text"
              name="numero_serie"
              value={equipoData.numero_serie || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBrand">
            <Form.Label className="formlabelactualizarequipo">MARCA</Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
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
            <Form.Label className="formlabelactualizarequipo">
              MODELO
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
              type="text"
              name="modelo"
              value={equipoData.modelo || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridOperatingSystem">
            <Form.Label className="formlabelactualizarequipo">
              SISTEMA OPERATIVO
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
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
            <Form.Label className="formlabelactualizarequipo">
              MEMORIA RAM
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
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
            <Form.Label className="formlabelactualizarequipo">
              PROCESADOR
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
              type="text"
              name="procesador"
              value={equipoData.procesador || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridStorage">
            <Form.Label className="formlabelactualizarequipo">
              ALMACENAMIENTO
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
              type="text"
              name="almacenamiento"
              value={equipoData.almacenamiento || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridChargerSerial">
            <Form.Label className="formlabelactualizarequipo">
              SERIE DEL CARGADOR
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
              type="text"
              name="numero_serie_cargador"
              value={equipoData.numero_serie_cargador || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Form.Group controlId="formGridMonitor">
          <Form.Label className="formlabelactualizarequipo">MONITOR</Form.Label>
          <Form.Control
            className="text-center-inputactualizarequipoactualizarequipo"
            type="text"
            name="monitor"
            value={equipoData.monitor || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridKeyboard">
          <Form.Label className="formlabelactualizarequipo">TECLADO</Form.Label>
          <Form.Control
            className="text-center-inputactualizarequipoactualizarequipo"
            type="text"
            name="teclado"
            value={equipoData.teclado || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridMouse">
          <Form.Label className="formlabelactualizarequipo">MOUSE</Form.Label>
          <Form.Control
            className="text-center-inputactualizarequipoactualizarequipo"
            type="text"
            name="raton"
            value={equipoData.raton || ""}
            onChange={handleChange}
          />
        </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAccessories">
            <Form.Label className="formlabelactualizarequipo">
              ACCESORIOS
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
              type="text"
              name="accesorios"
              value={equipoData.accesorios || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridOfficeSubscription">
            <Form.Label className="formlabelactualizarequipo">
              SUSCRIPCIÓN OFFICE
            </Form.Label>
            <Form.Select
              className="text-center-inputactualizarequipoactualizarequipo"
              name="suscripcion_office"
              value={equipoData.suscripcion_office || ""}
              onChange={handleChange}
            >
              <option value="no">no</option>
              <option value="si">si</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridubicacion">
            <Form.Label className="formlabelactualizarequipo">
              Ubicación
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
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
            <Form.Label className="formlabelactualizarequipo">
              Foto del Equipo
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
              type="file" // Cambia el tipo de entrada a "file"
              accept="image/*" // Esto limita la selección de archivos solo a imágenes
              onChange={handleFileChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridstatus">
            <Form.Label className="formlabelactualizarequipo">
              Estado del Equipo
            </Form.Label>
            <Form.Control
              className="text-center-inputactualizarequipoactualizarequipo"
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
         
        </Row>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Actualización del Equipo</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
};

export default ActualizarEquipo;
