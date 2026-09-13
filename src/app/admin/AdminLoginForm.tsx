'use client';

import { useState } from "react";
import { adminLogin } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import { Lock, ShieldAlert } from "lucide-react";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await adminLogin(password);
    if (res.success) {
      router.push("/admin/visitors");
      router.refresh();
    } else {
      setError(res.error || "Authentication failed");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/30">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold text-white">System Admin Login</h1>
        <p className="mt-1 text-xs text-white/50">
          Enter admin credentials to access private analytics &amp; messages.
        </p>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-xs text-red-400 ring-1 ring-red-500/30">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-white/70 mb-1">
            ADMIN PASSWORD
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-violet-600 py-2.5 text-xs font-semibold tracking-wider text-white hover:bg-violet-500 disabled:opacity-50 transition-all shadow-lg shadow-violet-600/20"
        >
          {loading ? "AUTHENTICATING..." : "ACCESS DASHBOARD"}
        </button>
      </form>
    </div>
  );
}
