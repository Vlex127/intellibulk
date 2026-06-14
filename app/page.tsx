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
      {/* ─── HERO ─── */}
      <section className="ledger-vine">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
                 style={{ background: "white", color: "var(--slate-600)", border: "1px solid var(--slate-100)" }}>
              OPay Innovation Challenge 2026 · Fintech × AI for Social Good
            </div>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: "var(--navy)" }}>
              Nigerian schools lose billions to{" "}
              <span style={{ color: "var(--brand-deep)" }}>cash-based event management</span>
            </h1>
            <p className="mt-4 text-lg max-w-2xl" style={{ color: "var(--slate-600)" }}>
              IntelliBulk replaces cash envelopes with OPay-powered contributions, an immutable Trust Ledger,
              and AI vendor matching — giving every parent, teacher, and school the transparency they deserve.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contribute/class-of-27"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                style={{ background: "var(--brand)" }}
              >
                Try the demo
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/event/class-of-27"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
                style={{ background: "white", color: "var(--navy)", border: "1px solid var(--slate-200)" }}
              >
                Organiser dashboard
              </Link>
              <TrustSeal />
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="mx-auto max-w-6xl px-6 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
               style={{ background: "var(--ember-soft)", color: "var(--ember)" }}>
            The problem
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight" style={{ color: "var(--navy)" }}>
            Every school trip in Nigeria shares the same broken playbook
          </h2>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          <Card>
            <div className="text-3xl mb-2">💵</div>
            <h3 className="text-base font-bold" style={{ color: "var(--navy)" }}>Cash envelopes</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--slate-600)" }}>
              Parents hand cash to a teacher. No receipts. No record. If money "disappears," there is no way to prove it.
            </p>
          </Card>
          <Card>
            <div className="text-3xl mb-2">🤝</div>
            <h3 className="text-base font-bold" style={{ color: "var(--navy)" }}>Word-of-mouth vendors</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--slate-600)" }}>
              Bus companies, caterers, and hostels are picked by referral — no data, no competitive pricing, no accountability.
            </p>
          </Card>
          <Card>
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="text-base font-bold" style={{ color: "var(--navy)" }}>Zero audit trail</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--slate-600)" }}>
              When disputes arise — and they do — there is no immutable record. Parents vs organisers vs vendors, with no arbiter.
            </p>
          </Card>
        </div>
      </section>

      {/* ─── THE SOLUTION ─── */}
      <section className="mx-auto max-w-6xl px-6 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
               style={{ background: "var(--brand-soft)", color: "var(--brand-deep)" }}>
            The solution
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight" style={{ color: "var(--navy)" }}>
            IntelliBulk replaces the envelope with three innovations
          </h2>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          <Feature
            title="OPay-native contributions"
            body="Every parent contributes directly via OPay Wallet. No cash, no middleman. Each payment is timestamped, receipted, and sealed on the Trust Ledger — instantly."
            tag="Fintech"
            emoji="📱"
          />
          <Feature
            title="Immutable Trust Ledger"
            body="SHA256 hash-chained record of every event action. Parents, organisers, and auditors all see the same sealed truth. Tamper-proof by design."
            tag="Novelty"
            emoji="🔗"
            hero
          />
          <Feature
            title="AI vendor matching"
            body="Capacity-aware algorithm ranks bus companies, caterers, and hostels by past performance, price fit, and capacity. No more blind referrals."
            tag="AI"
            emoji="🤖"
          />
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="mx-auto max-w-6xl px-6 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
               style={{ background: "var(--brand-soft)", color: "var(--brand-deep)" }}>
            How it works
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight" style={{ color: "var(--navy)" }}>
            Three steps, zero cash
          </h2>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                 style={{ background: "var(--brand)" }}>
              1
            </div>
            <h3 className="mt-4 text-base font-bold" style={{ color: "var(--navy)" }}>Organiser creates event</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--slate-600)" }}>
              Sets target, line items, and expected headcount. One link to share with all parents.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                 style={{ background: "var(--brand)" }}>
              2
            </div>
            <h3 className="mt-4 text-base font-bold" style={{ color: "var(--navy)" }}>Parents pay with OPay</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--slate-600)" }}>
              One tap from any phone. Receipt goes to the Trust Ledger. Refundable within 24 hours.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                 style={{ background: "var(--brand)" }}>
              3
            </div>
            <h3 className="mt-4 text-base font-bold" style={{ color: "var(--navy)" }}>AI matches vendors</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--slate-600)" }}>
              Algorithm ranks vendors by capacity, history, and price. Organiser pays deposit via OPay.
            </p>
          </div>
        </div>
      </section>

      {/* ─── LIVE DEMO ─── */}
      <section className="mx-auto max-w-6xl px-6 mt-16">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
               style={{ background: "white", color: "var(--slate-600)", border: "1px solid var(--slate-200)" }}>
            Live demo · {DEMO_EVENT.school}
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight" style={{ color: "var(--navy)" }}>
            See it in action
          </h2>
        </div>

        {/* Trust glass */}
        <div className="flex items-start justify-center gap-6 flex-wrap">
          <div className="w-full max-w-sm">
            <Card glow>
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-400)" }}>
                  Event snapshot
                </div>
                <LiveDot />
              </div>
              <div className="mt-3">
                <div className="text-base font-bold" style={{ color: "var(--navy)" }}>{DEMO_EVENT.title}</div>
                <div className="text-xs" style={{ color: "var(--slate-600)" }}>{DEMO_EVENT.school} · {DEMO_EVENT.date}</div>
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
                Every event action — contributions, payouts, refunds — is hash-chained end to end.
                Immutable. Auditable. Disputable in court.
              </div>
              <hr className="my-4" style={{ borderColor: "var(--slate-100)" }} />
              <div className="hash-mono text-xs" style={{ color: "var(--slate-400)" }}>
                Head hash · {headHash.slice(0, 24)}…
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="flex-1 min-w-[280px] max-w-lg">
            <Card>
              <div className="grid grid-cols-2 gap-6">
                <Stat label="Target" value={formatNaira(DEMO_EVENT.targetNaira)} sub={`${DEMO_EVENT.expectedHeadcount} contributors`} />
                <Stat label="Raised" value={formatNaira(totals.raised)} sub={`${pct}% of goal`} accent />
                <Stat label="Outstanding" value={formatNaira(totals.outstanding)} sub={`${DEMO_EVENT.lineItems.length} line items`} />
                <Stat label="Vendors AI-matched" value={`${VENDORS.length}`} sub="3 categories" />
              </div>
            </Card>
            <div className="mt-4 flex gap-3">
              <Link
                href="/contribute/class-of-27"
                className="flex-1 text-center rounded-full px-4 py-3 text-sm font-semibold text-white"
                style={{ background: "var(--brand)" }}
              >
                Pay with OPay →
              </Link>
              <Link
                href="/vendors/class-of-27"
                className="flex-1 text-center rounded-full px-4 py-3 text-sm font-semibold"
                style={{ background: "white", color: "var(--navy)", border: "1px solid var(--slate-200)" }}
              >
                Match a vendor →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY OPay IS THE SPINE ─── */}
      <section className="mx-auto max-w-6xl px-6 mt-16">
        <Card className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
               style={{ background: "var(--brand-soft)", color: "var(--brand-deep)" }}>
            Strategic moat
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight" style={{ color: "var(--navy)" }}>
            Why OPay is the non-negotiable spine
          </h2>
          <div className="mt-6 max-w-2xl mx-auto grid md:grid-cols-3 gap-6 text-left">
            <div className="text-sm leading-relaxed" style={{ color: "var(--slate-600)" }}>
              <div className="font-bold text-base" style={{ color: "var(--navy)" }}>1. OPay moves every naira</div>
              <p className="mt-1">Contributions, vendor deposits, and refunds all flow through OPay Wallet. No off-rail cash, no parallel ledgers.</p>
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "var(--slate-600)" }}>
              <div className="font-bold text-base" style={{ color: "var(--navy)" }}>2. Trust Ledger ties to OPay refs</div>
              <p className="mt-1">Each ledger entry records the OPay transaction ID. Swapping OPay breaks the chain — the hash proof is anchored to OPay's payment trail.</p>
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "var(--slate-600)" }}>
              <div className="font-bold text-base" style={{ color: "var(--navy)" }}>3. Parents already have OPay</div>
              <p className="mt-1">OPay has over 40M users in Nigeria. No new onboarding — parents just tap and pay.</p>
            </div>
          </div>
        </Card>
      </section>

      {/* ─── SOCIAL IMPACT ─── */}
      <section className="mx-auto max-w-6xl px-6 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
               style={{ background: "var(--ember-soft)", color: "var(--ember)" }}>
            Social impact
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight" style={{ color: "var(--navy)" }}>
            Built for scale, built for Nigeria
          </h2>
        </div>
        <div className="mt-8 grid md:grid-cols-4 gap-5">
          <ImpactStat number="47M+" label="Nigerian students" sub="potential beneficiaries" />
          <ImpactStat number="₦1.2B+" label="lost annually" sub="to cash-based disputes" />
          <ImpactStat number="3" label="SDG targets" sub="Quality education, decent work, reduced inequality" />
          <ImpactStat number="0" label="bank account needed" sub="OPay Wallet is enough" />
        </div>
      </section>

      {/* ─── SECTOR FIT ─── */}
      <section className="mx-auto max-w-6xl px-6 mt-12 text-center">
        <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--slate-400)" }}>
          Triple-fit for the Innovation Challenge
        </div>
        <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs hash-mono" style={{ color: "var(--slate-600)" }}>
          <Pill>Fintech & Digital Payments</Pill>
          <Pill>AI for Social Good</Pill>
          <Pill>Digital Tools for SMEs</Pill>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="mx-auto max-w-6xl px-6 mt-16 mb-20">
        <Card glow className="text-center">
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--navy)" }}>
            Your innovation journey starts here
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--slate-600)" }}>
            Walk through the full flow — contribute on OPay, inspect the Trust Ledger, and let AI match a vendor.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contribute/class-of-27"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{ background: "var(--brand)" }}
            >
              Pay with OPay
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/event/class-of-27"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              style={{ background: "white", color: "var(--navy)", border: "1px solid var(--slate-200)" }}
            >
              Organiser dashboard
            </Link>
            <Link
              href="/ledger/class-of-27"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              style={{ background: "white", color: "var(--navy)", border: "1px solid var(--slate-200)" }}
            >
              View Trust Ledger
            </Link>
          </div>
        </Card>
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

function Feature({ title, body, tag, hero = false, emoji }: { title: string; body: string; tag: string; hero?: boolean; emoji?: string }) {
  return (
    <Card glow={hero}>
      {emoji && <div className="text-2xl mb-2">{emoji}</div>}
      <div className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide" style={{ background: hero ? "var(--ember-soft)" : "var(--slate-50)", color: hero ? "var(--ember)" : "var(--slate-600)" }}>
        {tag}
      </div>
      <div className="mt-3 text-lg font-bold tracking-tight" style={{ color: "var(--navy)" }}>{title}</div>
      <div className="mt-2 text-sm leading-relaxed" style={{ color: "var(--slate-600)" }}>{body}</div>
    </Card>
  );
}

function ImpactStat({ number, label, sub }: { number: string; label: string; sub: string }) {
  return (
    <Card className="text-center">
      <div className="text-3xl font-bold hash-mono" style={{ color: "var(--brand-deep)" }}>{number}</div>
      <div className="mt-1 text-sm font-semibold" style={{ color: "var(--navy)" }}>{label}</div>
      <div className="mt-0.5 text-xs" style={{ color: "var(--slate-400)" }}>{sub}</div>
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
