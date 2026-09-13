import { verifyAdminSession, getAdminMessages } from "@/lib/actions/admin";
import { redirect } from "next/navigation";
import MessagesAdminClient from "./MessagesAdminClient";

export default async function MessagesAdminPage() {
  const isAuthenticated = await verifyAdminSession();
  if (!isAuthenticated) {
    redirect("/admin");
  }

  const messages = await getAdminMessages();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">CONTACT MESSAGES</h1>
        <p className="text-xs text-white/50 mt-1">
          Private owner inbox for portfolio inquiries, recruiter outreach, and direct contact submissions.
        </p>
      </div>

      <MessagesAdminClient initialMessages={messages} />
    </div>
  );
}
