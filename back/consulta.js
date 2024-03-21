import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Asume que tienes tu URL completa de conexión como variable de entorno
  ssl: {
    rejectUnauthorized: false, // Esto permite conexiones a servidores con certificados autofirmados; úsalo solo si confías en tu servidor
  },
});

// funcion para insertar un equipo en la tabla en forma de parametros
const agregarEquipo = async ({
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
}) => {
  try {
    const consulta =
      "INSERT INTO pc_info VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *";
    const values = [
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
    ];

    const result = await pool.query(consulta, values);

    /*console.log(
      "---------------------------------------------------------------"
    );
    console.log("Equipo agregado");
    console.log("Objeto devuelto de la consulta: ", result);
    console.log("Filas procesadas: ", result.rowCount);
    console.log("Información ingresada: ", result.rows[0]);
    console.log(
      "----------------------------------------------------------------"
    );*/
  } catch (error) {
    console.error("Error al agregar el equipo: ", error);
    throw error; // Agrega esto para propagar el error
  }
};

// funcion listar el contenido de la tabla
const verEquipos = async () => {
  try {
    const query = `
    SELECT pc_info.*, empleados.numempleado, empleados.id_direccion, empleados.id_departamento, empleados.nombre, empleados.appaterno, empleados.apmaterno, empleados.puesto
    FROM pc_info
    LEFT JOIN asignaciones ON pc_info.codigo_inventario = asignaciones.codigo_inventario
    LEFT JOIN empleados ON asignaciones.numempleado = empleados.numempleado
    WHERE pc_info.status = 1
    ORDER BY pc_info.codigo_inventario ASC; 
    `;
    const { rows, command, rowCount, fields } = await pool.query(query);

    return rows;
  } catch (error) {
    console.error("Error al intentar ver equipos: ", error);
    throw error;
  }
};

const obtenerDetallesEquipoPorId = async (id) => {
  try {
    const consulta = `
        SELECT pc_info.*, empleados.*
        FROM pc_info
        LEFT JOIN asignaciones ON pc_info.codigo_inventario = asignaciones.codigo_inventario
        LEFT JOIN empleados ON asignaciones.numEmpleado = empleados.numEmpleado
        WHERE pc_info.id = $1;
    `;
    const values = [id];

    const result = await pool.query(consulta, values);

    if (result.rowCount === 0) {
      // Si no se encuentra el equipo, puedes lanzar una excepción o devolver un mensaje indicando que no se encontró
      throw new Error("No se encontró el equipo con el ID proporcionado.");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener detalles del equipo por ID:", error);
    throw error;
  }
};

// Función para actualizar un equipo en la tabla pc_info
const actualizarEquipo = async (id, newData) => {
  try {
    // Actualizar los datos del equipo en pc_info, excluyendo codigo_inventario
    const consulta = `
            UPDATE pc_info
            SET 
                tipo_equipo = $2,
                numero_serie = $3,
                marca = $4,
                modelo = $5,
                sistema_operativo = $6,
                memoria_ram = $7,
                procesador = $8,
                almacenamiento = $9,
                numero_serie_cargador = $10,
                monitor = $11,
                teclado = $12,
                raton = $13,
                accesorios = $14,
                suscripcion_office = $15,
                ubicacion = $16,
                status = $17
            WHERE id = $1
            RETURNING *`;

    const values = [
      id,
      newData.tipo_equipo,
      newData.numero_serie,
      newData.marca,
      newData.modelo,
      newData.sistema_operativo,
      newData.memoria_ram,
      newData.procesador,
      newData.almacenamiento,
      newData.numero_serie_cargador,
      newData.monitor,
      newData.teclado,
      newData.raton,
      newData.accesorios,
      newData.suscripcion_office,
      newData.ubicacion,
      newData.status,
    ];

    const result = await pool.query(consulta, values);

    // Insertar una nueva asignación solo si se proporciona numEmpleado
    if (newData.numEmpleado && newData.numEmpleado.trim() !== "") {
      const asignacionConsulta = `
            INSERT INTO asignaciones (codigo_inventario, numEmpleado)
            VALUES ($1, $2)
            RETURNING *;
        `;

      // Ejecutar la consulta de asignaciones utilizando el código_inventario actual del equipo y el numEmpleado proporcionado
      await pool.query(asignacionConsulta, [
        newData.codigo_inventario,
        newData.numEmpleado,
      ]);
    }

    return result.rows[0]; // Retornar los datos del equipo actualizado
  } catch (error) {
    console.error("Error al actualizar el equipo:", error);
    throw error;
  }
};

const obtenerDetallesEquipoEmpleado = async (
  codigo_inventario,
  numempleado
) => {
  // Definimos la consulta base para los detalles del equipo.
  let query = `
    SELECT pi.* FROM pc_info pi WHERE pi.codigo_inventario = $1
  `;
  const params = [codigo_inventario];

  // Si numempleado está presente, expandimos la consulta para incluir detalles del empleado.
  if (numempleado && numempleado !== "sinEmpleado") {
    query = `
      SELECT e.*, pi.*
      FROM asignaciones a
      JOIN empleados e ON a.numempleado = e.numempleado
      JOIN pc_info pi ON a.codigo_inventario = pi.codigo_inventario
      WHERE pi.codigo_inventario = $1 AND e.numempleado = $2
    `;
    params.push(numempleado);
  }

  try {
    const { rows } = await pool.query(query, params);
    // Asumimos que esta consulta devuelve un solo registro que corresponde a la combinación específica.
    // Si numempleado no estaba presente o era 'sinEmpleado', solo tendremos detalles del equipo.
    return rows[0] || null; // Devolvemos null si no se encontraron filas para manejar este caso en el cliente.
  } catch (error) {
    console.error(
      "Error al intentar obtener detalles del equipo y empleado: ",
      error
    );
    throw error;
  }
};

// Función para buscar equipos en función de un parámetro en todas las columnas
const buscarEquiposPorParametro = async (parametro) => {
  try {
    const consulta = `
    SELECT 
  pc_info.*,
  empleados.numempleado,
  empleados.nombre,
  empleados.appaterno,
  empleados.apmaterno
FROM 
  pc_info
INNER JOIN asignaciones ON pc_info.codigo_inventario = asignaciones.codigo_inventario
INNER JOIN empleados ON asignaciones.numempleado = empleados.numempleado
WHERE 
  pc_info.codigo_inventario ILIKE $1 OR
  pc_info.tipo_equipo ILIKE $1 OR
  pc_info.numero_serie ILIKE $1 OR
  pc_info.marca ILIKE $1 OR
  pc_info.modelo ILIKE $1 OR
  pc_info.sistema_operativo ILIKE $1 OR
  pc_info.memoria_ram ILIKE $1 OR
  pc_info.procesador ILIKE $1 OR
  pc_info.almacenamiento ILIKE $1 OR
  pc_info.numero_serie_cargador ILIKE $1 OR
  pc_info.monitor ILIKE $1 OR
  pc_info.teclado ILIKE $1 OR
  pc_info.raton ILIKE $1 OR
  pc_info.accesorios ILIKE $1 OR
  pc_info.suscripcion_office ILIKE $1 OR
  pc_info.ubicacion ILIKE $1 OR
  empleados.numempleado::text ILIKE $1 OR
  empleados.nombre ILIKE $1 OR
  empleados.appaterno ILIKE $1 OR
  empleados.apmaterno ILIKE $1;
      `;
    const values = [`%${parametro}%`];

    const result = await pool.query(consulta, values);

    return result.rows;
  } catch (error) {
    console.error("Error al buscar equipos por parámetro:", error);
    throw error;
  }
};

// FUNCION PARA ELIMINAR UN REGISTRO DE LA TABLA
const eliminarEquipo = async (id) => {
  try {
    // Eliminar directamente el equipo de pc_info sin considerar asignaciones
    const result = await pool.query(
      "DELETE FROM pc_info WHERE id = $1 RETURNING *",
      [id]
    );

    console.log("Equipo eliminado:", result.rows[0]); // Imprime los datos del equipo eliminado

    // No es necesario llamar a verEquipos aquí ya que este es el backend
  } catch (error) {
    console.error("Error al eliminar equipo:", error.message);
    throw error; // Es importante propagar el error para manejarlo en la capa superior
  }
};

const quitarAsignacion = async (codigo_inventario, numempleado) => {
  try {
    const consulta =
      "DELETE FROM asignaciones WHERE codigo_inventario = $1 AND numempleado = $2 RETURNING *";
    const values = [codigo_inventario, numempleado];
    const result = await pool.query(consulta, values);

    if (result.rowCount === 0) {
      throw new Error("Asignación no encontrada o ya fue eliminada.");
    }

    return result.rows[0]; // Retorna la asignación eliminada
  } catch (error) {
    console.error("Error al quitar la asignación: ", error);
    throw error;
  }
};

//------------------- Funciones para administrar usuarios--------------------------------

const agregarUsuario = async ({ correo, password, rol }) => {
  try {
    const consulta =
      "INSERT INTO perfilesinventario VALUES (DEFAULT, $1, $2, $3) RETURNING *";
    const values = [correo, password, rol];

    const result = await pool.query(consulta, values);
  } catch (error) {
    console.error("Error al agregar el usuario: ", error);
    throw error; // Agrega esto para propagar el error
  }
};

// funcion listar el contenido de la tabla perfilesinventario
const verUsuarios = async () => {
  try {
    const query = `
    SELECT perfilesinventario.*
    FROM perfilesinventario
    
    `;
    const { rows, command, rowCount, fields } = await pool.query(query);

    return rows;
  } catch (error) {
    console.error("Error al intentar ver los usuarios: ", error);
    throw error;
  }
};

const eliminarUsuario = async (usuarioId) => {
  try {
    const result = await pool.query(
      "DELETE FROM perfilesinventario WHERE id = $1 RETURNING *",
      [usuarioId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al eliminar el usuario: ", error);
    throw error;
  }
};

export {
  agregarEquipo,
  verEquipos,
  actualizarEquipo,
  eliminarEquipo,
  buscarEquiposPorParametro,
  obtenerDetallesEquipoEmpleado,
  obtenerDetallesEquipoPorId,
  quitarAsignacion,
  agregarUsuario,
  verUsuarios,
  eliminarUsuario,
};
