import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
    allowExitOnIdle: true,
});


// funcion para insertar un equipo en la tabla en forma de parametros
const agregarEquipo = async ({ codigo_inventario, tipo_equipo, numero_serie, marca, modelo, sistema_operativo, memoria_ram, procesador, almacenamiento, numero_serie_cargador, monitor, teclado, raton, accesorios, suscripcion_office }) => {
    try {
        console.log("Entro agregarEquipo: ", codigo_inventario, tipo_equipo, numero_serie, marca, modelo, sistema_operativo, memoria_ram, procesador, almacenamiento, numero_serie_cargador, monitor, teclado, raton, accesorios, suscripcion_office);

        const consulta = "INSERT INTO pc_info VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *";
        const values = [codigo_inventario, tipo_equipo, numero_serie, marca, modelo, sistema_operativo, memoria_ram, procesador, almacenamiento, numero_serie_cargador, monitor, teclado, raton, accesorios, suscripcion_office];

        const result = await pool.query(consulta, values);

        console.log("---------------------------------------------------------------");
        console.log("Equipo agregado");
        console.log("Objeto devuelto de la consulta: ", result);
        console.log("Filas procesadas: ", result.rowCount);
        console.log("Información ingresada: ", result.rows[0]);
        console.log("----------------------------------------------------------------");
    } catch (error) {
        console.error("Error al agregar el equipo: ", error);

    }
};


// funcion listar el contenido de la tabla
const verEquipos = async () => {
    try {
        const { rows, command, rowCount, fields } = await pool.query("SELECT * FROM pc_info");
        /*
        console.log("----------------------------------------------")
        console.log("ver equipos registrados en la tabla")
        console.log("Instrucción procesada: ", command)
        console.log("Filas procesadas: ", rowCount)
        console.log("Contenido procesado: ", rows)
        console.log("Campos procesados: ", fields)
        console.log("----------------------------------------------")
*/
        return rows;  // aquí la función está retornando algo
    } catch (error) {
        console.error("Error al intentar ver equipos: ", error);

        throw error;
    }
};


// FUNCION PARA MODIFICAR UN REGISTRO DE LA TABLA
// Función para actualizar un equipo en la tabla
const actualizarEquipo = async (id, newData) => {
    try {
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
                suscripcion_office = $16
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
            newData.suscripcion_office
        ];

        // Ejecutar la consulta y obtener el resultado
        const result = await pool.query(consulta, values);

        console.log("---------------------------------------------------------------");
        console.log("Equipo actualizado");
        console.log("Objeto devuelto de la consulta: ", result);
        console.log("Filas procesadas: ", result.rowCount);
        console.log("Información actualizada: ", result.rows[0]);
        console.log("----------------------------------------------------------------");

        return result.rows[0]; // Retornar los datos del equipo actualizado
    } catch (error) {
        console.error("Error al actualizar el equipo: ", error);
        throw error;
    }
};


const obtenerDetallesEquipoPorId = async (id) => {
    try {
      const consulta = "SELECT * FROM pc_info WHERE id = $1";
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
        const consulta = "DELETE FROM pc_info WHERE id = $1 RETURNING *"; // Agrega RETURNING * para obtener los datos del equipo eliminado
        const values = [id];

        const result = await pool.query(consulta, values);

        console.log("Equipo eliminado:", result.rows[0]); // Imprime los datos del equipo eliminado

        return result.rows[0]; // Retorna los datos del equipo eliminado
    } catch (error) {
        console.error("Error al eliminar equipo:", error.message);
        throw error;
    }
};


export { agregarEquipo, verEquipos, actualizarEquipo, eliminarEquipo, buscarEquiposPorParametro, obtenerDetallesEquipoPorId } 