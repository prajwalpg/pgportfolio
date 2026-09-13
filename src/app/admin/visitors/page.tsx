import { verifyAdminSession, getAdminVisitorStats, getAdminGuestbookEntries } from "@/lib/actions/admin";
import { redirect } from "next/navigation";
import VisitorAdminClient from "./VisitorAdminClient";

export default async function VisitorsAdminPage() {
  const isAuthenticated = await verifyAdminSession();
  if (!isAuthenticated) {
    redirect("/admin");
  }

  const stats = await getAdminVisitorStats();
  const entries = await getAdminGuestbookEntries();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">VISITOR ANALYTICS &amp; GUESTBOOK</h1>
        <p className="text-xs text-white/50 mt-1">
          Private owner insights into persistent server visits and voluntary guestbook entries.
        </p>
      </div>

      <VisitorAdminClient stats={stats} initialEntries={entries} />
    </div>
  );
}
