import { NextResponse } from "next/server";
import { append } from "@/lib/ledger";
import { opayClient } from "@/lib/opay";

// POST /api/opay/pay   body: { amount, recipient, description, payerName }
// Calls the real OPay SDK shape (here: polyfill) and appends a contribution to the Trust Ledger.
export async function POST(req: Request) {
  let body: { amount: number; recipient?: string; description?: string; payerName?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const amount = Number(body?.amount);
  const payerName = String(body?.payerName ?? "Anonymous Parent");
  const recipient = String(body?.recipient ?? "IntelliBulk event");
  const description = String(body?.description ?? "");

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
  const entry = append({
    kind: "contribution",
    amount,
    actor: payerName,
    ref,
    meta: {
      recipient,
      txId: result.txId,
      channel: "OPay Wallet",
      description,
    },
  });

  return NextResponse.json({
    status: "success",
    txId: result.txId,
    ledgerEntry: entry,
  });
}
