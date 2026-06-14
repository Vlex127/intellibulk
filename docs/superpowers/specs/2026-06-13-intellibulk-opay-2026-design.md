# IntelliBulk OPay Innovation Challenge 2026 — Design Spec

**Date:** 2026-06-13
**Author:** IntelliBulk team
**Status:** Approved (Option 2 — Show, don't tell)
**Deadline:** 2026-06-14 (24 hours from this writing)

---

## 1. Context

### 1.1 The challenge

- Provider: OPay (in partnership with Google)
- Track: National tech competition for Nigerian undergraduates
- Award pool: Up to ~₦19.2M; first place ₦10M project grant + ₦300k scholarship
- Application deadline: **14 June 2026**, opens on 25 May 2026
- Submission format: PDF / JPEG / MP4, ≤10 MB
- Submission requires: application form + proposal + academic transcripts + team details
- Eligibility: Nigerian undergraduates, teams of ~5, CGPA ≥ 3.5/5.0 (uni) or 2.8/4.0 (poly/CE), demonstrated AI-assisted design literacy (Canva/Gemini workflow)
- Path-to-win: Application → shortlist (~48 teams, June) → 6-week bootcamp (Aug–Sept) → Grand Finale pitch (6 Nov 2026)
- Submissions will be screened; judges emphasise simple useful solutions tied to a named sector; balanced teams; clear AI workflow.

### 1.2 The product (IntelliBulk)

AI-powered group-commerce + predictive logistics platform for community events (school trips, weddings, family outings). MVP pillars:
- One integrated hub for end-to-end event setup
- Verified vendors + secure payment processing
- Real-time capital pipeline tracker (live payment visibility)
- Automated participant rosters + task management
- Predictive Matching Loop (vendor AI): capacity forecasts, micro-inflation pricing, demand modelling

### 1.3 Strategic thesis

IntelliBulk fits three of the seven enumerated sectors at once — **fintech**, **AI for social good**, and **digital tools for SMEs**. We will lead with the **OPay-native financial layer** angle: every contribution, vendor payout, and refund flows through OPay, with Trust Ledger (a hash-chained, immutable receipt store) as the solo novelty that prevents anyone from swapping OPay for another rail. AI does the matching in the background; OPay is the spine.

---

## 2. Strategic decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Lead narrative angle | **OPay-native financial layer** | Aligns with OPay's own domain; hardest to substitute; Trust Ledger is solo-differentiated |
| Deliverable format | **Cinematic demo video (hero) + 6-page proposal (support)** | "Show, don't tell" — recall + emotional carry beat feature docs |
| AI workflow story | **"Designed with Gemini, deck+UI in Canva animation, code scaffolded with AI assistance"** | Direct hit on the named evaluation criterion |
| Sector emphasis | Triple-fit: **fintech** + **AI for social good** + **digital tools for SMEs** | Triple-claim increases surface area for sector preference |
| Risk tolerance | **High** — go for the cinematic payoff, carry Figma fallback | The reward (first place ₦10M) justifies the additional execution risk |

---

## 3. Submission package

```
/intellibulk-opay-2026/
├── demo.mp4              ← HERO ASSET, 2:30, ≤10 MB
├── proposal.pdf          ← 6 pages, ≤10 MB
└── transcripts/          ← CGPA proof per teammate
```

**Upload to:** the entry link on opayweb.com (verify before submitting; recorded in execution plan §6).

---

## 4. Hero asset — Demo video (2:30)

### 4.1 Format

- Container: MP4
- Codec: H.264 (broadest browser support)
- Resolution: 720p (1080p likely exceeds 10 MB at 30 fps for 2:30 — 720p at ~900 kbps avg fits comfortably)
- Frame rate: 30 fps
- Audio: AAC, stereo, 48 kHz
- Length: 2:30 (sweet spot; ≤3:00 hard cap)
- Final size target: ≤ 8 MB to leave headroom under the 10 MB portal cap

### 4.2 Eight-scene storyboard

| Time | Scene | What you see | What you hear |
|---|---|---|---|
| 0:00–0:15 | Cold open | Black screen → class photo of students → title card "IntelliBulk" fades in | Voiceover: "What if every contribution to your school trip was already on your phone?" |
| 0:15–0:45 | Pain montage | WhatsApp screenshots ("Have you paid?"), receipts-on-paper, missed-call logs, parents counting cash | SFX: muted chat pings + low-conflict bed; no narration |
| 0:45–1:30 | Organiser flow | Live screen: "Class of '27 Excursion" event wizard → AI-suggested line items auto-fill (bus, lodging, materials) | VO: "Organisers create events in minutes — IntelliBulk's AI templates the boring parts." |
| 1:30–2:00 | Parent flow | Continue live screen: invite link → parent phone view → OPay wallet modal pops → "₦15,000 received — Trust Ledger updated" → animated green check | VO: "Parents tap, pay with OPay, and their receipt is sealed on the ledger." |
| 2:00–2:15 | Trust Ledger toggle | Same screen reorganised into Trust Ledger view; scroll reveals hash badges; "Immutability: ✓" | VO: "Every entry is hash-chained — neither party can rewrite history." |
| 2:15–2:30 | Vendor match + payout | Switch back to organiser: vendor list shows top-3 AI matches, "Best fit" highlighted; tap → confirm → OPay payout modal opens → 50% deposit sent | VO: "AI picks the right vendor; OPay moves the money. Same rails, one flow." |
| 2:30–2:45 | Roadmap tease | Still card: "5 schools · Q1 2027 pilot" + the team grid below | Music lifts; text-only no overlay |
| 2:45–3:00 | The ask | IntelliBulk mark + "₦10M build grant · OPay mentorship · Sandbox access" + silence then end card | Music resolves + fade out |

### 4.3 Mood

Warm-Nigerian-corporate-clean. Background: gentle warm tones (off-white, ember orange, deep navy). Reference frames: Apple product films + Stripe announcement videos.

### 4.4 Technical defaults (flag if wrong)

| Default | Decision |
|---|---|
| Voice-over | Yes, warm Nigerian-accented English (recorded by a teammate, 3 takes) |
| Music | Royalty-free: corporate-emotional building score, normalised to –14 LUFS |
| Source footage | **Live screen-recording of MVP** captured in OBS at 1080p |
| Editing tool | CapCut (desktop) or DaVinci Resolve (free) |
| Fallback | If MVP breaks during recording, switch to Figma prototype + voice-over |

---

## 5. Supporting asset — Proposal PDF (6 pages)

| Page | Headline | Goal |
|---|---|---|
| 1 | Cover — IntelliBulk mark, "OPay Innovation Challenge 2026", team grid with names + roles + CGPAs | Identification, first impression, "first-class team" signal |
| 2 | The problem | One headline stat per row, all footer-cited; pain is real and measurable |
| 3 | The solution | One screenshot per system (organiser / parent / ledger / vendor) — i.e. stills from the video |
| 4 | OPay integration map | Diagram: wallet → contribution tracker → Trust Ledger → vendor payout → receipt |
| 5 | The ask + roadmap | "What we need" and "Where we go in 18 months" |
| 6 | The team | First-class credentials, why-this-team, why-now-why-OPay |

PDF tool: Canva (Pro if available, free otherwise).

---

## 6. MVP architecture (Next.js + mock OPay polyfill)

### 6.1 Pages

| Route | Purpose |
|---|---|
| `/event/[id]` | Organiser dashboard — event creation, line items, AI suggestions, ledger preview |
| `/contribute/[id]` | Parent wallet modal — mocked OPay pay screen with brand-correct UI |
| `/ledger/[id]` | Trust Ledger view — append-only scroll, hash badges, no edit affordance |
| `/vendors/[id]` | AI vendor list — top-3 with scoring breakdown, accept/pay-out flow |

### 6.2 Backend endpoints

| Route | Method | Purpose |
|---|---|---|
| `/api/event` | POST | Create event |
| `/api/event/[id]/contribute` | POST | Log payment (calls `opayClient.pay()`) |
| `/api/ledger/[id]` | GET | Read append-only ledger entries |
| `/api/vendors/match` | POST | Return ranked vendor list (rules-based stub) |
| `/api/opay/payout` | POST | Send vendor payout (mocked OPay SDK) |

### 6.3 OPay integration strategy

- Real OPay SDK if sandbox keys acquired by **+8h**; otherwise polyfill.
- Polyfill must expose the SAME `opayClient.pay(amount, currency, ref)` interface as the real SDK so swapping is one line of code.
- Visual fidelity in the polyfill is critical — modal, success state, error state — same colours and microcopy the OPay wallet actually uses. Use OPay brand assets from their public site.

### 6.4 Trust Ledger implementation

- Append-only JSON store with hash chain: each entry includes `prevHash` + `currentHash = sha256(prevHash + payload)`.
- Implemented in `lib/ledger.ts` using Node `crypto`.
- Visual badge shows current hash + "Sealed at" timestamp.

### 6.5 AI matcher

- Rules-based stub for v1: `score = capacityFit * 0.4 + historyFit * 0.4 + priceFit * 0.2`.
- Documented as "v1 rules engine feeding the Predictive Matching Loop" — honest roadmap, not overpromised.

### 6.6 Tech stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Speed to ship; file-based routing |
| Styling | Tailwind CSS | Fast UI iteration |
| Mock data | In-memory + localStorage | No DB infra overnight |
| Voice recording | Phone mic into CapCut/Audacity | Highest-quality capture with lowest friction |
| Screen recording | OBS (free) | Industry default |
| Video editing | CapCut Desktop (free) or DaVinci Resolve | CapCut for speed; Resolve for polish |

---

## 7. Team allocation

Five first-class undergraduates.

| # | Role | Owns |
|---|---|---|
| 1 | Team Lead / Video Director | Storyboard, scene direction, on-camera closer (optional), final cut approval |
| 2 | Frontend Dev | Next.js build, four pages, polish |
| 3 | Backend Dev / OPay Polyfill | Endpoints, OPay client, Trust Ledger, AI matcher |
| 4 | Designer / Motion Graphics | Brand system, on-screen graphics, animation, Canva proposal |
| 5 | Voice & Story | Script, voiceover, music selection, audio sync |

Names + CGPA filled at upload time.

---

## 8. Execution plan (24-hour sprint)

Tonight = T0. Deadline = T+22h. Buffer = T+22h → T+24h.

| Window | Owner 1 — Director | Owner 2 — FE Dev | Owner 3 — BE Dev | Owner 4 — Designer | Owner 5 — Voice & Story |
|---|---|---|---|---|---|
| **T0 → T+3h** | Storyboard 8 scenes (numbered sketches) | Scaffold Next.js app + theme | Apply for OPay sandbox / fetch SDK | Brand system (colours, type, IntelliBulk mark) | Script v1; drill voiceover 3 takes |
| **T+3h → T+8h** | Final storyboard + scene notes | Build 4 pages: layout + state | `/api/event`, `/api/opay/pay`, `/api/opay/payout` | Mock OPay modal graphics; Trust Ledger badge; on-screen overlays | Voiceover final cut; music selection (royalty-free) |
| **T+8h → T+14h** | Cut scene 1+2+3 (montage + organiser) | Polish organiser flow + parent modal | `/api/ledger`, `/api/vendors/match`; wire to FE; Trust Ledger hashing | Edit scenes 4+5+6 (parent, ledger, vendor); colour grade pass | Sound design + first voice-music sync |
| **T+14h → T+20h** | Cut scenes 7+8 (roadmap + ask); stitch full | UI polish, error states | End-to-end test; demo seed data | Animated overlays + lower-thirds; final mock-OPay fidelity | Audio mix to –14 LUFS; second voice-music pass |
| **T+20h → T+22h** | Final dry-run, package upload | QA on all 4 pages; hot-fix | QA on all endpoints | Insert stills into proposal.pdf; final design pass | Embed voice + music in MP4; export proof |
| **T+22h → T+24h** | Buffer: portal submission flow | Buffer | Buffer | Buffer | Buffer |

---

## 9. Risk register

| Risk | Mitigation | Owner |
|---|---|---|
| OPay sandbox keys unavailable | Polyfill behind same SDK interface; visually faithful | Owner 3 |
| AI matcher feels hollow | Frame as "v1 rules engine feeding the Predictive Matching Loop" — honest | Owner 3 |
| MVP breaks during screen-recording | Figma prototype backup pre-built; rehearsed cut-over | Owner 1 |
| Voiceover sounds amateur | 3 takes; if all bad, last-resort ElevenLabs voice-over | Owner 5 |
| Demo final cut looks rough | CapCut templates + dynamic subtitles; record at 60 fps if needed for slow-mo polish | Owner 1 |
| Proposal PDF over 10 MB | Compress images to 100–150 DPI; embed video link instead of MP4 if needed | Owner 4 |
| One teammate drifts / sleeps in | Documentation in `/docs/owner-N.md` lets others pick up | All |
| Audio-video drift on concat | Render whole timeline at once, not piecemeal | Owner 1 |
| Wrong portal link / scam site | Confirm URL on OPay social channels BEFORE upload | Owner 1 |
| **Criterion we haven't met: "academic transcripts"** | All teammates must scan/photo transcripts by T+18h | ALL |

---

## 10. Acceptance criteria (GATE before upload)

We are eligible to submit only when ALL of the following hold:

- [ ] `demo.mp4` plays cleanly at 1080p, 2:30 ± 15s, ≤ 10 MB
- [ ] `proposal.pdf` is 6 pages, ≤ 10 MB, all text-readable, all graphics intact
- [ ] Demo video shows: organiser → parent → Trust Ledger → vendor → payout in unbroken flow
- [ ] Voiceover is intelligible, accent on-brand Nigerian-warm, no profanity or slurs
- [ ] At least 4 teammates' CGPA transcripts scanned and ready
- [ ] Application form filled + saved locally (don't lose progress on portal timeout)
- [ ] Application link verified against OPay's official channels (not third-party blog)
- [ ] One teammate has tested the upload flow end-to-end on a throwaway submission (if portal allows)
- [ ] All five teammates' full names + emails + institution + CGPA match between proposal and form

---

## 11. What is explicitly out of scope (YAGNI)

- Roster management
- Theme/vibe switcher
- Multi-audience/event configurator
- Quizzes / homework
- Mobile app (web-only)
- Auth providers other than email/OTP mock
- Real auth, real OPay sandbox production keys
- Multi-region / multi-currency (NGN only)
- Production deployment (Vercel preview only, if at all)
- Anything in the original pitch deck that does not serve the spine: **OPay must move the money**

---

## 12. Definition of done

Submission package uploaded to the OPay Innovation Challenge 2026 portal **before** the close-of-submissions time on **14 June 2026**.

**Critical assumption:** the article did not name a specific close time. **We assume 23:59 WAT 14 June 2026**, but treat this as a soft deadline — the portal may close earlier (some hackathons run midnight UTC or 17:00 WAT). To control the risk:

- Begin upload flow by **T+20h** at the latest.
- If portal timing can't be confirmed by **T+8h**, default the upload-start target to **T+18h**.
- Capture confirmation screenshot immediately after submit success — that timestamp is the receipt of record.
