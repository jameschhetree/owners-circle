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

STATUS: Dir 2 build COMPLETE.

## STEP 4 — Waitlist CTA + single shared form + more animations (2026-05-19)

### Task 1 — One shared site-wide capture form
- New `src/components/Waitlist.tsx`: `WaitlistProvider` (context + the one
  shared modal) + `WaitlistButton` (the reusable CTA). Mounted once in
  `layout.tsx`. Modal = Name, Email, "What are you here for?" select
  (auto-preset to the opening button's intent, user-editable), optional
  message. Esc/backdrop close, body-scroll lock, AnimatePresence in/out,
  reduced-motion safe.
- Every CTA site-wide now opens this single modal (no parallel forms):
  Nav (desktop + mobile) → "Join the Waitlist"; HeroField bone pill →
  "Join the Waitlist" + Watch Episodes; Home Watch Episodes / Nominate a
  Guest / Sponsor / Partner; SiteFooter primary pill → "Join the
  Waitlist"; About CTAs; Sponsors tier "Inquire" buttons. NewsletterForm,
  GuestNominationForm, SponsorInquiryForm, EventWaitlistForm rewritten as
  thin triggers of the shared modal with their intent preset (no dead
  parallel forms). Premium pill styling preserved throughout.
- New `src/app/api/waitlist/route.ts`: POSTs to FormSubmit AJAX
  (jchhetree@gmail.com), classic form-encoded fallback, Upstash persist if
  configured, console.log always; always returns 200 (graceful
  degradation). Returns `delivery` + `upstreamStatus` so delivery state is
  observable.
- CAVEAT (honest): FormSubmit.co is currently serving a Cloudflare managed
  challenge to ALL server-side requests (403 on both /ajax/ and classic,
  every header combination tried, from both this machine and Vercel
  egress). So the one-time activation email to jchhetree@gmail.com is NOT
  yet triggered and email delivery is deferred until FormSubmit's challenge
  clears (it cycles this protection). Route self-heals automatically when
  it does. No submission is lost (console-logged in function logs). A
  reliable provider swap (e.g. Web3Forms) is the durable fix if FormSubmit
  stays gated — flagged for James.

### Task 2 — More animations (additive, Dir 2 preserved)
- New `src/components/Parallax.tsx`: `Parallax` (scroll-linked y / scale /
  opacity, transform-only, willChange transform, reduced-motion → static)
  and `StickyScrub` (pins a heading + scrubs scale/letter-spacing/opacity
  + a progress rail, reduced-motion → static).
- Home: manifesto block drifts up on scroll; podcast feature image gets a
  parallaxing texture layer behind pinned copy; PILLAR LEDGER is now a
  second sticky-scrubbed signature moment (240vh track, pinned scrubbed
  heading + progress rail, rows still stagger-reveal); gallery tiles get
  differential parallax. Original hero scrub unchanged (no regression,
  verified).
- 60fps (transform/opacity only), zero CLS (absolute decorative layers,
  no layout-animated props), prefers-reduced-motion fully collapses ALL
  added motion to static (Playwright-verified on prod).

DEPLOY: Production https://owners-circle.vercel.app — alias confirmed on
newest deployment (dpl_JCrj2Vz2ynvqLc3oS5LTSFkfM79s, READY). All 7 routes
+ /api/waitlist 200. Build clean. Playwright on live prod: 3 CTAs open the
same modal w/ correct intent, hero scrub intact, sticky-scrub + gallery
parallax working, reduced-motion disables all motion.
