import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db/connect"

export async function GET(request) {
  try {
    const history = await executeQuery(
      "SELECT * FROM historial ORDER BY fechahora DESC LIMIT 20",
      
    )
    if (!history) {
      return NextResponse.json({ mensaje: "No hay datos disponibles" })
    }

    // Armar el JSON de respuesta
    const response = {
      historial: history.map((item) => ({
        id: item.id,
        usuario: item.user_id,
        accion: item.accion,
        fechahora: item.fechahora,
      })),
    }
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error en consultarHistorial:", error)
    return NextResponse.json({ error: error.message }, { status: 500 }) 
  }
}    