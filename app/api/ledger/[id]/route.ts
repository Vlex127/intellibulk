import { NextResponse } from "next/server";
import { list, verify } from "@/lib/ledger";

// GET /api/ledger/[id]
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  await ctx.params; // reserved for future per-event scoping
  const entries = list();
  const v = verify();
  return NextResponse.json({
    ok: v.ok,
    count: v.ok ? v.count : null,
    brokenAt: v.ok ? null : v.brokenAt,
    entries,
  });
}
