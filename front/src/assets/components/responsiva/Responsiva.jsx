import { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "../responsiva/responsivastyles.css";

function Responsiva() {
  const location = useLocation();
  const equipoData = location.state ? location.state.equipoData : null;

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
    <div ref={responsivaRef} className="cajaprincipal">
      <h4>Carta Responsiva de Equipo de cómputo y comunicaciones</h4>

      <div>
        <htmlForm>
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
                value={equipoData.numempleado}
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
                value={equipoData.id_direccion}
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
                value={equipoData.id_departamento}
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
                value={`${equipoData.nombre || ""} ${
                  equipoData.appaterno || ""
                } ${equipoData.apmaterno || ""}`}
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
                value={equipoData.puesto || ""}
                required
              />
            </div>
          </fieldset>

          <fieldset>
          <h5 style={{ marginTop: '21px' }}>Datos del Equipo Asignado</h5>
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
                    value={equipoData.codigo_inventario || ""}
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
                    value={equipoData.numero_serie || ""}
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
                    value={equipoData.tipo_equipo || ""}
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
                    value={equipoData.marca || ""}
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
                    value={equipoData.modelo || ""}
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
                    value={equipoData.procesador || ""}
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
                    value={equipoData.memoria_ram || ""}
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
                  value={equipoData.sistema_operativo || ""}
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
                  value={equipoData.suscripcion_office || ""}
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
                  value={equipoData.numero_serie_cargador || ""}
                />
              </div>
              <input
                type="text"
                id="monitor"
                name="monitor"
                value={equipoData.monitor || ""}
              />
              <input
                type="text"
                id="teclado"
                name="teclado"
                value={equipoData.teclado || ""}
              />
              <input
                type="text"
                id="raton"
                name="raton"
                value={equipoData.raton || ""}
              />
              <input
                type="text"
                id="accesorios"
                name="accesorios"
                value={equipoData.accesorios || ""}
              />
            </div>
          </fieldset>

<fieldset>
  <div className="cajaimportante">
          <label htmlFor="prohibiciones">IMPORTANTE</label>

          <textarea
            id="prohibiciones"
            name="prohibiciones"
            className="textoimportante"
            required
            readOnly
          >
            {`Queda estrictamente prohibido instalar cualquier otro sistema o programa sin la aprobación del área de tecnología,
así como el uso o acceso a páginas prohibidas por la política del uso de equipo, haciéndome responsable de la debida
resguarda del mismo.

Así mismo estoy de acuerdo con lo siguiente:
1) El equipo es propiedad del Periódico El Economista, S.A. de C.V.
2) Que lo he recibido en el estado en el que se encuentra, incluyendo sus accesorios.
3) Será usado para los fines EXCLUSIVOS del negocio. De no ser así, el Periódico El Economista, S.A de C.V. me
solicitará la devolución del mismo.
4) En caso de desvinculación laboral, la devolución del equipo será inmediata.
5) EL daño o extravío de los equipos serán responsabilidad del empleado y el costo del mismo será descontado vía
nómina.
6) En caso de robo, de no presentar acta de denuncia se aplicará el punto anterior.`}
          </textarea>
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
        </htmlForm>
      </div>
    </div>
  );
}

export default Responsiva;
