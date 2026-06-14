"use client";

import { useEffect, useState } from "react";

function SmsToast() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs animate-in" style={{ background: "var(--brand-soft)", color: "var(--brand-deep)" }}>
      <span>📱</span>
      <span>SMS receipt sent to your phone</span>
    </div>
  );
}

export type OpayModalProps = {
  open: boolean;
  onClose: () => void;
  amount: number;
  recipient: string;       // displayed as "Pay …"
  description?: string;
  payerName?: string;      // shown in success state
  payerEmail?: string;
  eventId?: string;        // threaded into the Trust Ledger entry for audit trail
  onSuccess?: (txId: string) => void;
};

// Mocked OPay wallet flow. Locked brand greens keep it believable.
export function OpayModal({ open, onClose, amount, recipient, description, payerName, payerEmail, eventId, onSuccess }: OpayModalProps) {
  const [step, setStep] = useState<"review" | "pin" | "processing" | "success">("review");
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setStep("review");
      setPin("");
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  async function submit() {
    setStep("processing");
    setError(null);
    try {
      const res = await fetch("/api/opay/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, recipient, description, payerName }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error || "Payment failed");
        setStep("review");
        return;
      }
      if (json.status === "success") {
        setStep("success");
        onSuccess?.(json.txId);
      } else {
        setError(json.errorCode || "Payment declined");
        setStep("review");
      }
    } catch (e) {
      setError("Network error");
      setStep("review");
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="opay-title"
      className="fixed inset-0 z-50 grid place-items-center px-4"
      style={{ background: "rgba(10, 22, 40, 0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && step !== "processing" && onClose()}
    >
      <div
        className="w-full max-w-sm bg-white overflow-hidden"
        style={{ borderRadius: 22, boxShadow: "var(--shadow-lift)", animation: "receipt-in 0.25s ease-out both" }}
      >
        {/* OPay header bar */}
        <div className="px-5 py-4 flex items-center justify-between" style={{ background: "var(--brand)" }}>
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-8 h-8 rounded-md bg-white/20 text-white font-black text-sm">O</span>
            <div className="leading-tight">
              <div className="text-white text-sm font-semibold">OPay Wallet</div>
              <div className="text-white/80 text-[11px]">Secure payment</div>
           </div>
         </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl leading-none"
            disabled={step === "processing"}
          >×</button>
       </div>

        {step === "review" && (
          <div className="px-6 py-6">
            <div className="text-xs uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>Pay</div>
            <div className="mt-1 flex items-baseline gap-2">
              <div className="text-3xl font-bold tracking-tight" style={{ color: "var(--navy)" }}>₦{amount.toLocaleString("en-NG")}</div>
           </div>
            <div className="mt-1 text-sm" style={{ color: "var(--slate-600)" }}>{recipient}</div>
            {description && (
              <div className="mt-3 rounded-md px-3 py-2 text-xs hash-mono" style={{ background: "var(--slate-50)", color: "var(--slate-600)" }}>
                {description}
             </div>
            )}

            <div className="mt-5 rounded-xl p-4" style={{ background: "var(--brand-soft)" }}>
              <div className="text-xs" style={{ color: "var(--brand-deep)" }}>Wallet balance</div>
              <div className="mt-0.5 text-lg font-semibold hash-mono" style={{ color: "var(--brand-deep)" }}>₦84,250.32</div>
           </div>

            {error && <div className="mt-3 text-xs font-medium" style={{ color: "var(--danger)" }}>{error}</div>}

            <button
              onClick={() => setStep("pin")}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 font-semibold text-white transition hover:opacity-90"
              style={{ background: "var(--brand)" }}
            >
              Continue
              <span aria-hidden>→</span>
           </button>
            <div className="mt-3 text-center text-[11px]" style={{ color: "var(--slate-400)" }}>
              Powered by OPay · PIN protected
           </div>
         </div>
        )}

        {step === "pin" && (
          <div className="px-6 py-6">
            <div className="text-sm font-semibold" style={{ color: "var(--navy)" }}>Enter your 4-digit PIN</div>
            <div className="mt-1 text-xs" style={{ color: "var(--slate-600)" }}>Authorise ₦{amount.toLocaleString("en-NG")}</div>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  inputMode="numeric"
                  maxLength={1}
                  value={pin[i] ?? ""}
                  onChange={(e) => {
                    const next = (pin.padEnd(4, " ")).split("");
                    next[i] = e.target.value.replace(/\D/g, "");
                    const merged = next.join("").replace(/\s+$/, "");
                    setPin(merged);
                    if (merged.length === 4) submit();
                  }}
                  className="text-center text-xl font-bold h-12 rounded-lg border hash-mono focus:outline-none"
                  style={{ borderColor: "var(--slate-200)", color: "var(--navy)" }}
                />
              ))}
           </div>
            {error && <div className="mt-3 text-xs font-medium" style={{ color: "var(--danger)" }}>{error}</div>}
            <button
              onClick={() => setStep("review")}
              className="mt-4 text-xs underline"
              style={{ color: "var(--slate-600)" }}
            >Back</button>
         </div>
        )}

        {step === "processing" && (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto w-12 h-12 rounded-full" style={{ border: "3px solid var(--brand-soft)", borderTopColor: "var(--brand)", animation: "spin 0.9s linear infinite" }} aria-hidden />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div className="mt-4 text-sm font-semibold" style={{ color: "var(--navy)" }}>Processing with OPay…</div>
            <div className="mt-1 text-xs" style={{ color: "var(--slate-600)" }}>Don't close this window</div>
         </div>
        )}

        {step === "success" && (
          <div className="px-6 py-7 text-center receipt">
            <div className="mx-auto w-14 h-14 rounded-full grid place-items-center" style={{ background: "var(--brand-soft)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12.5l4 4 10-10" stroke="#0bbe62" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
           </div>
            <div className="mt-4 text-base font-bold" style={{ color: "var(--navy)" }}>₦{amount.toLocaleString("en-NG")} sent</div>
            <div className="mt-1 text-xs" style={{ color: "var(--slate-600)" }}>{payerName ? `${payerName} · ` : ""}Trust Ledger updated</div>
              <SmsToast />
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
                style={{ background: "var(--slate-50)", color: "var(--navy)" }}
              >
                🖨️ Receipt
              </button>
              <button
                onClick={onClose}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white"
                style={{ background: "var(--brand)" }}
              >Done</button>
            </div>
         </div>
        )}
     </div>
   </div>
  );
}
