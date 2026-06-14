import { notFound } from "next/navigation";
import { DEMO_EVENT, formatNaira, seedLedgerIfNeeded } from "@/lib/data";
import { Card, TrustSeal } from "@/components/Brand";
import { ContributeForm } from "@/components/ContributeForm";

export default async function ContributePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  seedLedgerIfNeeded();
  if (id !== DEMO_EVENT.id) notFound();

  // Per-parent fair share.
  const amount = Math.round(DEMO_EVENT.targetNaira / DEMO_EVENT.expectedHeadcount);
  const payerName = "Mrs. Funke Adeyemi";
  const payerEmail = "funke.a@example.com";
  const recipient = `${DEMO_EVENT.title} · ${DEMO_EVENT.school}`;

  return (
    <div className="mx-auto max-w-3xl px-6 pt-10 pb-16 grid md:grid-cols-5 gap-6">
      <div className="md:col-span-3 space-y-6">
        <Card glow>
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-9 h-9 rounded-xl text-white font-black" style={{ background: "var(--brand)" }}>iB</span>
            <div className="leading-tight">
              <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>IntelliBulk invite</div>
              <div className="text-base font-bold" style={{ color: "var(--navy)" }}>{recipient}</div>
          </div>
        </div>

          <div className="mt-5 flex items-baseline justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide font-semibold" style={{ color: "var(--slate-400)" }}>Your share</div>
              <div className="mt-1 text-4xl font-bold hash-mono" style={{ color: "var(--navy)" }}>{formatNaira(amount)}</div>
          </div>
            <TrustSeal />
        </div>

          <div className="mt-6">
            <ContributeForm
              eventId={id}
              amount={amount}
              recipient={recipient}
              description={`Class trip contribution · Ref INV-${DEMO_EVENT.id.toUpperCase()}`}
              payerName={payerName}
              payerEmail={payerEmail}
            />
        </div>
      </Card>

        <Card>
          <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>Where the money goes</div>
          <div className="mt-2 space-y-2">
            {DEMO_EVENT.lineItems.map((li) => (
              <div key={li.id} className="flex items-center justify-between text-sm">
                <span style={{ color: "var(--slate-600)" }}>{li.label}</span>
                <span className="hash-mono font-semibold" style={{ color: "var(--navy)" }}>{formatNaira(li.amount)}</span>
             </div>
            ))}
        </div>
      </Card>
    </div>

      <div className="md:col-span-2 space-y-6">
        <Card>
          <div className="flex items-center gap-2">
            <span className="grid place-items-center w-6 h-6 rounded-md text-white text-[10px] font-black" style={{ background: "var(--brand)" }}>O</span>
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>Why OPay is the spine</div>
          </div>
          <div className="mt-3 text-sm leading-relaxed space-y-2" style={{ color: "var(--slate-600)" }}>
            <p>OPay Wallet moves every naira. Your transaction ID is sealed into the Trust Ledger's SHA256 chain — swap OPay and the hash proof breaks.</p>
            <p className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--brand-deep)" }}>
              <span>🔗</span> OPay TX ID anchored on-ledger
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>What you get</div>
          <ul className="mt-3 text-sm space-y-2" style={{ color: "var(--slate-600)" }}>
            <li className="flex items-start gap-2"><span style={{ color: "var(--brand)" }}>✓</span> Full refund within 24 hours</li>
            <li className="flex items-start gap-2"><span style={{ color: "var(--brand)" }}>✓</span> Hash-anchored receipt on Trust Ledger</li>
            <li className="flex items-start gap-2"><span style={{ color: "var(--brand)" }}>✓</span> SMS sent to your phone (simulated)</li>
            <li className="flex items-start gap-2"><span style={{ color: "var(--brand)" }}>✓</span> Same view as the organiser</li>
        </ul>
      </Card>
    </div>
  </div>
  );
}
