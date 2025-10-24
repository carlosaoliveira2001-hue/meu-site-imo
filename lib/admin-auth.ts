"use server"

import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

const ADMIN_SESSION_COOKIE = "admin_session"

export async function adminLogin(username: string, password: string) {
  const supabase = await createClient()

  // Simple authentication - check if username is "admin" and password is "admin"
  // In production, you should use proper password hashing
  if (username === "admin" && password === "admin") {
    const cookieStore = await cookies()
    // Set a simple session cookie
    cookieStore.set(ADMIN_SESSION_COOKIE, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return { success: true }
  }

  return { success: false, error: "Credenciais inválidas" }
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  return session?.value === "authenticated"
}
