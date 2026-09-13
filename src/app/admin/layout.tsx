import React from "react";
import Link from "next/link";
import { verifyAdminSession } from "@/lib/actions/admin";

export const metadata = {
  title: "Admin Dashboard | Prajwal PG Portfolio",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await verifyAdminSession();

  return (
    <div className="min-h-screen bg-[#08080f] text-white flex flex-col font-sans">
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-violet-600/30 text-xs font-bold text-violet-300 ring-1 ring-violet-500/40">
              AI
            </div>
            <div>
              <span className="text-sm font-semibold tracking-wide text-white">
                PRAJWAL PG
              </span>
              <span className="ml-2 rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-mono text-violet-400 border border-violet-500/20">
                ADMIN CONTROL
              </span>
            </div>
          </div>

          {isAuthenticated && (
            <nav className="flex items-center gap-6">
              <Link
                href="/admin/visitors"
                className="text-xs font-medium text-white/70 transition-colors hover:text-violet-400"
              >
                VISITOR ANALYTICS
              </Link>
              <Link
                href="/admin/messages"
                className="text-xs font-medium text-white/70 transition-colors hover:text-violet-400"
              >
                CONTACT MESSAGES
              </Link>
              <form
                action={async () => {
                  'use server';
                  const { adminLogout } = await import("@/lib/actions/admin");
                  const { redirect } = await import("next/navigation");
                  await adminLogout();
                  redirect("/admin");
                }}
              >
                <button
                  type="submit"
                  className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 ring-1 ring-red-500/30 transition-colors hover:bg-red-500/20"
                >
                  LOGOUT
                </button>
              </form>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl p-6">{children}</main>

      <footer className="border-t border-white/5 py-4 text-center text-xs text-white/30">
        PRIVATE SYSTEM DASHBOARD · RESTRICTED ACCESS
      </footer>
    </div>
  );
}
