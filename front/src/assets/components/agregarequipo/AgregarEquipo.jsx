import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal"; // Importa Modal

import { dellModels, appleModels } from "../../modelsData";
import AdminEquipos from "../adminequipos/AdminEquipos.jsx";

import "../agregarequipo/estiloagregarequipo.css";

import axios from "axios";
const URI = `${import.meta.env.VITE_BACKEND_URL}/equipos`;

export default function AgregarEquipo() {
  const [selectedModel, setSelectedModel] = useState({});
  const [selectedBrand, setSelectedBrand] = useState("");
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [modalMessage, setModalMessage] = useState(""); // Estado para el mensaje del modal

  const handleCloseModal = () => {
    setShowModal(false);
    // Si el mensaje es de éxito, redirigir al usuario
    if (modalMessage === "El equipo se ha agregado correctamente.") {
      window.location.href = "https://durod.github.io/Sistema-inventarios-/verequipos";
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const codigoInventario = event.target.elements.formGridInventoryCode.value;
    const tipoEquipo = event.target.elements.formGridEquipmentType.value;
    const numeroSerie = event.target.elements.formGridSerialNumber.value;
    const marca = event.target.elements.formGridBrand.value;
    const modelo = event.target.elements.formGridModel.value;
    const sistemaOperativo =
      event.target.elements.formGridOperatingSystem.value;
    const memoriaRAM = event.target.elements.formGridRAM.value;
    const procesador = event.target.elements.formGridProcessor.value;
    const almacenamiento = event.target.elements.formGridStorage.value;
    const numeroSerieCargador =
      event.target.elements.formGridChargerSerial.value;
    const monitor = event.target.elements.formGridMonitor.value;
    const teclado = event.target.elements.formGridKeyboard.value;
    const raton = event.target.elements.formGridMouse.value;
    const accesorios = event.target.elements.formGridAccessories.value;
    const suscripcionOffice =
      event.target.elements.formGridOfficeSubscription.value;
    const ubicacion = event.target.elements.formGridubicacion.value;
    const status = event.target.elements.formGridstatus.value;

    // Verificar que al menos un campo esté lleno
    if (!(codigoInventario && tipoEquipo && numeroSerie)) {
      alert("Debes llenar al menos un campo para guardar el equipo.");
      return;
    }

    // Crear un objeto con los datos del equipo
    const equipoData = {
      codigo_inventario: codigoInventario,
      tipo_equipo: tipoEquipo,
      numero_serie: numeroSerie,
      marca: marca,
      modelo: modelo,
      sistema_operativo: sistemaOperativo,
      memoria_ram: memoriaRAM,
      procesador: procesador,
      almacenamiento: almacenamiento,
      numero_serie_cargador: numeroSerieCargador,
      monitor: monitor,
      teclado: teclado,
      raton: raton,
      accesorios: accesorios,
      suscripcion_office: suscripcionOffice,
      ubicacion,
      status,
    };

    try {
      // Enviar la solicitud solo si al menos un campo está lleno
      await axios.post(URI, equipoData);

      // Limpiar el formulario después de agregar el equipo
      event.target.reset();

      // Mostrar el mensaje de éxito
      setModalMessage("El equipo se ha agregado correctamente.");
      setShowModal(true);
      // Redirigir a la página de inicio después de agregar el equipo
    } catch (error) {
      setModalMessage(`Error al agregar equipo: ${error.message}`);
      setShowModal(true);
    }
  };

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    setSelectedModel({}); // Restablece el modelo al cambiar la marca
  };

  const handleModelChange = (event) => {
    const selectedModelName = event.target.value;
    const models = selectedBrand === "Dell" ? dellModels : appleModels;
    const modelInfo = models.find(
      (model) => model.nombre === selectedModelName
    );

    if (modelInfo) {
      setSelectedModel(modelInfo);
    } else {
      setSelectedModel({});
    }
  };
  return (
    <div className="containeragregarequipo">
      <div className="cajaadminequiposagregarequipo">
        <AdminEquipos />
      </div>
      <div className="cajasecundariaagregarequipo">
        <div className="cajaagregarEquipo">
          <h1> Agregar Equipo</h1>
          <Form onSubmit={handleSubmit} className="formagregarequipo">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridInventoryCode">
                <Form.Label className="formLabelagregarequipo">
                  CÓDIGO DE INV
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  type="text"
                  placeholder="Ingrese el código de inventario"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEquipmentType">
                <Form.Label className="formLabelagregarequipo">
                  TIPO DE EQUIPO
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  as="select"
                  aria-label="Default select example"
                >
                  <option>Selecciona el tipo de equipo</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Laptop">Laptop</option>
                  <option value="AllInOne">All in One</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSerialNumber">
                <Form.Label className="formLabelagregarequipo">
                  NÚMERO DE SERIE
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  type="text"
                  placeholder="Ingrese el número de serie"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridBrand">
                <Form.Label className="formLabelagregarequipo">
                  MARCA
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  as="select"
                  aria-label="Default select example"
                  onChange={handleBrandChange}
                >
                  <option>Selecciona la marca</option>
                  <option value="Dell">Dell</option>
                  <option value="Apple">Apple</option>
                </Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridModel">
                <Form.Label className="formLabelagregarequipo">
                  MODELO
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  as="select"
                  aria-label="Default select example"
                  onChange={handleModelChange}
                >
                  <option>Selecciona el modelo</option>
                  {(selectedBrand === "Dell" ? dellModels : appleModels).map(
                    (model, index) => (
                      <option key={index} value={model.nombre}>
                        {model.nombre}
                      </option>
                    )
                  )}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridOperatingSystem">
                <Form.Label className="formLabelagregarequipo">
                  SISTEMA OPERATIVO
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  as="select"
                  aria-label="Default select example"
                >
                  <option>Selecciona el sistema operativo</option>
                  <option value="Windows 11">Windows 11</option>
                  <option value="Windows 10">Windows 10</option>
                  <option value="Windows 8.1">Windows 8.1</option>
                  <option value="MacOS Catalina">MacOS Catalina</option>
                  <option value="MacOS Ventura">MacOS Ventura</option>
                  <option value="MacOS Mojave">MacOS Mojave</option>
                  <option value="Linux Ubuntu">Linux Ubuntu</option>
                  <option value="Linux Mint">Linux Mint</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRAM">
                <Form.Label className="formLabelagregarequipo">
                  MEMORIA RAM
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  as="select"
                  aria-label="Default select example"
                >
                  <option>Selecciona la cantidad de memoria RAM</option>
                  <option value="4GB">4 GB</option>
                  <option value="8GB">8 GB</option>
                  <option value="16GB">16 GB</option>
                  <option value="32GB">32 GB</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridProcessor">
                <Form.Label className="formLabelagregarequipo">
                  PROCESADOR
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  type="text"
                  placeholder="Procesador"
                  value={selectedModel.procesador || ""}
                  readOnly
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridStorage">
                <Form.Label className="formLabelagregarequipo">
                  ALMACENAMIENTO
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  type="text"
                  placeholder="Almacenamiento"
                  value={selectedModel.almacenamiento || ""}
                  readOnly
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridChargerSerial">
                <Form.Label className="formLabelagregarequipo">
                  SERIE DEL CARGADOR
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  type="text"
                  placeholder="Ingrese la serie del cargador"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridMonitor">
                <Form.Label className="formLabelagregarequipo">
                  MONITOR
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  type="text"
                  placeholder="Ingrese el monitor"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridKeyboard">
                <Form.Label className="formLabelagregarequipo">
                  TECLADO
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  type="text"
                  placeholder="Ingrese el teclado"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMouse">
                <Form.Label className="formLabelagregarequipo">
                  MOUSE
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  type="text"
                  placeholder="Ingrese el mouse"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAccessories">
                <Form.Label className="formLabelagregarequipo">
                  ACCESORIOS
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  type="text"
                  placeholder="Ingrese los accesorios"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridOfficeSubscription">
                <Form.Label className="formLabelagregarequipo">
                  SUSCRIPCIÓN OFFICE
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  as="select"
                  aria-label="Default select example"
                >
                  <option value="no">no</option>
                  <option value="si">si</option>
                </Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridubicacion">
                <Form.Label className="formLabelagregarequipo">
                  Ubicación
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  as="select"
                  aria-label="Default select example"
                >
                  <option>Selecciona el tipo de equipo</option>
                  <option value="pbalmacen">PB - Almacén</option>
                  <option value="piso3">Economista P3</option>
                  <option value="piso4">Economista P4</option>
                  <option value="santander">Santander rotativa</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridstatus">
                <Form.Label className="formLabelagregarequipo">
                  Estado del Equipo
                </Form.Label>
                <Form.Control
                  className="text-center-inputagregarequipo"
                  as="select"
                  aria-label="Default select example"
                >
                  <option value="1">Activo</option>
                </Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Col className="cajabotonagregarequipo">
                <Button variant="primary" type="submit">
                  Agregar Equipo
                </Button>
              </Col>
            </Row>
          </Form>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Notificación</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
