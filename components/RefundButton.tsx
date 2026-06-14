"use client";

import { useState } from "react";

export function RefundButton({ parentName, amount, eventId }: { parentName: string; amount: number; eventId: string }) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRefund() {
    if (loading || done) return;
    setLoading(true);
    try {
      const res = await fetch("/api/opay/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentName, amount, reason: "Parent-requested refund", eventId }),
      });
      const json = await res.json();
      if (json.status === "success") {
        setDone(true);
      }
    } catch {
      // silent failure for demo
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleRefund}
      disabled={loading || done}
      className="text-xs font-semibold underline transition"
      style={{
        color: done ? "var(--brand-deep)" : loading ? "var(--slate-400)" : "var(--ember)",
      }}
    >
      {done ? "Refunded ✓" : loading ? "…" : "Refund"}
    </button>
  );
}
