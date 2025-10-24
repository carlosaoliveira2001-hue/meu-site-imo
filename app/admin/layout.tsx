import type React from "react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if we're on the login page
  const isLoginPage = true // We'll handle this in the page itself

  return <>{children}</>
}
