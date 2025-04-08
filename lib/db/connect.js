import mysql from "mysql2/promise"

// Configuración de la conexión a MySQL
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "control_led_sensor",
}

// Función para crear una conexión a la base de datos
export async function connectToDatabase() {
  try {
    // Crear una conexión
    const connection = await mysql.createConnection(dbConfig)

    // Verificar la conexión
    await connection.connect()

    return connection
  } catch (error) {
    console.error("Error al conectar a MySQL:", error)
    throw new Error("No se pudo conectar a la base de datos")
  }
}

// Función para ejecutar una consulta SQL
export async function executeQuery(query, params = []) {
  let connection

  try {
    connection = await connectToDatabase()
    const [results] = await connection.execute(query, params)
    return results
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error)
    throw error
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

