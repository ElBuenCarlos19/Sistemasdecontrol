import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db/connect"
import { getCookie } from "@/actions/cookie"
export async function POST(request) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const data = await request.json()
    
    const estadoled1 = data.estadoled1
    const estadoled2 = data.estadoled2
    const estadoled3 = data.estadoled3
    const estadosensor = data.estadosensor
    const estado_obstaculo = data.estadoobstaculo
    const user_id =  data.user_id;

    // Insertar en accion_led
    await executeQuery(
      `INSERT INTO accion_led (estadoled1, estadoled2, estadoled3, user)
       VALUES (?, ?, ?, ?)`,
      [estadoled1, estadoled2, estadoled3, user_id],
    )

    // Insertar en accion_sensor
    await executeQuery(
      `INSERT INTO accion_sensor (estadosensor, estado_obstaculo, user)
       VALUES (?, ?, ?)`,
      [estadosensor, estado_obstaculo, user_id],
    )

    return NextResponse.json({ mensaje: "Datos insertados correctamente" })
  } catch (error) {
    console.error("Error en insertarEstados:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function parseCookies(cookieHeader) {
  const cookies = {}
  if (!cookieHeader) return cookies
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.trim().split('=')
    const value = rest.join('=')
    cookies[name] = decodeURIComponent(value)
  })
  return cookies
}