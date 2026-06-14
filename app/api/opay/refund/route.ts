import { NextResponse } from "next/server";
import { append } from "@/lib/ledger";
import { opayClient } from "@/lib/opay";

export async function POST(req: Request) {
  let body: { amount: number; parentName?: string; reason?: string; eventId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const amount = Number(body?.amount);
  const parentName = String(body?.parentName ?? "Parent");
  const reason = String(body?.reason ?? "Refund requested");
  const eventId = String(body?.eventId ?? "EVT");

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "amount must be > 0" }, { status: 400 });
  }
  if (amount > 5_000_000) {
    return NextResponse.json({ error: "amount exceeds demo cap" }, { status: 400 });
  }

  const result = await opayClient.payout({ amount, currency: "NGN", ref: `REF-${Date.now().toString(36).toUpperCase()}`, recipientName: parentName, memo: reason });
  if (result.status !== "success") {
    return NextResponse.json(result, { status: 402 });
  }

  const slug = parentName.split(/\s+/)[0]?.slice(0, 8).toUpperCase().replace(/[^A-Z0-9]/g, "") ?? "PRNT";
  const ref = `REF-${slug}-${result.txId.slice(-4)}`;
  const entry = append({
    kind: "refund",
    amount,
    actor: parentName,
    ref,
    meta: { eventId, txId: result.txId, channel: "OPay Wallet", reason },
  });

  return NextResponse.json({
    status: "success",
    txId: result.txId,
    ledgerEntry: entry,
  });
}
