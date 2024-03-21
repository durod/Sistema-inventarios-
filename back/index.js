// para manejar variables de ambiente
import * as dotenv from "dotenv";
dotenv.config();
import path from "path";
import ExcelJS from "exceljs";
import express from "express";

// importando modulos personalizados
import { handleErrors } from "./errors.js";
import {
  agregarEquipo,
  verEquipos,
  actualizarEquipo,
  eliminarEquipo,
  obtenerDetallesEquipoEmpleado,
  buscarEquiposPorParametro,
  obtenerDetallesEquipoPorId,
  quitarAsignacion,
  agregarUsuario,
  verUsuarios,
  eliminarUsuario,
} from "./consulta.js";
import fs from "fs";

// importando express y cors
import express from "express";
const app = express();
import cors from "cors";
import multer from "multer";
//const currentFileUrl = import.meta.url;
//const __dirname = path.dirname(new URL(import.meta.url).pathname);

// middleware para parsear body enviado al servidor
app.use(express.json());
app.use(cors());

//// levantando servidor USANDO UN PUERTO PREDETERMINADO EN .ENV
const PORT = process.env.PORT || 3002;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../front/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.listen(PORT, () => {
  console.log("servidor listo en http://localhost:" + PORT);
});

app.post("/login", async (req, res) => {
  const { correo, password } = req.body;
  // Aquí deberías buscar al usuario por correo en tu base de datos
  const user = await buscarUsuarioPorCorreo(correo);

  if (!user) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  // Aquí deberías verificar si las contraseñas coinciden
  if (user.password === password) {
    // Contraseña correcta
    return res.json({ mensaje: "Inicio de sesión exitoso", usuario: user });
  } else {
    // Contraseña incorrecta
    return res.status(401).json({ mensaje: "Contraseña incorrecta" });
  }
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

app.get("/equipos/excel", async (req, res) => {
  try {
    const equipos = await verEquipos();
    const workbook = new ExcelJS.Workbook();

    // Agrupando equipos por ubicación o piso
    const equiposPorUbicacion = equipos.reduce((acc, equipo) => {
      const key = equipo.ubicacion; // Asume que 'ubicacion' es un identificador único
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(equipo);
      return acc;
    }, {});

    Object.entries(equiposPorUbicacion).forEach(
      ([ubicacion, equiposUbicacion], index) => {
        // Ajustando los nombres de las ubicaciones directamente
        let nombreHoja = ubicacion; // Asume que este es el valor deseado por defecto
        if (ubicacion === "pbalmacen") {
          nombreHoja = "PB - Almacén";
        } else if (ubicacion === "piso3") {
          nombreHoja = "Economista P3";
        } else if (ubicacion === "piso4") {
          nombreHoja = "Economista P4";
        } else if (ubicacion === "santander") {
          nombreHoja = "Santander rotativa";
        }

        const sheet = workbook.addWorksheet(nombreHoja);

        // ANEXO A
        sheet.mergeCells("A1:F1");
        sheet.getCell("A1").value = "ANEXO A";
        sheet.getCell("A1").font = { name: "Calibri", size: 14, bold: true };
        sheet.getCell("A1").alignment = {
          horizontal: "center",
          vertical: "middle",
        };
        sheet.getCell("A1").border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        // DOMICILIO
        sheet.mergeCells("A2:A3");
        sheet.getCell("A2").value = "DOMICILIO:";
        sheet.getCell("A2").font = { name: "Calibri", size: 12, bold: true };
        sheet.getCell("A2").alignment = {
          horizontal: "center",
          vertical: "middle",
        };
        sheet.getCell("A2").border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        sheet.mergeCells("B2:F3");
        sheet.getCell("B2").value =
          "Av. San Jerónimo 458, Col. Jardines del Pedregal, C.P. 01900, México CDMX";
        sheet.getCell("B2").font = { name: "Calibri", size: 10, bold: true };
        sheet.getCell("B2").alignment = {
          horizontal: "center",
          vertical: "middle",
        };
        sheet.getCell("B2").border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        // Cabeceras de la tabla
        const headerRow = sheet.addRow([
          "CÓDIGO",
          "PIEZAS",
          "DESCRIPCIÓN ESPECÍFICA",
          "UBICACIÓN",
          "DEPARTAMENTO",
          "FOTO",
        ]);
        headerRow.font = { name: "Calibri", size: 12, bold: true };
        headerRow.alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };
        headerRow.eachCell((cell) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
        sheet.getColumn(1).width = 10;

        sheet.getColumn(3).width = 100;
        sheet.getColumn(4).width = 15;
        sheet.getColumn(5).width = 15;
        sheet.getColumn(6).width = 30;
        // Datos de los equipos
        equiposUbicacion.forEach((equipo) => {
          const rutaFoto = `http://tuservidor.com/uploads/${equipo.codigo_inventario}.jpg`; // Ajusta esta URL
          const row = sheet.addRow([
            equipo.codigo_inventario,
            "1",
            `${equipo.tipo_equipo} ${equipo.marca} ${equipo.modelo} S/N ${
              equipo.numero_serie
            } ${
              equipo.numero_serie_cargador
                ? `Cargador: ${equipo.numero_serie_cargador}`
                : ""
            } ${equipo.teclado ? `Teclado: ${equipo.teclado}` : ""} ${
              equipo.raton ? `Raton: ${equipo.raton}` : ""
            } ${equipo.monitor ? `Monitor: ${equipo.monitor}` : ""}`, // Aquí se corrigió el error
            equipo.ubicacion,
            equipo.id_departamento,
            rutaFoto, // Ejemplo para la columna Foto
          ]);
          row.height = 50;
          row.eachCell((cell) => {
            cell.alignment = {
              horizontal: "center",
              vertical: "middle",
              wrapText: true,
            }; // Centrado horizontal y vertical
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });
        });
      }
    );

    // Configurar headers y enviar archivo
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=Equipos.xlsx");
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generando el Excel de equipos: ", error);
    res.status(500).send("Error interno del servidor");
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
    ubicacion,
    status,
  } = req.body;

  try {
    /*console.log("valor req.body en la ruta /equipos: ", req.body);*/
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
      ubicacion,
      status,
    });
    res.send("equipo agregado con éxito");
    /*console.log("valor req.body en la ruta /equipos: ", req.body);*/
  } catch (error) {
    console.error("Error en la ruta /equipos (agregarEquipo): ", error);
    const { status, message } = handleErrors(error.code);
    res.status(status).send("Error al agregar el equipo: " + message);
  }
});

app.get("/buscarEquipo", async (req, res) => {
  const parametro = req.query.parametro;
  /*console.log("Parámetro de búsqueda:", parametro);*/

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

app.get("/datoscompletos/:codigo_inventario/:numempleado", async (req, res) => {
  try {
    const { codigo_inventario, numempleado } = req.params;
    const detalles = await obtenerDetallesEquipoEmpleado(
      codigo_inventario,
      numempleado
    );
    if (detalles) {
      res.json(detalles);
    } else {
      res.status(404).send("Detalles no encontrados");
    }
  } catch (error) {
    console.error(
      "Error al obtener los detalles del equipo y empleado: ",
      error
    );
    const { status, message } = handleErrors(error.code);
    res.status(status).send("Error al obtener detalles: " + message);
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

//3. PUT para modificar el equipo
app.put("/equipos/actualizar/:id", upload.single("foto"), async (req, res) => {
  const equipoId = req.params.id;
  const equipoData = req.body;

  try {
    /* console.log("Iniciando actualización de equipo...");
    console.log("ID del equipo a actualizar:", equipoId);
    console.log("Datos del equipo a actualizar:", equipoData);*/

    // Obtener el nombre del archivo original si existe
    const originalFileName = req.file ? req.file.originalname : null;
    console.log("Nombre del archivo original:", originalFileName);

    // Si existe el archivo original, procede a renombrarlo
    if (originalFileName) {
      const codigoInventario = equipoData.codigo_inventario;
      const newFileName = `${codigoInventario}-${originalFileName}`;
      console.log("Nuevo nombre del archivo:", newFileName);

      const oldFilePath = req.file.path;
      console.log("Ruta original del archivo:", oldFilePath);

      const newFilePath = `../front/public/uploads/${codigoInventario}.jpg`;
      console.log("Ruta nueva del archivo:", newFilePath);

      try {
        fs.renameSync(oldFilePath, newFilePath);
        console.log("Archivo renombrado correctamente.");
      } catch (err) {
        console.error("Error al renombrar el archivo:", err);
        throw err;
      }
    }

    // Actualizar equipo con los datos proporcionados
    const updatedEquipo = await actualizarEquipo(equipoId, equipoData);
    console.log("Equipo actualizado con éxito:", updatedEquipo);

    res.status(200).json({
      ok: true,
      message: "Equipo actualizado con éxito",
      result: updatedEquipo,
    });
  } catch (error) {
    console.error("Error al actualizar equipo:", error.message);
    const { status, message } = handleErrors(error.code);
    res.status(status || 500).json({
      ok: false,
      result: message || "Error interno del servidor",
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

app.delete(
  "/asignaciones/:codigo_inventario/:numempleado",
  async (req, res) => {
    try {
      const { codigo_inventario, numempleado } = req.params;
      const asignacionEliminada = await quitarAsignacion(
        codigo_inventario,
        numempleado
      );
      res.json({
        mensaje: "Asignación eliminada con éxito",
        asignacionEliminada,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: "Error al eliminar la asignación",
        error: error.message,
      });
    }
  }
);

app.post("/usuario", async (req, res) => {
  const { correo, password, rol } = req.body;

  try {
    await agregarUsuario({
      correo,
      password,
      rol,
    });
    res.send("equipo agregado con éxito");
  } catch (error) {
    console.error("Error en la ruta /usuario (agregarUsuario): ", error);
    const { status, message } = handleErrors(error.code);
    res.status(status).send("Error al agregar el usuario: " + message);
  }
});

app.get("/usuario", async (req, res) => {
  try {
    const usuarios = await verUsuarios();
    res.json(usuarios); //respuesta del servidor que es la respuesta que dio la funcion de consulta a BD
  } catch (error) {
    console.error("Error en la ruta /usuario (verUsuarios): ", error);
    const { status, message } = handleErrors(error.code);
    res.status(status).send("Error al obtener los usuarios: " + message);
  }
});

app.delete("/usuario/:id", async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const usuarioEliminado = await eliminarUsuario(usuarioId);
    res.json({ mensaje: "Usuario eliminado con éxito", usuarioEliminado });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    const { status, message } = handleErrors(error.code);
    res.status(status).send("Error al eliminar el usuario: " + message);
  }
});

//0. GET para ver ruta raiz
app.use("*", (req, res) => {
  res.json({ ok: false, result: "404 Pagina no Encontrada" });
});
