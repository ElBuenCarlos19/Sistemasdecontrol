import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db/connect"

export async function GET() {
  try {
    // Obtener el último registro de accion_led
    const ledResult = await executeQuery(
      "SELECT estadoled1, estadoled2, estadoled3 FROM accion_led ORDER BY fechahoraregistro DESC LIMIT 1",
    )

    // Obtener el último registro de accion_sensor
    const sensorResult = await executeQuery(
      "SELECT estadosensor, estado_obstaculo FROM accion_sensor ORDER BY fechahoraregistro DESC LIMIT 1",
    )

    // Manejar si hay datos o no
    if (!ledResult.length || !sensorResult.length) {
      return NextResponse.json({ mensaje: "No hay datos disponibles" })
    }

    // Armar el JSON de respuesta
    const response = {
      estadoled1: Boolean(ledResult[0].estadoled1),
      estadoled2: Boolean(ledResult[0].estadoled2),
      estadoled3: Boolean(ledResult[0].estadoled3),
      estadosensor: Boolean(sensorResult[0].estadosensor),
      estadoledobstaculosensor: Boolean(sensorResult[0].estado_obstaculo),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error en consultarEstados:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

