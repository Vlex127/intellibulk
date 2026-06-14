import { notFound } from "next/navigation";
import Link from "next/link";
import { DEMO_EVENT, seedLedgerIfNeeded, formatNaira } from "@/lib/data";
import { list, verify } from "@/lib/ledger";
import { Card, LiveDot, TrustSeal } from "@/components/Brand";

export default async function LedgerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  seedLedgerIfNeeded();
  if (id !== DEMO_EVENT.id) notFound();

  const entries = list();
  const v = verify();
  const reversed = [...entries].reverse();

  return (
    <div className="mx-auto max-w-4xl px-6 pt-10 pb-16">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>Trust Ledger</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight" style={{ color: "var(--navy)" }}>
            Immutable record · {DEMO_EVENT.title}
        </h1>
          <div className="mt-2 flex items-center gap-2">
            <TrustSeal />
            <LiveDot />
            <span className="text-xs hash-mono" style={{ color: v.ok ? "var(--brand-deep)" : "var(--danger)" }}>
              verified {v.ok ? "✓" : "✗"} · {entries.length} entries
          </span>
        </div>
      </div>

        <Link href={`/event/${id}`} className="text-xs font-semibold underline" style={{ color: "var(--brand-deep)" }}>
          ← Back to organiser
      </Link>
    </div>

      <div className="mt-6 space-y-3">
        {reversed.map((e, i) => (
          <Card key={e.index} className={i === 0 ? "receipt" : ""}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <span
                  className="grid place-items-center w-9 h-9 rounded-lg text-white font-black text-sm shrink-0"
                  style={{ background: e.kind === "payout" ? "var(--ember)" : "var(--brand-deep)" }}
                >
                  #{e.index}
               </span>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: e.kind === "payout" ? "var(--ember)" : "var(--brand-deep)" }}>
                    {e.kind}
                 </div>
                  <div className="mt-0.5 text-sm font-bold" style={{ color: "var(--navy)" }}>{e.actor}</div>
                  <div className="text-xs hash-mono" style={{ color: "var(--slate-400)" }}>
                    {new Date(e.timestamp).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })} · {e.ref}
                 </div>
               </div>
             </div>
              <div className="text-right shrink-0">
                <div className="hash-mono text-base font-bold" style={{ color: e.kind === "payout" ? "var(--ember)" : "var(--navy)" }}>
                  {e.amount > 0 ? (e.kind === "payout" ? "−" : "+") + formatNaira(e.amount) : "—"}
               </div>
                <div className="mt-2 hash-mono text-[10px]" style={{ color: "var(--slate-400)" }}>
                  block hash
               </div>
                <div className="hash-mono text-xs" style={{ color: "var(--brand-deep)" }}>
                  {e.hash.slice(0, 10)}…{e.hash.slice(-6)}
               </div>
                <div className="hash-mono text-[10px] mt-1" style={{ color: "var(--slate-400)" }}>
                  prev {e.prevHash.slice(0, 6)}…
               </div>
             </div>
           </div>
         </Card>
        ))}
     </div>

      <div className="mt-8 hash-mono text-[11px] text-center" style={{ color: "var(--slate-400)" }}>
        Append-only · sha256 chain · head: {entries[entries.length - 1]?.hash.slice(0, 16)}…
     </div>
   </div>
  );
}
