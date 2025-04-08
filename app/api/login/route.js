
import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db/connect"
import { create } from "@/actions/cookie"

export async function POST(request) {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const data = await request.json()

        const username = data.username
        const password = data.password

        // Verificar si el usuario existe en la base de datos
        const user = await executeQuery("SELECT id FROM usuario WHERE nombre = ? AND contraseña = ?", [username, password])

        // Verificar si el usuario existe y si las credenciales coinciden
        if (user.length > 0) {
            // Crear un cookie de sesión
           await create(user[0].id)
            // Enviar el cookie al cliente
            return NextResponse.json({ user: user[0].id }, { status: 200 })
        } else {
            return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 })
        }
    } catch (error) {
        console.error("Error en login:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}