// IntelliBulk → OPay polyfill.
// Same shape as a real OPay wallet integration (`opayClient.pay`, `opayClient.payout`).
// When real OPay sandbox keys arrive, swap the body of these functions; the interface stays.

// In development we simulate network latency so the demo feels real.
const SIMULATED_LATENCY_MS = 1100;
const FAILURE_RATE = 0; // 0% in demo mode; can flip to 0.05 to demo error handling.

export type PayArgs = {
  amount: number;         // NGN, decimal
  currency: "NGN";
  ref: string;            // ledger ref, e.g. "PAR-007"
  description?: string;
  customerName?: string;
};

export type PayResult = {
  status: "success" | "failed";
  txId: string;
  timestamp: string;
  amount: number;
  currency: "NGN";
  channel: "OPay Wallet";
  errorCode?: string;
};

function rid(): string {
  return "OP" + Math.random().toString(36).slice(2, 10).toUpperCase();
}

export const opayClient = {
  async pay(args: PayArgs): Promise<PayResult> {
    await new Promise((r) => setTimeout(r, SIMULATED_LATENCY_MS));
    if (Math.random() < FAILURE_RATE) {
      return { status: "failed", txId: rid(), timestamp: new Date().toISOString(), amount: args.amount, currency: "NGN", channel: "OPay Wallet", errorCode: "INSUFFICIENT_FUNDS" };
    }
    return { status: "success", txId: rid(), timestamp: new Date().toISOString(), amount: args.amount, currency: "NGN", channel: "OPay Wallet" };
  },
  async payout(args: { amount: number; currency: "NGN"; ref: string; recipientName: string; memo?: string; }): Promise<PayResult> {
    return this.pay({ ...args, description: args.memo });
  },
};

// OPay brand-faithful modal accent colour. Tuned to match public OPay wallets.
export const OPAY_GREEN = "#0bbe62";
export const OPAY_DEEP = "#068a47";
