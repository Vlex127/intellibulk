export function TrustSeal() {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
      style={{ background: "var(--brand-soft)", color: "var(--brand-deep)" }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden fill="none">
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" stroke="#068a47" strokeWidth="2" />
        <path d="M9 12.5l2 2 4-4" stroke="#068a47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
     </svg>
      Trust Ledger verified · sha256
   </div>
  );
}

export function LiveDot() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--brand-deep)" }}>
      <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: "var(--brand)" }} />
      Live
   </span>
  );
}

export function Card({
  children,
  className = "",
  pad = true,
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  pad?: boolean;
  glow?: boolean;
}) {
  return (
    <div
      className={`bg-white ${pad ? "p-6" : ""} ${className}`}
      style={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--slate-100)",
        boxShadow: glow ? "var(--shadow-lift)" : "var(--shadow-card)",
      }}
    >
      {children}
   </div>
  );
}
