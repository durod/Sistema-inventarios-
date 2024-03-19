import { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "../responsiva/responsivastyles.css";

function Responsiva() {
  const location = useLocation();
  const datos = location.state ? location.state.datos : null;

  const generatePDF = () => {
    const pdfOptions = {
      margin: 5, // Reduce los márgenes
      filename: "responsiva.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
    };

    const originalFontSize = window.getComputedStyle(document.body).fontSize;

    // Reduzco el tamaño de fuente para intentar que todo quepa en una página
    document.body.style.fontSize = "10px";
    window.alert("Recuerda imprimir solo la primera pag.");

    html2pdf(responsivaRef.current, pdfOptions);

    // Restauro el tamaño de fuente original después de generar el PDF
    document.body.style.fontSize = originalFontSize;
  };
  const responsivaRef = useRef();
  return (
    <div ref={responsivaRef} className="cajaprincipalresponsiva">
      <h4>Carta Responsiva de Equipo de cómputo y comunicaciones</h4>

      <div>
        <form>
          <div className="datosempleadoid">
            <label htmlFor="fecha" className="fondo">
              Fecha
            </label>
            <input type="date" id="fecha" name="fecha" required />
          </div>

          <fieldset>
            <h5>Datos del Empleado</h5>
            <hr />
            <div className="datosempleadoid">
              <label htmlFor="numEmpleado" className="fondo" id="numEmpleado">
                No. de empleado:
              </label>
              <input
                type="text"
                id="numEmpleado"
                name="numEmpleado"
                value={datos.numempleado}
                required
              />
            </div>
            <div className="datosempleado">
              <label htmlFor="direccion" className="fondo anchofijo">
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={datos.id_direccion}
                required
              />
            </div>
            <div className="datosempleado">
              <label htmlFor="depto" className="fondo ">
                Depto.
              </label>
              <input
                type="text"
                id="depto"
                name="depto"
                value={datos.id_departamento}
                required
              />
            </div>
            <div className="datosempleado">
              <label htmlFor="nombre" className="fondo">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={`${datos.nombre || ""} ${datos.appaterno || ""} ${
                  datos.apmaterno || ""
                }`}
                required
              />
            </div>
            <div className="datosempleado">
              <label htmlFor="puesto" className="fondo">
                Puesto
              </label>
              <input
                type="text"
                id="puesto"
                name="puesto"
                value={datos.puesto || ""}
                required
              />
            </div>
          </fieldset>

          <fieldset>
            <h5 style={{ marginTop: "21px" }}>Datos del Equipo Asignado</h5>
            <hr />

            <div>
              <div className="noinventarioserie">
                <div className="invserproram">
                  <label htmlFor="noInventario" className="fondo" id="labelid">
                    No. Inventario
                  </label>
                  <input
                    type="text"
                    id="noInventario"
                    name="noInventario"
                    value={datos.codigo_inventario || ""}
                    required
                  />
                </div>
                <div className="invserproram">
                  <label htmlFor="numSerie" className="fondo">
                    Num. Serie
                  </label>
                  <input
                    type="text"
                    id="numSerie"
                    name="numSerie"
                    value={datos.numero_serie || ""}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="datosequipo">
                  <label htmlFor="tipoEquipo" className="fondo">
                    Tipo de Equipo
                  </label>
                  <input
                    type="text"
                    id="tipoEquipo"
                    name="tipoEquipo"
                    value={datos.tipo_equipo || ""}
                    required
                  />
                </div>
                <div className="datosequipo">
                  <label htmlFor="marca" className="fondo">
                    Marca
                  </label>
                  <input
                    type="text"
                    id="marca"
                    name="marca"
                    value={datos.marca || ""}
                    required
                  />
                </div>
                <div className="datosequipo">
                  <label htmlFor="modelo" className="fondo">
                    Modelo
                  </label>
                  <input
                    type="text"
                    id="modelo"
                    name="modelo"
                    value={datos.modelo || ""}
                    required
                  />
                </div>
              </div>

              <div className="noinventarioserie">
                <div className="datoprocesador">
                  <label htmlFor="procesador" className="fondo">
                    Procesador
                  </label>
                  <input
                    type="text"
                    id="procesador"
                    name="procesador"
                    value={datos.procesador || ""}
                    required
                  />
                </div>
                <div className="datoram">
                  <label htmlFor="ram" className="fondo">
                    Memoria en RAM
                  </label>
                  <input
                    type="text"
                    id="ram"
                    name="ram"
                    value={datos.memoria_ram || ""}
                    required
                  />
                </div>
              </div>

              <div className="datosequipo">
                <label htmlFor="sistemaOperativo" className="fondo">
                  Sistema Operativo
                </label>
                <input
                  type="text"
                  id="sistemaOperativo"
                  name="sistemaOperativo"
                  required
                  value={datos.sistema_operativo || ""}
                />
              </div>
              <div className="datosequipo">
                <label htmlFor="versionOffice" className="fondo">
                  Versión de Office
                </label>
                <input
                  type="text"
                  id="versionOffice"
                  name="versionOffice"
                  value={datos.suscripcion_office || ""}
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <div className="cajaobservaciones">
              <div className="cajasecundariaobservaciones">
                <label htmlFor="observaciones" className="fondo">
                  Observaciones
                </label>
                <input
                  type="text"
                  id="cargador"
                  name="cargador"
                  value={datos.numero_serie_cargador || ""}
                />
              </div>
              <input
                type="text"
                id="monitor"
                name="monitor"
                value={datos.monitor || ""}
              />
              <input
                type="text"
                id="teclado"
                name="teclado"
                value={datos.teclado || ""}
              />
              <input
                type="text"
                id="raton"
                name="raton"
                value={datos.raton || ""}
              />
              <input
                type="text"
                id="accesorios"
                name="accesorios"
                value={datos.accesorios || ""}
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="cajaimportante">
              <label htmlFor="prohibiciones">IMPORTANTE</label>
              <div
                id="prohibiciones"
                className="textoimportante"
                // Agrega estilo para imitar un textarea y preservar los saltos de línea
                style={{
                  whiteSpace: "pre-wrap", // Mantiene los saltos de línea y espacios
                  border: "1px solid #ccc", // Borde para imitar textarea, ajusta según necesidad
                  padding: "10px", // Padding para imitar textarea, ajusta según necesidad
                  borderRadius: "4px", // Bordes redondeados para imitar textarea, ajusta según necesidad
                  minHeight: "100px", // Altura mínima, ajusta según necesidad
                  overflowY: "auto", // Permite scroll vertical si el contenido excede la altura
                }}
                // Usa `dangerouslySetInnerHTML` solo si estás seguro de que el contenido es seguro y no expone a XSS
                // Si el contenido puede contener entradas de usuario, considera métodos de saneamiento adecuados
                dangerouslySetInnerHTML={{
                  __html: location.state
                    ? location.state.datos.textoProhibiciones.replace(
                        /\n/g,
                        "<br>"
                      )
                    : "",
                }}
              >
                {/* Se elimina el contenido del div ya que se establece con dangerouslySetInnerHTML */}
              </div>
            </div>
          </fieldset>
          <div className="signature">
            <div className="signaturedatos">
              <input type="text" name="firma" required />
              <label htmlFor="firma">Nombre y firma:</label>
            </div>
            <div className="signaturedatos">
              <input type="text" name="firma" required />
              <div>
                Noemi Hernández
                <br />
                Coordinadora de RH
              </div>
            </div>
            <div className="signaturedatos">
              <input type="text" name="coordinador" required />
              <div>
                Juan Manuel Leónides
                <br />
                Gte. Sistemas TI
              </div>
            </div>
            <div className="signaturedatos">
              <input type="text" name="sistemasTI" required />
              <div>
                Gerardo Ramirez Á.
                <br />
                Director Tecnología
              </div>
            </div>
          </div>

          <br />
          <br />
          <br />
          <button type="button" onClick={generatePDF}>
            Generar Responsiva
          </button>
        </form>
      </div>
    </div>
  );
}

export default Responsiva;
