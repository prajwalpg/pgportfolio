import { verifyAdminSession } from "@/lib/actions/admin";
import { redirect } from "next/navigation";
import AdminLoginForm from "./AdminLoginForm";

export default async function AdminPage() {
  const isAuthenticated = await verifyAdminSession();

  if (isAuthenticated) {
    redirect("/admin/visitors");
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <AdminLoginForm />
    </div>
  );
}
