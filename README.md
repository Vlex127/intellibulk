# IntelliBulk — OPay-native Group Commerce for Nigerian Schools

**IntelliBulk** is a submission for the **OPay Innovation Challenge 2026**. It replaces the broken cash-envelope system for Nigerian school events (excursions, trips, outings) with OPay-powered contributions, an immutable SHA256 Trust Ledger, and AI-driven vendor matching.

![IntelliBulk Preview](public/preview.png)

## Categories entered

- **Fintech & Digital Payments** — every naira moves through OPay Wallet; swapping OPay breaks the hash chain
- **AI & Automation for Social Good** — Predictive Vendor Matching algorithm ranks vendors by capacity, history, and price
- **Digital Tools for SMEs & Informal Sector** — digitises cash-based group commerce for schools and community organisers

## The Problem

- 47M+ Nigerian students participate in school events paid for in cash
- ₦1.2B+ is lost annually to cash-based disputes with no audit trail
- Vendors (bus, catering, lodging) are picked by word-of-mouth with no data-driven matching
- Parents, organisers, and vendors all see different records of who paid what

## The Solution

IntelliBulk delivers three integrated innovations:

| Feature | What it does |
|---------|-------------|
| **OPay-native contributions** | Parents pay via OPay Wallet. One tap, instant receipt, 24h refundable. |
| **Trust Ledger** | SHA256 hash-chained record of every event action. Immutable. Auditable. Tamper-proof. |
| **AI Vendor Matching** | Algorithm scores vendors on capacity, history, and price fit. No more blind referrals. |

## Architecture

```
app/
├── page.tsx              ─ landing page (problem → solution → impact narrative)
├── event/[id]/page.tsx   ─ organiser dashboard with capital pipeline + roster
├── contribute/[id]       ─ parent payment flow
├── ledger/[id]           ─ full Trust Ledger viewer
├── vendors/[id]          ─ AI vendor matching with score breakdown
└── api/
    ├── opay/pay          ─ simulated OPay contribution
    ├── opay/refund       ─ parent refund flow
    ├── opay/payout       ─ vendor payout
    └── vendors/match     ─ predictive vendor ranking

lib/
├── ledger.ts             ─ append-only SHA256 hash chain
├── opay.ts               ─ OPay SDK polyfill
├── matcher.ts            ─ Predictive Matching Loop (v1)
└── data.ts               ─ demo data seed

components/
├── Brand.tsx             ─ TrustSeal, LiveDot, Card
├── OpayModal.tsx         ─ OPay Wallet modal (review → PIN → processing → success)
├── ContributeForm.tsx    ─ parent contribution form
├── HashBadge.tsx         ─ hash display + copy
└── RefundButton.tsx      ─ parent refund trigger
```

## Tech Stack

- **Next.js 16** (App Router) with React 19
- **TypeScript 5**
- **Tailwind CSS v4** — custom design tokens (OPay green, warm ember accent)
- **Node crypto** — real SHA256 hashing for Trust Ledger
- **In-memory state** — resets on server restart (swap for real DB in production)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Try these flows:

1. **Pay with OPay** → `/contribute/class-of-27` — walk through the OPay modal (review → PIN → processing → success + receipt + SMS notification)
2. **Organiser dashboard** → `/event/class-of-27` — see capital pipeline, parent roster, refund a parent
3. **Trust Ledger** → `/ledger/class-of-27` — inspect the hash chain, verify integrity
4. **Vendor matching** → `/vendors/class-of-27` — let AI pick the best bus company

## PWA

IntelliBulk is installable as a Progressive Web App. On supported browsers, use "Add to Home Screen" for an app-like experience.

## Built for the OPay Innovation Challenge

This project was built as a submission for the OPay Innovation Challenge 2026 by a team of Nigerian undergraduates. It demonstrates how OPay's infrastructure can power transparent, auditable, and AI-enhanced group commerce for Nigeria's education sector.
