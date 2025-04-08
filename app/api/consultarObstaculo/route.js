import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db/connect"

export async function GET() {
  try {
    // obtener si hay obstáculo
    const obst = await executeQuery(
      "SELECT estado_obstaculo FROM accion_sensor ORDER BY fechahoraregistro DESC LIMIT 1",
    )
    if (!obst) {
      return NextResponse.json({ mensaje: "No hay datos disponibles" })
    }

    const response = obst[0].estado_obstaculo
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error en consultarObstaculo:", error)
    return NextResponse.json({ error: error.message }, { status: 500 }) 
    }
  }