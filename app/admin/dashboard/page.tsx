import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminDashboardPage() {
  const isAuthenticated = await isAdminAuthenticated()

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return <AdminDashboard />
}
