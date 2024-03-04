import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import "../agregarequipo/estiloagregarequipo.css";

import { dellModels, appleModels } from "../../modelsData";
import AdminEquipos from "../adminequipos/AdminEquipos";

const URI = "http://localhost:3002/equipos";

export default function AgregarEquipo() {
  const [selectedModel, setSelectedModel] = useState({});
  const [selectedBrand, setSelectedBrand] = useState("");

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
    };

    try {
      // Enviar la solicitud solo si al menos un campo está lleno
      await axios.post(URI, equipoData);

      // Limpiar el formulario después de agregar el equipo
      event.target.reset();

      // Mostrar el mensaje de éxito
      alert("El equipo se ha agregado correctamente.");

      // Redirigir a la página de inicio después de agregar el equipo
      window.location.href = "/";
    } catch (error) {
      console.error("Error al agregar equipo:", error.message);
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
    <div className="principalcontainer">
      <div className="cajaadminequipos">
        <AdminEquipos />
      </div>
      <div className="cajasecundaria">
        <div className="cajaagregarEquipo">
          <h1> Agregar Equipo</h1>
          <Form onSubmit={handleSubmit} className="formagregarequipo">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridInventoryCode">
                <Form.Label className="formLabel">CÓDIGO DE INV</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  placeholder="Ingrese el código de inventario"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEquipmentType">
                <Form.Label className="formLabel">TIPO DE EQUIPO</Form.Label>
                <Form.Control
                  className="text-center-input"
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
                <Form.Label className="formLabel">NÚMERO DE SERIE</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  placeholder="Ingrese el número de serie"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridBrand">
                <Form.Label className="formLabel">MARCA</Form.Label>
                <Form.Control
                  className="text-center-input"
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
                <Form.Label className="formLabel">MODELO</Form.Label>
                <Form.Control
                  className="text-center-input"
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
                <Form.Label className="formLabel">SISTEMA OPERATIVO</Form.Label>
                <Form.Control
                  className="text-center-input"
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
                <Form.Label className="formLabel">MEMORIA RAM</Form.Label>
                <Form.Control
                  className="text-center-input"
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
                <Form.Label className="formLabel">PROCESADOR</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  placeholder="Procesador"
                  value={selectedModel.procesador || ""}
                  readOnly
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridStorage">
                <Form.Label className="formLabel">ALMACENAMIENTO</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  placeholder="Almacenamiento"
                  value={selectedModel.almacenamiento || ""}
                  readOnly
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridChargerSerial">
                <Form.Label className="formLabel">
                  SERIE DEL CARGADOR
                </Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  placeholder="Ingrese la serie del cargador"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridMonitor">
                <Form.Label className="formLabel">MONITOR</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  placeholder="Ingrese el monitor"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridKeyboard">
                <Form.Label className="formLabel">TECLADO</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  placeholder="Ingrese el teclado"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMouse">
                <Form.Label className="formLabel">MOUSE</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  placeholder="Ingrese el mouse"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAccessories">
                <Form.Label className="formLabel">ACCESORIOS</Form.Label>
                <Form.Control
                  className="text-center-input"
                  type="text"
                  placeholder="Ingrese los accesorios"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridOfficeSubscription">
                <Form.Label className="formLabel">
                  SUSCRIPCIÓN OFFICE
                </Form.Label>
                <Form.Control
                  className="text-center-input"
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
                <Form.Label className="formLabel">Ubicación</Form.Label>
                <Form.Control
                  className="text-center-input"
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
            </Row>

            <Row className="mb-3">
              <Col>
                <Button variant="primary" type="submit">
                  Agregar Equipo
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
      </div>
    </div>
  );
}
