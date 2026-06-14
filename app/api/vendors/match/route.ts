import { NextResponse } from "next/server";
import { VENDORS } from "@/lib/data";
import { matchVendors } from "@/lib/matcher";

// POST /api/vendors/match   body: { eventId, headcount }
export async function POST(req: Request) {
  let body: { eventId?: string; headcount?: number };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const headcount = Math.max(1, Math.floor(Number(body?.headcount ?? 47)));
  const ranked = matchVendors(VENDORS, headcount).map((r) => ({
    id: r.vendor.id,
    name: r.vendor.name,
    emoji: r.vendor.emoji,
    blurb: r.vendor.blurb,
    score: r.score,
    reasons: r.why,
    category: r.vendor.category,
  }));
  return NextResponse.json({ ranked });
}
