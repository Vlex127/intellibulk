import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IntelliBulk — Intelligence. Community. Scale.",
  description:
    "AI-powered group commerce and predictive logistics for community events. OPay-native event operations.",
};

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
            <Mark />
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
          <div className="mx-auto max-w-6xl px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm" style={{ color: "var(--slate-600)" }}>
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-7 h-7 rounded-lg text-white text-xs font-black" style={{ background: "var(--brand)" }}>iB</span>
              <span>© 2026 IntelliBulk · Intelligence. Community. Scale</span>
           </div>
            <div className="flex items-center gap-3 hash-mono text-xs">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full live-dot" style={{ background: "var(--brand)" }} />
                Trust Ledger · live
             </span>
           </div>
         </div>
       </footer>
     </body>
   </html>
  );
}
