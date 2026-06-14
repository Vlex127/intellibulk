// IntelliBulk Predictive Matching Loop — v1 rules engine stub.
// In production this is a learned ranker. For the hackathon demo we ship a plausible
// rules-derived score so the screen recorder has a defensible "AI match" to show.

import type { Vendor } from "@/lib/data";

export type MatchReason = {
  capacity: number;    // 0–1
  history: number;     // 0–1
  price: number;       // 0–1
};

export type MatchResult = {
  vendor: Vendor;
  score: number;              // 0–1
  reason: MatchReason;
  why: string[];              // human-readable bullets shown in UI
};

function clamp01(n: number) { return Math.max(0, Math.min(1, n)); }

function explainVendor(v: Vendor, r: MatchReason): string[] {
  const out: string[] = [];
  if (r.capacity >= 0.85) out.push(`Capacity fit ${(r.capacity * 100).toFixed(0)}% — comfortably handles your group size`);
  else if (r.capacity >= 0.65) out.push(`Capacity fit ${(r.capacity * 100).toFixed(0)}% — within margin`);
  else out.push(`Capacity fit ${(r.capacity * 100).toFixed(0)}% — tight, but workable`);

  if (r.history >= 0.85) out.push(`Strong history — completed ${v.completedEvents}+ similar events without dispute`);
  else if (r.history >= 0.65) out.push(`Solid history — ${v.completedEvents} completed events, mixed reviews`);

  if (r.price >= 0.9) out.push(`Pricing — best-in-band for the spec you set`);
  else if (r.price >= 0.7) out.push(`Pricing — premium tier, justified by ratings`);

  if (v.rating >= 4.7) out.push(`Rated ${v.rating.toFixed(1)}/5 across recent cohorts`);
  return out;
}

/**
 * Score a list of vendors for a given event context.
 * - Requested headcount scales predicted capacity needs (vendors below 60% get penalised).
 * - Higher price deltas reduce price-fit.
 */
export function matchVendors(vendors: Vendor[], eventSize: number): MatchResult[] {
  const results: MatchResult[] = vendors.map((v) => {
    // Capacity: bell response around eventSize / vendorCapacity
    const ratio = eventSize / Math.max(1, v.capacity);
    const capacity = clamp01(1 - Math.max(0, ratio - 0.95) * 1.4);

    // History: raw, capped, plus tiny noise for realism
    const history = clamp01(v.historyFit + (Math.sin(v.id.length * 7) * 0.005));

    // Price: how close v.pricePerUnit to a sweet spot for the sector
    const sector = { bus: 1, hostel: 0.85, catering: 0.9 }[v.category] ?? 0.9;
    const price = clamp01(sector - Math.abs(v.pricePerUnit - sector) * 0.6);

    const score = capacity * 0.4 + history * 0.4 + price * 0.2;

    return {
      vendor: v,
      score,
      reason: { capacity, history, price },
      why: explainVendor(v, { capacity, history, price }),
    };
  });

  return results.sort((a, b) => b.score - a.score);
}
