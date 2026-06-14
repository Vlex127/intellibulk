// IntelliBulk Trust Ledger — append-only, hash-chained.
// Real cryptographic chain (sha256). Visible "block N → block N+1" relationship.
// In-memory state shared across the dev server via globalThis (resets on full restart).

import { createHash } from "node:crypto";

export type LedgerKind = "contribution" | "payout" | "creation" | "match";

export type LedgerEntry = {
  index: number;            // 0, 1, 2 ... (0 = genesis)
  timestamp: string;        // ISO
  kind: LedgerKind;
  amount: number;           // NGN, in kobo-units split: we store naira (decimal)
  currency: "NGN";
  actor: string;            // e.g. parent name or vendor name or "system"
  ref: string;              // human ref e.g. "PAR-001" or "VEN-Sunshine-50%"
  prevHash: string;         // hex sha256 of previous entry, or "0".repeat(64) for genesis
  hash: string;             // hex sha256 of (prevHash + payload)
  meta?: Record<string, unknown>;
};

type State = {
  entries: LedgerEntry[];
  seeded: boolean;
};

const GLOBAL_KEY = "__INTELLIBULK_LEDGER__";
type GlobalWithLedger = typeof globalThis & { [GLOBAL_KEY]?: State };
const g = globalThis as GlobalWithLedger;
if (!g[GLOBAL_KEY]) g[GLOBAL_KEY] = { entries: [], seeded: false };

function getState(): State {
  return g[GLOBAL_KEY] as State;
}

function payloadDigest(input: { timestamp: string; kind: LedgerKind; amount: number; actor: string; ref: string; meta?: Record<string, unknown> }): string {
  // Canonical string for hashing. Order matters.
  const metaStr = input.meta ? JSON.stringify(input.meta, Object.keys(input.meta).sort()) : "";
  return [input.timestamp, input.kind, input.amount.toFixed(2), input.actor, input.ref, metaStr].join("|");
}

function computeHash(prevHash: string, payloadCanonical: string): string {
  return createHash("sha256").update(prevHash + "|" + payloadCanonical).digest("hex");
}

const GENESIS_PREV = "0".repeat(64);

export function append(input: {
  kind: LedgerKind;
  amount: number;
  actor: string;
  ref: string;
  meta?: Record<string, unknown>;
}): LedgerEntry {
  const state = getState();
  const index = state.entries.length;
  const timestamp = new Date().toISOString();
  const prevHash = index === 0 ? GENESIS_PREV : state.entries[index - 1].hash;
  const payloadCanonical = payloadDigest({ timestamp, kind: input.kind, amount: input.amount, actor: input.actor, ref: input.ref, meta: input.meta });
  const hash = computeHash(prevHash, payloadCanonical);
  const entry: LedgerEntry = {
    index,
    timestamp,
    kind: input.kind,
    amount: input.amount,
    currency: "NGN",
    actor: input.actor,
    ref: input.ref,
    prevHash,
    hash,
    meta: input.meta,
  };
  state.entries.push(entry);
  return entry;
}

export function list(): LedgerEntry[] {
  return [...getState().entries];
}

export function ledgerIsSeeded(): boolean {
  return getState().seeded;
}

export function markSeeded(): void {
  getState().seeded = true;
}

export function verify(): { ok: true; count: number } | { ok: false; brokenAt: number } {
  const entries = getState().entries;
  let prevHash = GENESIS_PREV;
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    const payloadCanonical = payloadDigest({ timestamp: e.timestamp, kind: e.kind, amount: e.amount, actor: e.actor, ref: e.ref, meta: e.meta });
    const expected = computeHash(prevHash, payloadCanonical);
    if (e.prevHash !== prevHash || e.hash !== expected) {
      return { ok: false, brokenAt: i };
    }
    prevHash = e.hash;
  }
  return { ok: true, count: entries.length };
}

export function shortHash(h: string): string {
  return h.length > 14 ? `${h.slice(0, 6)}…${h.slice(-4)}` : h;
}
