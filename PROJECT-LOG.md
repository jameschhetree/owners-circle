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
- [ ] Nominate
- [ ] Sponsors
- [ ] Events
- [ ] About
- Removed obsolete components: Navbar/StickyNav/Footer/HeroSlideshow/ScrollReveal/EpisodeCard/RoomPicker

## STEP 3 — Scroll motion baked in: pending
## VERIFY + DEPLOY: pending
