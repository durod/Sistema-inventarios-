// para manejar variables de ambiente
import * as dotenv from "dotenv";
dotenv.config();

// importando modulos personalizados
import { handleErrors } from "./errors.js";
import {
  agregarEquipo,
  verEquipos,
  actualizarEquipo,
  eliminarEquipo,
  obtenerDetallesEquipoPorId,
  buscarEquiposPorParametro,
} from "./consulta.js";
import fs from 'fs';

// importando express y cors
import express from "express";
const app = express();
import cors from "cors";
import multer from 'multer';


// middleware para parsear body enviado al servidor
app.use(express.json());
app.use(cors());

//// levantando servidor USANDO UN PUERTO PREDETERMINADO EN .ENV
const PORT = process.env.PORT || 3002;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Se mantiene el nombre original del archivo
  }
});

const upload = multer({ storage: storage });




app.listen(PORT, () => {
  console.log("servidor listo en http://localhost:" + PORT);
});

//rutas del enrutador/ Api Rest, enlazar ruta con funcion BD

//1. GET para ver todos los equipos registrados en la tabla
app.get("/equipos", async (req, res) => {
  try {
    const equipos = await verEquipos();
    res.json(equipos); //respuesta del servidor que es la respuesta que dio la funcion de consulta a BD
  } catch (error) {
    console.error("Error en la ruta /equipos (verEquipos): ", error);
    const { status, message } = handleErrors(error.code);
    res.status(status).send("Error al obtener los equipos: " + message);
  }
});

//2. POST para ingresar un equipo en la tabla
app.post("/equipos", async (req, res) => {
  const {
    codigo_inventario,
    tipo_equipo,
    numero_serie,
    marca,
    modelo,
    sistema_operativo,
    memoria_ram,
    procesador,
    almacenamiento,
    numero_serie_cargador,
    monitor,
    teclado,
    raton,
    accesorios,
    suscripcion_office,
    ubicacion
    
  } = req.body;

  try {
    console.log("valor req.body en la ruta /equipos: ", req.body);
    await agregarEquipo({
      codigo_inventario,
      tipo_equipo,
      numero_serie,
      marca,
      modelo,
      sistema_operativo,
      memoria_ram,
      procesador,
      almacenamiento,
      numero_serie_cargador,
      monitor,
      teclado,
      raton,
      accesorios,
      suscripcion_office,
      ubicacion
    
    });
    res.send("equipo agregado con éxito");
    console.log("valor req.body en la ruta /equipos: ", req.body);

  } catch (error) {
    console.error("Error en la ruta /equipos (agregarEquipo): ", error);
    const { status, message } = handleErrors(error.code);
    res.status(status).send("Error al agregar el equipo: " + message);
  }
});

app.get("/equipos/:id", async (req, res) => {
  const equipoId = req.params.id;

  try {
    // Usar la función 'obtenerDetallesEquipoPorId' para obtener los detalles del equipo por ID
    const equipoDetalles = await obtenerDetallesEquipoPorId(equipoId);
    res.json(equipoDetalles);
  } catch (error) {
    console.error("Error al obtener detalles del equipo:", error);
    res
      .status(500)
      .send("Error interno del servidor al obtener detalles del equipo");
  }
});

app.get("/buscarEquipo", async (req, res) => {
  const parametro = req.query.parametro;
  console.log("Parámetro de búsqueda:", parametro);

  if (!parametro) {
    return res
      .status(400)
      .json({ error: 'El parámetro de búsqueda "parametro" es necesario.' });
  }

  try {
    console.log("Antes de buscarEquiposPorParametro");
    const resultadoBusqueda = await buscarEquiposPorParametro(parametro);
    console.log("Después de buscarEquiposPorParametro");
    res.json(resultadoBusqueda);
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al realizar la búsqueda." });
  }
});



//3. PUT para modificar el equipo
app.put("/equipos/actualizar/:id", upload.single('foto'), async (req, res) => {
  const equipoId = req.params.id;
  const equipoData = req.body;

  try {
    // Obtener el código de inventario del equipo
    const codigoInventario = equipoData.codigo_inventario;

    // Obtener el nombre del archivo original
    const originalFileName = req.file.originalname;

    // Construir el nuevo nombre del archivo utilizando el código de inventario
    const newFileName = `${codigoInventario}-${originalFileName}`;

    // Ruta original del archivo
    const oldFilePath = req.file.path;

    // Ruta nueva del archivo
    const newFilePath = `uploads/${newFileName}`;

    // Renombrar el archivo
    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        console.error("Error al renombrar el archivo:", err);
        throw err; // Puedes manejar el error de acuerdo a tus necesidades
      }

      console.log("Archivo renombrado correctamente.");

      // Actualizar equipo con los datos proporcionados
      actualizarEquipo(equipoId, equipoData)
        .then((updatedEquipo) => {
          // Enviar respuesta de éxito
          res.status(200).json({
            ok: true,
            message: "Equipo actualizado con éxito",
            result: updatedEquipo,
          });
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al actualizar equipo:", error.message);
          const { status, message } = handleErrors(error.code);
          res.status(status).json({
            ok: false,
            result: message + " : " + error.column,
          });
        });
    });
  } catch (error) {
    // Manejar errores
    console.error("Error al actualizar equipo:", error.message);
    const { status, message } = handleErrors(error.code);
    res.status(status).json({
      ok: false,
      result: message + " : " + error.column,
    });
  }
});





//5. DELETE para eliminar un registro de la tabla segun ID
app.delete("/equipos/:id", async (req, res) => {
  const equipoId = req.params.id;
  try {
    const result = await eliminarEquipo(equipoId);

    return res.status(200).json({
      ok: true,
      message: "*** Equipo eliminado con éxito ***",
      result,
    });
  } catch (error) {
    console.error(
      "Error proveniente de respuesta de función eliminarEquipo: ",
      error
    );
    console.error(
      "Error Code proveniente de respuesta de función eliminarEquipo: ",
      error.code
    );

    const { status, message } = handleErrors(error.code);

    return res.status(status).json({
      ok: false,
      result: message + " : " + error.column,
    });
  }
});

//0. GET para ver ruta raiz
app.use("*", (req, res) => {
  res.json({ ok: false, result: "404 Pagina no Encontrada" });
});
