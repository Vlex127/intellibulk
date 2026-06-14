import Link from "next/link";
import { DEMO_EVENT, VENDORS, eventTotals, formatNaira } from "@/lib/data";
import { seedLedgerIfNeeded } from "@/lib/data";
import { list, verify } from "@/lib/ledger";
import { Card, TrustSeal, LiveDot } from "@/components/Brand";
import { HashBadge } from "@/components/HashBadge";

seedLedgerIfNeeded();

export default function Home() {
  const totals = eventTotals();
  const pct = Math.round((totals.raised / DEMO_EVENT.targetNaira) * 100);
  const v = verify();
  const entries = list();
  const headHash = entries[entries.length - 1]?.hash ?? "—";

  return (
    <div>
      {/* Hero */}
      <section className="ledger-vine">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
                   style={{ background: "white", color: "var(--slate-600)", border: "1px solid var(--slate-100)" }}>
                OPay Innovation Challenge 2026 · Built on OPay rails
             </div>
              <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "var(--navy)" }}>
                Intelligence for community <span style={{ color: "var(--brand-deep)" }}>events</span>
            </h1>
              <p className="mt-4 text-lg" style={{ color: "var(--slate-600)" }}>
                IntelliBulk turns every school contribution, vendor payout, and refund into one
                OPay-powered flow — with a Trust Ledger that proves what moved, when, and for whom.
             </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/event/${DEMO_EVENT.id}`}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                  style={{ background: "var(--brand)" }}
                >
                  Open organiser dashboard
                  <span aria-hidden>→</span>
               </Link>
                <Link
                  href={`/contribute/${DEMO_EVENT.id}`}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
                  style={{ background: "white", color: "var(--navy)", border: "1px solid var(--slate-200)" }}
                >
                  Try the parent flow
               </Link>
                <TrustSeal />
             </div>
           </div>

            {/* Trust glass */}
            <Card glow className="w-full md:max-w-sm">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>
                  Head hash
               </div>
                <LiveDot />
             </div>
              <div className="mt-2 hash-mono text-sm" style={{ color: "var(--navy)" }}>
                {headHash.slice(0, 24)}…
             </div>
              <hr className="my-4" style={{ borderColor: "var(--slate-100)" }} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs" style={{ color: "var(--slate-400)" }}>Entries</div>
                  <div className="text-2xl font-bold mt-0.5 hash-mono" style={{ color: "var(--navy)" }}>
                    {entries.length}
                 </div>
               </div>
                <div>
                  <div className="text-xs" style={{ color: "var(--slate-400)" }}>Verified</div>
                  <div className="text-2xl font-bold mt-0.5" style={{ color: v.ok ? "var(--brand-deep)" : "var(--danger)" }}>
                    {v.ok ? "✓" : "✗"}
                 </div>
               </div>
             </div>
              <hr className="my-4" style={{ borderColor: "var(--slate-100)" }} />
              <div className="text-xs leading-relaxed" style={{ color: "var(--slate-600)" }}>
                Every event action — contributions, payouts, refunds — is hash-chained
                end to end. Immutable. Auditable. Disputable in court.
             </div>
           </Card>
         </div>
       </div>
     </section>

      {/* Stat strip */}
      <section className="mx-auto max-w-6xl px-6">
        <Card>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Stat label="Target" value={formatNaira(DEMO_EVENT.targetNaira)} sub={`${DEMO_EVENT.expectedHeadcount} contributors`} />
            <Stat label="Raised" value={formatNaira(totals.raised)} sub={`${pct}% of goal`} accent />
            <Stat label="Outstanding" value={formatNaira(totals.outstanding)} sub={`${DEMO_EVENT.lineItems.length} line items`} />
            <Stat label="Vendors AI-matched" value={`${VENDORS.length}`} sub="3 categories" />
         </div>
       </Card>
     </section>

      {/* Hero cards row */}
      <section className="mx-auto max-w-6xl px-6 mt-8 grid md:grid-cols-3 gap-5">
        <Feature
          title="OPay-native rails"
          body="Wallet contributions, vendor payouts, and refunds are all OPay moves. No off-rail cash, no parallel ledgers."
          tag="Integration"
        />
        <Feature
          title="Trust Ledger"
          body="Append-only, sha256-hash-chained record of every event action. Parents and organisers see the same sealed truth."
          tag="Novelty"
          hero
        />
        <Feature
          title="Predictive matching"
          body="Capacity-aware vendor ranking, with v1 rules engine feeding the Predictive Matching Loop in production."
          tag="AI"
        />
     </section>

      {/* Sector strip */}
      <section className="mx-auto max-w-6xl px-6 mt-12 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs hash-mono" style={{ color: "var(--slate-600)" }}>
          <span>Triple fit</span>
          <Pill>Fintech</Pill>
          <Pill>AI for social good</Pill>
          <Pill>Digital tools for SMEs</Pill>
       </div>
     </section>
   </div>
  );
}

function Stat({ label, value, sub, accent = false }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>{label}</div>
      <div className="mt-1 text-2xl md:text-3xl font-bold hash-mono" style={{ color: accent ? "var(--brand-deep)" : "var(--navy)" }}>{value}</div>
      <div className="mt-1 text-xs" style={{ color: "var(--slate-400)" }}>{sub}</div>
   </div>
  );
}

function Feature({ title, body, tag, hero = false }: { title: string; body: string; tag: string; hero?: boolean }) {
  return (
    <Card glow={hero}>
      <div className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide" style={{ background: hero ? "var(--ember-soft)" : "var(--slate-50)", color: hero ? "var(--ember)" : "var(--slate-600)" }}>
        {tag}
     </div>
      <div className="mt-3 text-lg font-bold tracking-tight" style={{ color: "var(--navy)" }}>{title}</div>
      <div className="mt-2 text-sm leading-relaxed" style={{ color: "var(--slate-600)" }}>{body}</div>
   </Card>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
      style={{ background: "white", color: "var(--brand-deep)", border: "1px solid var(--brand-soft)" }}
    >
      {children}
   </span>
  );
}
