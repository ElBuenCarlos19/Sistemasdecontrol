'use server'
 
import { cookies } from 'next/headers'
 
export async function deletecookie() {
  (await cookies()).delete('isAuthenticated');
}