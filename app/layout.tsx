import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "IntelliBulk — OPay-powered group commerce for Nigerian schools",
  description:
    "Millions lost to cash-based school events. IntelliBulk replaces cash envelopes with OPay-powered contributions, an immutable Trust Ledger, and AI vendor matching. Built for the OPay Innovation Challenge 2026.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "IntelliBulk",
  },
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

function Mark() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <span
        aria-hidden
        className="grid place-items-center w-9 h-9 rounded-xl text-white font-black text-base"
        style={{ background: "var(--brand)" }}
      >
        iB
      </span>
      <span className="font-semibold tracking-tight text-[15px]" style={{ color: "var(--navy)" }}>
        IntelliBulk
      </span>
    </Link>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: "var(--background)" }}>
        <header
          className="sticky top-0 z-30 border-b"
          style={{ background: "rgba(250, 250, 247, 0.85)", borderColor: "var(--slate-100)", backdropFilter: "blur(10px)" }}
        >
          <div className="mx-auto w-full max-w-6xl px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Mark />
                <a
                  href="https://opay-inc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide"
                  style={{ background: "var(--brand-soft)", color: "var(--brand-deep)" }}
                >
                  <span className="grid place-items-center w-3.5 h-3.5 rounded text-white text-[7px] font-black" style={{ background: "var(--brand)" }}>O</span>
                  Innovation Challenge 2026
                </a>
              </div>
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium" style={{ color: "var(--slate-600)" }}>
              <Link href="/event/class-of-27" className="hover:text-[color:var(--navy)]">Demo event</Link>
              <Link href="/ledger/class-of-27" className="hover:text-[color:var(--navy)]">Trust Ledger</Link>
              <Link href="/vendors/class-of-27" className="hover:text-[color:var(--navy)]">Vendors</Link>
              <Link
                href="/contribute/class-of-27"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white text-sm font-semibold transition hover:opacity-90"
                style={{ background: "var(--brand)" }}
              >
                Pay with OPay
                <span aria-hidden>→</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t mt-16" style={{ borderColor: "var(--slate-100)" }}>
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="grid md:grid-cols-4 gap-8 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="grid place-items-center w-7 h-7 rounded-lg text-white text-xs font-black" style={{ background: "var(--brand)" }}>iB</span>
                  <span className="font-semibold" style={{ color: "var(--navy)" }}>IntelliBulk</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--slate-600)" }}>
                  OPay-native group commerce for Nigerian schools. Built by undergraduates for the OPay Innovation Challenge 2026.
                </p>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "var(--slate-400)" }}>Product</div>
                <div className="flex flex-col gap-2">
                  <Link href="/event/class-of-27" className="hover:text-[color:var(--brand-deep)]" style={{ color: "var(--slate-600)" }}>Dashboard</Link>
                  <Link href="/contribute/class-of-27" className="hover:text-[color:var(--brand-deep)]" style={{ color: "var(--slate-600)" }}>Contribute</Link>
                  <Link href="/vendors/class-of-27" className="hover:text-[color:var(--brand-deep)]" style={{ color: "var(--slate-600)" }}>Vendor matching</Link>
                  <Link href="/ledger/class-of-27" className="hover:text-[color:var(--brand-deep)]" style={{ color: "var(--slate-600)" }}>Trust Ledger</Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "var(--slate-400)" }}>Why OPay</div>
                <div className="flex flex-col gap-2 text-xs leading-relaxed" style={{ color: "var(--slate-600)" }}>
                  <span>Every naira moves through OPay Wallet</span>
                  <span>Trust Ledger seals each transaction with SHA256</span>
                  <span>No cash envelopes, no disputes</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "var(--slate-400)" }}>Innovation Challenge</div>
                <div className="flex flex-col gap-2 text-xs" style={{ color: "var(--slate-600)" }}>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="grid place-items-center w-5 h-5 rounded text-white text-[9px] font-black" style={{ background: "var(--brand)" }}>O</span>
                    OPay Innovation Challenge 2026
                  </span>
                  <span>Fintech × AI for Social Good</span>
                  <a
                    href="https://opay-inc.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[color:var(--brand-deep)]"
                  >
                    Learn more about OPay →
                  </a>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: "var(--brand)" }} />
                    Trust Ledger verified
                  </span>
                </div>
              </div>
            </div>
            <hr className="my-6" style={{ borderColor: "var(--slate-100)" }} />
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs" style={{ color: "var(--slate-600)" }}>
              <span>© 2026 IntelliBulk · OPay Innovation Challenge 2026</span>
              <span className="hash-mono">sha256 · {Array(8).fill(0).map(() => Math.random().toString(16).slice(2, 4)).join("")}</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
