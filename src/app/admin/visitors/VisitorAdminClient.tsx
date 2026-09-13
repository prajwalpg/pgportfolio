'use client';

import { useState } from "react";
import {
  updateGuestbookApproval,
  deleteGuestbookEntry,
  togglePublicGuestbookSetting,
} from "@/lib/actions/admin";
import { Check, X, Trash2, Eye, EyeOff, Users, Activity, MessageSquare } from "lucide-react";

export type GuestbookItem = {
  id: string;
  name: string;
  message: string | null;
  publicConsent: boolean;
  approved: boolean;
  createdAt: Date;
};

export default function VisitorAdminClient({
  stats,
  initialEntries,
}: {
  stats: {
    totalVisits: number;
    uniqueVisitors: number;
    guestbookSubmissions: number;
    publicOptInSubmissions: number;
    isPublicGuestbookEnabled: boolean;
  };
  initialEntries: GuestbookItem[];
}) {
  const [entries, setEntries] = useState(initialEntries);
  const [publicEnabled, setPublicEnabled] = useState(stats.isPublicGuestbookEnabled);
  const [loadingToggle, setLoadingToggle] = useState(false);

  async function handleTogglePublic() {
    setLoadingToggle(true);
    const res = await togglePublicGuestbookSetting(!publicEnabled);
    if (res.success) {
      setPublicEnabled(res.enabled);
    }
    setLoadingToggle(false);
  }

  async function handleApproval(id: string, approved: boolean) {
    const res = await updateGuestbookApproval(id, approved);
    if (res.success) {
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, approved } : e))
      );
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this guestbook entry?")) return;
    const res = await deleteGuestbookEntry(id);
    if (res.success) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-white/50 text-xs font-mono">
            <span>TOTAL VISITS</span>
            <Activity className="h-4 w-4 text-violet-400" />
          </div>
          <div className="mt-2 text-3xl font-bold text-white">
            {stats.totalVisits.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-white/40">Server database count</div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-white/50 text-xs font-mono">
            <span>UNIQUE VISITORS</span>
            <Users className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-3xl font-bold text-white">
            {stats.uniqueVisitors.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-white/40">Deduplicated sessions</div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-white/50 text-xs font-mono">
            <span>IDENTIFIED VISITORS</span>
            <MessageSquare className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-3xl font-bold text-white">
            {stats.guestbookSubmissions.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-white/40">Voluntary guestbook notes</div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-white/50 text-xs font-mono">
            <span>PUBLIC CONSENT</span>
            <Eye className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 text-3xl font-bold text-white">
            {stats.publicOptInSubmissions.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-white/40">Opted into public display</div>
        </div>
      </div>

      {/* Public Guestbook Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
        <div>
          <h3 className="text-sm font-semibold text-white">PUBLIC GUESTBOOK SETTING</h3>
          <p className="text-xs text-white/50 mt-0.5">
            When enabled, guestbook entries where visitors checked &quot;Show my name publicly&quot; and you have approved will be displayed publicly on the portfolio. Default: OFF.
          </p>
        </div>

        <button
          onClick={handleTogglePublic}
          disabled={loadingToggle}
          className={`shrink-0 rounded-lg px-4 py-2 text-xs font-mono font-semibold transition-all ${
            publicEnabled
              ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40 hover:bg-emerald-500/30"
              : "bg-white/10 text-white/60 ring-1 ring-white/10 hover:bg-white/15"
          }`}
        >
          {loadingToggle
            ? "UPDATING..."
            : publicEnabled
            ? "PUBLIC GUESTBOOK: ON"
            : "PUBLIC GUESTBOOK: OFF"}
        </button>
      </div>

      {/* Guestbook Submissions Table */}
      <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
        <div className="border-b border-white/10 px-6 py-4">
          <h3 className="text-sm font-semibold text-white">VOLUNTARY GUESTBOOK SUBMISSIONS</h3>
        </div>

        {entries.length === 0 ? (
          <div className="p-8 text-center text-xs text-white/40">
            No voluntary guestbook submissions yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 font-mono text-white/50">
                <tr>
                  <th className="px-6 py-3">NAME</th>
                  <th className="px-6 py-3">MESSAGE</th>
                  <th className="px-6 py-3">DATE</th>
                  <th className="px-6 py-3">PUBLIC CONSENT</th>
                  <th className="px-6 py-3">APPROVAL STATUS</th>
                  <th className="px-6 py-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-semibold text-white">{entry.name}</td>
                    <td className="px-6 py-4 max-w-xs truncate text-white/70">
                      {entry.message || <span className="italic text-white/30">No message</span>}
                    </td>
                    <td className="px-6 py-4 font-mono text-white/40">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {entry.publicConsent ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/20">
                          <Eye className="h-3 w-3" /> YES
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/40 border border-white/10">
                          <EyeOff className="h-3 w-3" /> NO (PRIVATE)
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {entry.approved ? (
                        <span className="rounded-full bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] text-blue-400 border border-blue-500/20">
                          APPROVED FOR PUBLIC
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-400 border border-amber-500/20">
                          PENDING OWNER APPROVAL
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {entry.publicConsent && (
                          <button
                            onClick={() => handleApproval(entry.id, !entry.approved)}
                            title={entry.approved ? "Revoke Approval" : "Approve Public Display"}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              entry.approved
                                ? "bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                            }`}
                          >
                            {entry.approved ? <X className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(entry.id)}
                          title="Delete Entry"
                          className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
