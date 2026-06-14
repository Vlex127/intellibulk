import { NextResponse } from "next/server";
import { DEMO_EVENT, eventTotals } from "@/lib/data";

// GET /api/event/[id]
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (id !== DEMO_EVENT.id) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ event: DEMO_EVENT, totals: eventTotals() });
}
