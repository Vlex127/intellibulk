import { NextResponse } from "next/server";
import { append } from "@/lib/ledger";
import { opayClient } from "@/lib/opay";

// POST /api/opay/payout   body: { amount, recipientName, memo, eventId }
export async function POST(req: Request) {
  let body: { amount: number; recipientName?: string; memo?: string; eventId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const amount = Number(body?.amount);
  const recipientName = String(body?.recipientName ?? "Vendor");
  const memo = String(body?.memo ?? "Vendor payout");
  const eventId = String(body?.eventId ?? "EVT");

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "amount must be > 0" }, { status: 400 });
  }

  const result = await opayClient.payout({ amount, currency: "NGN", ref: `OUT-${Date.now().toString(36).toUpperCase()}`, recipientName, memo });
  if (result.status !== "success") {
    return NextResponse.json(result, { status: 402 });
  }

  const slug = recipientName.split(/\s+/)[0]?.slice(0, 8).toUpperCase().replace(/[^A-Z0-9]/g, "") ?? "VEND";
  const ref = `VEN-${slug}-${result.txId.slice(-4)}`;
  const entry = append({
    kind: "payout",
    amount,
    actor: recipientName,
    ref,
    meta: { eventId, txId: result.txId, channel: "OPay Payout", memo },
  });

  return NextResponse.json({
    status: "success",
    txId: result.txId,
    ledgerEntry: entry,
  });
}
