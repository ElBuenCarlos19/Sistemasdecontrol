'use server'
 
import { cookies } from 'next/headers'
export async function create(sesion: string) {
  const cookieStore = await cookies()
 
  cookieStore.set('isAuthenticated', sesion)
}

export async function getCookie() {
  const cookieStore = await cookies()
  return cookieStore.get('isAuthenticated')?.value // Asegura obtener el .value
}

export async function uptadeid(id: string) {
  const cookieStore = await cookies()
  cookieStore.set('isAuthenticated', id)
}