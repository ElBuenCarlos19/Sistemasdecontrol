import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Obtener la ruta actual
  const path = request.nextUrl.pathname

  // Verificar si la ruta es el dashboard o una ruta protegida
  const isProtectedRoute = path === "/dashboard" || path.startsWith("/dashboard/")

  // Verificar si el usuario está autenticado (usando cookies)
  const isAuthenticated = request.cookies.get("isAuthenticated")?.name === "isAuthenticated"

  // Si es una ruta protegida y el usuario no está autenticado, redirigir al login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Si el usuario está autenticado y va a la página de login, redirigir al dashboard
  if (path === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // En cualquier otro caso, continuar con la solicitud
  return NextResponse.next()
}

// Configurar las rutas que deben ser manejadas por el middleware
export const config = {
  matcher: ["/login", "/dashboard/:path*"],
}

