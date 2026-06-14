"use client";

import { shortHash } from "@/lib/ledger";

export function HashBadge({ hash, label }: { hash: string; label?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs hash-mono"
      style={{ background: "var(--brand-soft)", color: "var(--brand-deep)" }}
      title={hash}
    >
      <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand)" }} />
      {label ?? shortHash(hash)}
   </span>
  );
}

export function HashBlock({ hash, label }: { hash: string; label?: string }) {
  return (
    <div className="rounded-md px-2.5 py-1.5 hash-mono text-[11px] leading-tight" style={{ background: "var(--brand-soft)", color: "var(--brand-deep)" }}>
      <div className="text-[9px] uppercase tracking-wide opacity-70 mb-0.5">{label ?? "block hash"}</div>
      <div>{shortHash(hash)}</div>
   </div>
  );
}
