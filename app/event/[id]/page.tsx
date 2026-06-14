import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_EVENT, DEMO_PARENTS, formatNaira, seedLedgerIfNeeded, eventTotals } from "@/lib/data";
import { list, verify, shortHash } from "@/lib/ledger";
import { Card, LiveDot, TrustSeal } from "@/components/Brand";
import { HashBadge } from "@/components/HashBadge";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  seedLedgerIfNeeded();
  if (id !== DEMO_EVENT.id) notFound();

  const totals = eventTotals();
  const pct = Math.min(100, Math.round((totals.raised / DEMO_EVENT.targetNaira) * 100));
  const v = verify();
  const entries = list();
  const headHash = entries[entries.length - 1]?.hash ?? "—";
  const recentEntries = [...entries].reverse().slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10 pb-16">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>
            Organiser dashboard
        </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight" style={{ color: "var(--navy)" }}>
            {DEMO_EVENT.title}
        </h1>
          <div className="mt-1 text-sm" style={{ color: "var(--slate-600)" }}>
            {DEMO_EVENT.school} · {DEMO_EVENT.cohort} · {DEMO_EVENT.date}
        </div>
          <div className="mt-2 flex items-center gap-2">
            <TrustSeal />
            <LiveDot />
        </div>
      </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/contribute/${DEMO_EVENT.id}`}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
            style={{ background: "var(--brand)" }}
          >
            Share parent link ↗
        </Link>
      </div>
    </div>

      {/* KPI row */}
      <div className="mt-6 grid md:grid-cols-3 gap-5">
        <Kpi label="Target" value={formatNaira(DEMO_EVENT.targetNaira)} sub={`${DEMO_EVENT.expectedHeadcount} contributors expected`} />
        <Kpi label="Raised" value={formatNaira(totals.raised)} sub={`${pct}% of target`} accent />
        <Kpi label="Outstanding" value={formatNaira(totals.outstanding)} sub={`${DEMO_EVENT.lineItems.length} line items`} />
    </div>

      {/* Progress + line items */}
      <div className="mt-5 grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>Capital pipeline</div>
              <div className="mt-1 text-2xl font-bold tracking-tight hash-mono" style={{ color: "var(--navy)" }}>
                {formatNaira(totals.raised)} <span style={{ color: "var(--slate-400)" }}>of {formatNaira(DEMO_EVENT.targetNaira)}</span>
            </div>
          </div>
            <Link
              href={`/vendors/${DEMO_EVENT.id}`}
              className="text-xs font-semibold underline"
              style={{ color: "var(--brand-deep)" }}
            >Match a vendor with AI →</Link>
        </div>
          <div className="mt-4 h-3 rounded-full overflow-hidden" style={{ background: "var(--slate-100)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, background: "linear-gradient(90deg, var(--brand), var(--brand-deep))" }}
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
        </div>
          <div className="mt-6 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>
            Line items
        </div>
          <div className="mt-3 divide-y" style={{ borderColor: "var(--slate-100)" }}>
            {DEMO_EVENT.lineItems.map((li) => (
              <div key={li.id} className="py-3 flex items-center justify-between">
                <div className="text-sm" style={{ color: "var(--navy)" }}>{li.label}</div>
                <div className="hash-mono text-sm font-semibold" style={{ color: "var(--navy)" }}>{formatNaira(li.amount)}</div>
            </div>
            ))}
        </div>
      </Card>

        <Card>
          <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>Trust Ledger · tail</div>
          <div className="mt-1 text-sm" style={{ color: "var(--slate-600)" }}>
            Hash-anchored · <span className="hash-mono" style={{ color: v.ok ? "var(--brand-deep)" : "var(--danger)" }}>verified {v.ok ? "✓" : "✗"}</span>
        </div>
          <div className="mt-4 space-y-3">
            {recentEntries.map((e) => (
              <div key={e.index} className="rounded-lg p-3" style={{ background: "var(--slate-50)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wide font-bold" style={{ color: e.kind === "payout" ? "var(--ember)" : "var(--brand-deep)" }}>
                    {e.kind}
                </span>
                  <span className="hash-mono text-[10px]" style={{ color: "var(--slate-400)" }}>#{e.index}</span>
              </div>
                <div className="mt-1 text-xs font-medium" style={{ color: "var(--navy)" }}>{e.actor}</div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="hash-mono text-xs font-semibold" style={{ color: "var(--navy)" }}>
                    {e.amount > 0 ? `+${formatNaira(e.amount)}` : "—"}
                </span>
                  <HashBadge hash={e.hash} />
            </div>
            </div>
             ))}
          </div>
          <div className="mt-4">
            <Link
              href={`/ledger/${DEMO_EVENT.id}`}
              className="block text-center text-xs font-semibold rounded-full py-2"
              style={{ background: "var(--brand-soft)", color: "var(--brand-deep)" }}
            >Open full ledger →</Link>
        </div>
      </Card>
    </div>

      {/* Roster */}
      <div className="mt-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>Roster</div>
              <div className="mt-1 text-base font-bold" style={{ color: "var(--navy)" }}>Parents ({DEMO_PARENTS.length})</div>
          </div>
            <div className="text-xs" style={{ color: "var(--slate-600)" }}>Updated {new Date().toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}</div>
        </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left" style={{ color: "var(--slate-400)" }}>
                  <th className="py-2 text-xs uppercase tracking-wide font-semibold">Parent</th>
                  <th className="py-2 text-xs uppercase tracking-wide font-semibold">Status</th>
                  <th className="py-2 text-xs uppercase tracking-wide font-semibold text-right">Paid</th>
                  <th className="py-2 text-xs uppercase tracking-wide font-semibold text-right">Outstanding</th>
               </tr>
             </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--slate-100)" }}>
                {DEMO_PARENTS.map((p) => {
                  const expected = Math.round(DEMO_EVENT.targetNaira / DEMO_EVENT.expectedHeadcount);
                  const out = Math.max(0, expected - p.paid);
                  return (
                    <tr key={p.id}>
                      <td className="py-3" style={{ color: "var(--navy)" }}>{p.name}</td>
                      <td>
                        <Pill tone={p.status === "paid" ? "ok" : p.status === "partial" ? "warn" : "muted"}>{p.status}</Pill>
                     </td>
                      <td className="py-3 text-right hash-mono" style={{ color: "var(--navy)" }}>{formatNaira(p.paid)}</td>
                      <td className="py-3 text-right hash-mono" style={{ color: out > 0 ? "var(--ember)" : "var(--slate-400)" }}>{formatNaira(out)}</td>
                   </tr>
                  );
                })}
             </tbody>
          </table>
        </div>
      </Card>
    </div>

      <div className="mt-8 hash-mono text-[11px] text-center" style={{ color: "var(--slate-400)" }}>
        Tail hash · {headHash}
    </div>
  </div>
  );
}

function Kpi({ label, value, sub, accent = false }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <Card>
      <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>{label}</div>
      <div className="mt-1 text-3xl font-bold hash-mono" style={{ color: accent ? "var(--brand-deep)" : "var(--navy)" }}>{value}</div>
      <div className="mt-1 text-xs" style={{ color: "var(--slate-600)" }}>{sub}</div>
  </Card>
  );
}

function Pill({ children, tone = "muted" }: { children: React.ReactNode; tone?: "ok" | "warn" | "muted" }) {
  const styles = {
    ok: { background: "var(--brand-soft)", color: "var(--brand-deep)" },
    warn: { background: "var(--ember-soft)", color: "var(--ember)" },
    muted: { background: "var(--slate-100)", color: "var(--slate-600)" },
  }[tone];
  return (
    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide" style={styles}>
      {children}
  </span>
  );
}
