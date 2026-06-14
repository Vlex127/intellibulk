"use client";

import { useState } from "react";
import { OpayModal } from "@/components/OpayModal";

type Props = {
  eventId: string;
  amount: number;
  recipient: string;
  description: string;
  payerName: string;
  payerEmail?: string;
};

export function ContributeForm({ eventId, amount, recipient, description, payerName, payerEmail }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <div className="rounded-xl p-4" style={{ background: "var(--slate-50)" }}>
        <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>Payer</div>
        <div className="mt-1 text-sm font-bold" style={{ color: "var(--navy)" }}>{payerName}</div>
        <div className="text-xs" style={{ color: "var(--slate-600)" }}>{payerEmail}</div>
    </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full inline-flex items-center justify-center gap-3 rounded-full px-5 py-4 font-semibold text-white text-base"
        style={{ background: "var(--brand)" }}
      >
        <span className="grid place-items-center w-7 h-7 rounded-md bg-white/20 text-white font-black text-xs">O</span>
        Pay {amount.toLocaleString("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 })} with OPay
        <span aria-hidden>→</span>
    </button>

      <div className="text-center text-[11px]" style={{ color: "var(--slate-400)" }}>
        PIN-protected · receipt goes to Trust Ledger · refundable in 24h
    </div>

      <OpayModal
        open={open}
        onClose={() => setOpen(false)}
        amount={amount}
        recipient={recipient}
        description={description}
        payerName={payerName}
        payerEmail={payerEmail}
        eventId={eventId}
      />
  </div>
  );
}
