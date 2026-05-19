# Owner's Circle — Dir 2 "The Field" Build Log

Branch: main · Vercel project: owners-circle · Stack: Next.js 16 / React 19 / TS / Tailwind v4 / Framer Motion 12 / Lenis

## STEP 1 — carcompany.ai scroll motion: DONE
Analyzed live (Playwright). Findings + plan in SCROLL-MOTION-NOTES.md.
Verdict: Webflow + GSAP 3.15 ScrollTrigger + sticky-pinned hero + fade-up reveals + sticky curtain footer + Swiper.
Replication: Lenis (inertia) + Framer Motion useScroll/useTransform (pinned scrubbed hero) + whileInView staggers + CSS sticky footer. No GSAP/Webflow.

## STEP 2 — Build pages (Dir 2 oxblood)
- [x] Design system (globals.css full replace) + SmoothScroll(Lenis) + Reveal + Nav + SiteFooter + PageHero
- [x] Home (HeroField pinned scrubbed signature moment + manifesto + podcast + pillars + gallery + apply)
- [x] Episodes (filterable grid)
- [x] Newsletter (6-part format + sample + signup)
- [x] Nominate (story + oxblood form card)
- [x] Sponsors (audience grid + inventory + 3 tiers + inquiry form)
- [x] Events (what to expect + who + format ledger + waitlist)
- [x] About (James Chhetree story + beliefs + CTA)
- Removed obsolete components: Navbar/StickyNav/Footer/HeroSlideshow/ScrollReveal/EpisodeCard/RoomPicker

## STEP 3 — Scroll motion: DONE
Lenis inertial smooth-scroll (SmoothScroll.tsx, disabled on reduced-motion).
Pinned scrubbed hero signature moment (HeroField.tsx — 210vh track, sticky
field, word scale/translate/letter-spacing + inset parallax + ember sweep
scrub via Framer useScroll/useTransform). whileInView staggered reveals
(Reveal.tsx). Sticky-parallax footer ghost word. PageHero parallax across
all 6 sub-pages. Verified scrub + reduced-motion on live prod.

## VERIFY + DEPLOY: DONE
- npm run build: success, all 7 routes + 4 API routes.
- Deployed production: https://owners-circle.vercel.app (READY, aliased).
- Fixed: removed platform-pinned lightningcss-darwin-arm64 from
  package.json (broke Vercel Linux build); relinked vercel scope
  (jchhetree-gmailcoms-projects) which fixed "Not authorized" on finalize.
- All 7 prod routes 200. Hero scrub verified live. Reduced-motion verified.
- Live site is now Dir 2 "The Field" (replaced old gold/pink v1).

STATUS: COMPLETE.
