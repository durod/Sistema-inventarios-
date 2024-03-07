import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  allowExitOnIdle: true,
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

// Función para actualizar un equipo en la tabla
const actualizarEquipo = async (id, newData) => {
  try {
    //  console.log("Iniciando actualización de equipo...");

    // Crear la consulta para actualizar los datos del equipo con el ID proporcionado
    const consulta = `
            UPDATE pc_info
            SET 
                codigo_inventario = $2,
                tipo_equipo = $3,
                numero_serie = $4,
                marca = $5,
                modelo = $6,
                sistema_operativo = $7,
                memoria_ram = $8,
                procesador = $9,
                almacenamiento = $10,
                numero_serie_cargador = $11,
                monitor = $12,
                teclado = $13,
                raton = $14,
                accesorios = $15,
                suscripcion_office = $16,
                ubicacion = $17,
                status = $18
                 
            WHERE id = $1
            RETURNING *`;

    // Organizar los valores para la actualización
    const values = [
      id,
      newData.codigo_inventario,
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

    /*console.log("Consulta de actualización:", consulta);
    console.log("Valores para la actualización:", values);*/

    // Ejecutar la consulta y obtener el resultado
    const result = await pool.query(consulta, values);

    // console.log("Equipo actualizado correctamente:", result.rows[0]);

    const asignacionConsulta = `
    INSERT INTO asignaciones (codigo_inventario, numEmpleado)
    VALUES ($1, $2)
    RETURNING *;
`;

    const asignacionValues = [
      newData.codigo_inventario, // Código de inventario del equipo
      newData.numEmpleado, // Número de empleado especificado
    ];

    await pool.query(asignacionConsulta, asignacionValues);

    /*console.log("---------------------------------------------------------------");
        console.log("Equipo actualizado");
        console.log("Objeto devuelto de la consulta: ", result);
        console.log("Filas procesadas: ", result.rowCount);
        console.log("Información actualizada: ", result.rows[0]);
        console.log("----------------------------------------------------------------");*/

    return result.rows[0]; // Retornar los datos del equipo actualizado
  } catch (error) {
    console.error("Error al actualizar el equipo: ", error);
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
        SELECT * 
        FROM pc_info
        WHERE 
          codigo_inventario ILIKE $1 OR
          tipo_equipo ILIKE $1 OR
          numero_serie ILIKE $1 OR
          marca ILIKE $1 OR
          modelo ILIKE $1 OR
          sistema_operativo ILIKE $1 OR
          memoria_ram ILIKE $1 OR
          procesador ILIKE $1 OR
          almacenamiento ILIKE $1 OR
          numero_serie_cargador ILIKE $1 OR
          monitor ILIKE $1 OR
          teclado ILIKE $1 OR
          raton ILIKE $1 OR
          accesorios ILIKE $1 OR
          suscripcion_office ILIKE $1
          ubicacion ILIKE $1
          status ILIKE $1
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
    // Obtener el código_inventario del equipo que se va a eliminar
    const equipo = await obtenerDetallesEquipoPorId(id);
    const codigoInventario = equipo.codigo_inventario;

    // Eliminar asignaciones para el código_inventario
    const asignacionConsulta =
      "DELETE FROM asignaciones WHERE codigo_inventario = $1 RETURNING *";
    const asignacionValues = [codigoInventario];
    await pool.query(asignacionConsulta, asignacionValues);

    // Ahora puedes eliminar el equipo sin violar la restricción de clave externa
    const result = await pool.query(
      "DELETE FROM pc_info WHERE id = $1 RETURNING *",
      [id]
    );

    /* console.log("Equipo eliminado:", result.rows[0]); // Imprime los datos del equipo eliminado*/

    verEquipos(); // Actualizar la lista de equipos después de la eliminación
  } catch (error) {
    console.error("Error al eliminar equipo:", error.message);
  }
};

export {
  agregarEquipo,
  verEquipos,
  actualizarEquipo,
  eliminarEquipo,
  buscarEquiposPorParametro,
  obtenerDetallesEquipoEmpleado,
};
