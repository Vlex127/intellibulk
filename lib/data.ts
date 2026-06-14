// IntelliBulk demo data seed. Single canonical event used by all four pages.
// Replace with real DB queries in production bootcamp build.

import { append, ledgerIsSeeded, markSeeded } from "@/lib/ledger";

export type LineItem = { id: string; label: string; amount: number };

export type OrganiserEvent = {
  id: string;
  title: string;
  subtitle: string;
  organiserName: string;
  school: string;
  cohort: string;
  date: string;
  targetNaira: number;
  expectedHeadcount: number;
  lineItems: LineItem[];
};

export type Vendor = {
  id: string;
  name: string;
  category: "bus" | "hostel" | "catering";
  capacity: number;
  historyFit: number;       // 0..1 base history fit (used by stub)
  pricePerUnit: number;     // abstract units of price
  rating: number;
  completedEvents: number;
  city: string;
  emoji: string;
  blurb: string;
};

export const DEMO_EVENT: OrganiserEvent = {
  id: "class-of-27",
  title: "Class of '27 Excursion",
  subtitle: "Lagos → Calabar beach retreat · 5 days, 4 nights",
  organiserName: "Mrs. A. Okafor",
  school: "Government College Calabar",
  cohort: "Graduating Class of 2026",
  date: "Aug 14 – 18, 2026",
  targetNaira: 500_000,
  expectedHeadcount: 47,
  lineItems: [
    { id: "li-bus", label: "Bus (round-trip, AC)", amount: 250_000 },
    { id: "li-lodging", label: "Lodging (4 nights)", amount: 180_000 },
    { id: "li-feeding", label: "Feeding & water", amount: 40_000 },
    { id: "li-materials", label: "Materials & first-aid", amount: 30_000 },
  ],
};

export const VENDORS: Vendor[] = [
  {
    id: "ven-sunshine",
    name: "Sunshine Tours Ltd.",
    category: "bus",
    capacity: 60,
    historyFit: 0.95,
    pricePerUnit: 1.0,        // fair — at premium threshold
    rating: 4.8,
    completedEvents: 142,
    city: "Lagos",
    emoji: "🚌",
    blurb: "Premium AC coaches. Coast-to-coast licensed. Insurance on every trip.",
  },
  {
    id: "ven-rest",
    name: "RestEasy Hostel",
    category: "hostel",
    capacity: 80,
    historyFit: 0.82,
    pricePerUnit: 0.78,
    rating: 4.5,
    completedEvents: 64,
    city: "Calabar",
    emoji: "🏨",
    blurb: "Bunk + ensuite blocks. Catering optional. Within 5 min of Marina resort.",
  },
  {
    id: "ven-savoury",
    name: "Savoury Catering",
    category: "catering",
    capacity: 120,
    historyFit: 0.9,
    pricePerUnit: 0.88,
    rating: 4.7,
    completedEvents: 89,
    city: "Cross River",
    emoji: "🍲",
    blurb: "Mama-put style menu. Three meals a day. Halal + vegetarian options.",
  },
];

export const DEMO_PARENTS: { id: string; name: string; paid: number; status: "paid" | "partial" | "outstanding" }[] = [
  { id: "par-001", name: "Engr. Bola Okeke",     paid: 15_000, status: "paid" },
  { id: "par-002", name: "Mrs. Funke Adeyemi",   paid: 15_000, status: "paid" },
  { id: "par-003", name: "Mr. Chidi Eze",        paid: 10_000, status: "partial" },
  { id: "par-004", name: "Mrs. Ngozi Eze",       paid:  5_000, status: "partial" },
  { id: "par-005", name: "Mr. Tunde Bello",      paid:  0,     status: "outstanding" },
  { id: "par-006", name: "Mrs. Bisi Lawal",      paid:  0,     status: "outstanding" },
];

export function seedLedgerIfNeeded(): void {
  if (ledgerIsSeeded()) return;
  append({ kind: "creation", amount: 0, actor: "system", ref: "EVT-CLASS-OF-27", meta: { eventId: DEMO_EVENT.id, title: DEMO_EVENT.title } });
  for (const parent of DEMO_PARENTS.filter((p) => p.paid > 0)) {
    append({ kind: "contribution", amount: parent.paid, actor: parent.name, ref: `PAR-${parent.id.slice(-3).toUpperCase()}-PAY`, meta: { parentId: parent.id, channel: "OPay Wallet" } });
  }
  markSeeded();
}

// Convenience: derived aggregated state.
export function eventTotals(): { raised: number; outstanding: number; payout: number } {
  // Raised = sum of all contribution amounts seeded.
  let raised = 0;
  for (const p of DEMO_PARENTS) raised += p.paid;
  const outstanding = DEMO_EVENT.targetNaira - raised;
  return { raised, outstanding, payout: 0 };
}

export function formatNaira(n: number): string {
  return "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });
}
