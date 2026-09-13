'use client';

import { useState } from "react";
import { updateMessageStatus, deleteMessage } from "@/lib/actions/admin";
import { Mail, Check, Trash2, Phone, Clock, MessageSquare, Reply } from "lucide-react";

export type MessageItem = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: Date;
};

export default function MessagesAdminClient({
  initialMessages,
}: {
  initialMessages: MessageItem[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);

  async function handleStatusChange(id: string, status: "NEW" | "READ" | "REPLIED") {
    const res = await updateMessageStatus(id, status);
    if (res.success) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage((prev) => (prev ? { ...prev, status } : null));
      }
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return;
    const res = await deleteMessage(id);
    if (res.success) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Messages List Column */}
      <div className="lg:col-span-5 rounded-xl border border-white/10 bg-black/40 overflow-hidden">
        <div className="border-b border-white/10 px-5 py-4 flex items-center justify-between">
          <h3 className="text-xs font-mono font-semibold text-white/70">
            INBOX ({messages.length})
          </h3>
          <div className="text-[10px] font-mono text-white/40">
            {messages.filter((m) => m.status === "NEW").length} NEW
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="p-8 text-center text-xs text-white/40">
            No contact messages received yet.
          </div>
        ) : (
          <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
            {messages.map((m) => {
              const isSelected = selectedMessage?.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedMessage(m);
                    if (m.status === "NEW") {
                      handleStatusChange(m.id, "READ");
                    }
                  }}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-violet-500/10 border-l-2 border-violet-500"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white">{m.name}</span>
                    <span className="font-mono text-[10px] text-white/40">
                      {new Date(m.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="text-xs font-medium text-violet-300 truncate mb-1">
                    {m.subject || "No Subject"}
                  </div>

                  <div className="text-[11px] text-white/60 truncate mb-2">
                    {m.message}
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[9px] px-2 py-0.5 rounded-full border ${
                        m.status === "NEW"
                          ? "bg-violet-500/20 text-violet-300 border-violet-500/40"
                          : m.status === "REPLIED"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : "bg-white/10 text-white/50 border-white/10"
                      }`}
                    >
                      {m.status}
                    </span>
                    <span className="text-[10px] text-white/40">{m.email}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Message Detail Column */}
      <div className="lg:col-span-7 rounded-xl border border-white/10 bg-black/40 p-6">
        {selectedMessage ? (
          <div className="space-y-6">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {selectedMessage.subject || "No Subject"}
                </h2>
                <div className="mt-1 flex items-center gap-3 text-xs text-white/60">
                  <span className="font-semibold text-white">{selectedMessage.name}</span>
                  <span>&bull;</span>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-violet-400 hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                  {selectedMessage.phone && (
                    <>
                      <span>&bull;</span>
                      <span className="inline-flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {selectedMessage.phone}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  title="Delete message"
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-white/40 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {new Date(selectedMessage.createdAt).toLocaleString()}
              </span>

              <div className="flex items-center gap-1.5 ml-auto">
                <span className="text-white/40">MARK STATUS:</span>
                <button
                  onClick={() => handleStatusChange(selectedMessage.id, "NEW")}
                  className={`px-2 py-1 rounded text-[10px] border ${
                    selectedMessage.status === "NEW"
                      ? "bg-violet-500/20 text-violet-300 border-violet-500/40 font-bold"
                      : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
                  }`}
                >
                  NEW
                </button>
                <button
                  onClick={() => handleStatusChange(selectedMessage.id, "READ")}
                  className={`px-2 py-1 rounded text-[10px] border ${
                    selectedMessage.status === "READ"
                      ? "bg-blue-500/20 text-blue-300 border-blue-500/40 font-bold"
                      : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
                  }`}
                >
                  READ
                </button>
                <button
                  onClick={() => handleStatusChange(selectedMessage.id, "REPLIED")}
                  className={`px-2 py-1 rounded text-[10px] border ${
                    selectedMessage.status === "REPLIED"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                      : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
                  }`}
                >
                  REPLIED
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-5 text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
              {selectedMessage.message}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                  selectedMessage.subject || "Portfolio Contact"
                )}`}
                onClick={() => handleStatusChange(selectedMessage.id, "REPLIED")}
                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500 transition-all shadow-md shadow-violet-600/20"
              >
                <Reply className="h-4 w-4" /> REPLY VIA EMAIL
              </a>
            </div>
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center text-center text-white/40">
            <MessageSquare className="h-8 w-8 mb-2 stroke-1" />
            <p className="text-xs">Select a message from the inbox to read details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
