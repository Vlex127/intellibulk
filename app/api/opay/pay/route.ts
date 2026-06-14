import { NextResponse } from "next/server";
import { append } from "@/lib/ledger";
import { opayClient } from "@/lib/opay";

// POST /api/opay/pay   body: { amount, recipient, description, payerName, payerEmail, eventId }
// Calls the real OPay SDK shape (here: polyfill) and appends a contribution to the Trust Ledger.
export async function POST(req: Request) {
  let body: { amount: number; recipient?: string; description?: string; payerName?: string; payerEmail?: string; eventId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const amount = Number(body?.amount);
  const payerName = String(body?.payerName ?? "Anonymous Parent");
  const payerEmail = body?.payerEmail;
  const recipient = String(body?.recipient ?? "IntelliBulk event");
  const description = String(body?.description ?? "");
  const eventId = body?.eventId ? String(body.eventId) : undefined;

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "amount must be > 0" }, { status: 400 });
  }
  if (amount > 5_000_000) {
    return NextResponse.json({ error: "amount exceeds demo cap" }, { status: 400 });
  }

  const result = await opayClient.pay({ amount, currency: "NGN", ref: `OP-${Date.now().toString(36).toUpperCase()}`, description, customerName: payerName });
  if (result.status !== "success") {
    return NextResponse.json(result, { status: 402 });
  }

  const ref = `PAR-${payerName.split(/\s+/)[0]?.slice(0, 3).toUpperCase() ?? "PAY"}-${result.txId.slice(-4)}`;
  const meta: Record<string, unknown> = {
    recipient,
    txId: result.txId,
    channel: "OPay Wallet",
    description,
  };
  if (eventId) meta.eventId = eventId;
  if (payerEmail) meta.payerEmail = payerEmail;
  const entry = append({
    kind: "contribution",
    amount,
    actor: payerName,
    ref,
    meta,
  });

  return NextResponse.json({
    status: "success",
    txId: result.txId,
    ledgerEntry: entry,
  });
}
