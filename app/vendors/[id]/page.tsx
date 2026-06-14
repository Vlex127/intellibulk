import { notFound } from "next/navigation";
import { DEMO_EVENT, VENDORS, formatNaira, seedLedgerIfNeeded } from "@/lib/data";
import { matchVendors } from "@/lib/matcher";
import { Card, LiveDot } from "@/components/Brand";

export default async function VendorsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  seedLedgerIfNeeded();
  if (id !== DEMO_EVENT.id) notFound();

  const results = matchVendors(VENDORS, DEMO_EVENT.expectedHeadcount);
  const top = results[0];

  return (
    <div className="mx-auto max-w-5xl px-6 pt-10 pb-16">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>Vendor matching</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight" style={{ color: "var(--navy)" }}>
            Predictive Matching Loop · v1 rules engine
        </h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "var(--brand-soft)", color: "var(--brand-deep)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden fill="none">
                <path d="M3 12h4l3-7 4 14 3-7h4" stroke="#068a47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
              AI · trained on event cohort data
           </span>
            <LiveDot />
         </div>
       </div>
     </div>

      {/* Top pick hero */}
      {top && (
        <Card glow className="mt-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--ember)" }}>
            ★ Top pick
         </div>
          <div className="mt-1 flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl" aria-hidden>{top.vendor.emoji}</span>
              <div>
                <div className="text-xl font-bold" style={{ color: "var(--navy)" }}>{top.vendor.name}</div>
                <div className="text-sm" style={{ color: "var(--slate-600)" }}>
                  {top.vendor.blurb}
               </div>
                <div className="mt-1 text-xs hash-mono" style={{ color: "var(--slate-400)" }}>
                  {top.vendor.city} · capacity {top.vendor.capacity} · {top.vendor.completedEvents} events
               </div>
             </div>
           </div>
            <div className="text-right">
              <div className="text-3xl font-bold hash-mono" style={{ color: "var(--brand-deep)" }}>
                {(top.score * 100).toFixed(0)}%
             </div>
              <div className="text-xs" style={{ color: "var(--slate-400)" }}>match</div>
           </div>
         </div>

          <div className="mt-5 grid md:grid-cols-3 gap-4">
            <Bar label="Capacity" value={top.reason.capacity} />
            <Bar label="History" value={top.reason.history} />
            <Bar label="Price fit" value={top.reason.price} />
         </div>

          <div className="mt-5 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>
            Why this vendor
         </div>
          <ul className="mt-2 space-y-1.5 text-sm" style={{ color: "var(--slate-600)" }}>
            {top.why.map((w, i) => (
              <li key={i} className="flex items-start gap-2">
                <span style={{ color: "var(--brand)" }}>•</span>{w}
             </li>
            ))}
         </ul>

          <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="text-sm" style={{ color: "var(--slate-600)" }}>
              Confirm match and pay 50% deposit via OPay — payout lands on Trust Ledger.
           </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
              style={{ background: "var(--brand)" }}
            >
              Accept & pay 50% via OPay <span aria-hidden>→</span>
           </button>
         </div>
       </Card>
      )}

      {/* Full ranking */}
      <div className="mt-8">
        <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>
          Ranked alternatives ({results.length})
       </div>
        <div className="mt-3 grid md:grid-cols-3 gap-4">
          {results.map((r, i) => (
            <Card key={r.vendor.id} className={i === 0 ? "ring-2" : ""} >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="grid place-items-center w-7 h-7 rounded-lg text-[10px] font-black" style={{ background: i === 0 ? "var(--brand)" : "var(--slate-100)", color: i === 0 ? "white" : "var(--slate-600)" }}>
                    {i + 1}
                 </span>
                  <span className="text-2xl">{r.vendor.emoji}</span>
               </div>
                <div className="hash-mono text-lg font-bold" style={{ color: i === 0 ? "var(--brand-deep)" : "var(--navy)" }}>
                  {(r.score * 100).toFixed(0)}%
               </div>
             </div>
              <div className="mt-2 text-sm font-bold" style={{ color: "var(--navy)" }}>{r.vendor.name}</div>
              <div className="text-xs hash-mono" style={{ color: "var(--slate-400)" }}>★ {r.vendor.rating.toFixed(1)} · {r.vendor.completedEvents} events</div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <Bar label="Cap" value={r.reason.capacity} compact />
                <Bar label="Hist" value={r.reason.history} compact />
                <Bar label="Price" value={r.reason.price} compact />
             </div>
           </Card>
          ))}
       </div>
     </div>
   </div>
  );
}

function Bar({ label, value, compact = false }: { label: string; value: number; compact?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wide font-semibold" style={{ color: "var(--slate-400)" }}>
        <span>{label}</span>
        <span className="hash-mono" style={{ color: "var(--navy)" }}>{(value * 100).toFixed(0)}%</span>
     </div>
      <div className={`mt-1 rounded-full overflow-hidden ${compact ? "h-1.5" : "h-2"}`} style={{ background: "var(--slate-100)" }}>
        <div className="h-full rounded-full" style={{ width: `${value * 100}%`, background: "linear-gradient(90deg, var(--brand), var(--brand-deep))" }} />
     </div>
   </div>
  );
}
