import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db/connect"

export async function GET() {
  try {
    // Obtener el último registro de accion_led
    const users = await executeQuery(
      "SELECT id, nombre FROM usuario",
    )
    if (!users) {
      return NextResponse.json({ mensaje: "No hay datos disponibles" })
    }

    // Armar el JSON de respuesta
    const response = {
      users: users.map((item) => ({
        id: item.id,
        nombre: item.nombre,
      })),
      
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error en consultarUsuarios:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}