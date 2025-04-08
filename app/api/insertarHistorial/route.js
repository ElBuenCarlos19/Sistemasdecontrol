import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db/connect"

export async function POST(request) {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const data = await request.json()

        // Insertar en el historial
        await executeQuery(
            `INSERT INTO historial (user_id, accion, fechahora)
            VALUES (?, ?, NOW())`,
            [data.user_id, data.accion],
        )

        return NextResponse.json({ mensaje: "Registro de historial creado correctamente" })
    } catch (error) {
        console.error("Error en insertarHistorial:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}