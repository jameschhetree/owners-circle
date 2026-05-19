# carcompany.ai — Scroll Motion Analysis (ground truth for Owner's Circle)

Analyzed live via headless Playwright (load → networkidle → scrubbed scroll 0→10738px, screenshots at depth, runtime library + transform probes). Scripts: `cc-analyze.mjs`, `cc-motion.mjs` (in repo root, deleted before deploy).

## What carcompany.ai actually runs

- **Platform:** Webflow site (`cdn.prod.website-files.com`, `webflow.*.js`, `w-mod-ix` interaction classes).
- **Smooth scroll + scroll-linked motion:** **GSAP 3.15.0 + ScrollTrigger** (`cdn.prod.website-files.com/gsap/3.15.0/gsap.min.js` + `ScrollTrigger.min.js`). `window.gsap` and `window.ScrollTrigger` both present. This is the engine behind "the website moves when you scroll."
- **Horizontal segment:** Swiper 11 (`swiper-bundle.min.js`) — a `swiper-wrapper` translated on X (`matrix(1,0,0,1,-351,0)`), i.e. a scroll/drag-driven horizontal carousel.
- **Pinned sections:** `position: sticky` blocks — `.hero-pin` (hero pins while content scrolls under/over it), a sticky `.div-block-2`, and a **sticky footer reveal** (`section is-white footer` sticky — the prior section scrolls up and the footer is revealed beneath it, a "curtain" pin).
- Negligible `will-change` count (3) → they lean on transform/opacity on a few key nodes, not heavy compositing everywhere. Clean.

## The scroll FEEL (what to replicate, not the assets)

1. **Inertial smooth-scroll.** Wheel input is eased — momentum carries, deceleration is soft. The page does not snap to raw scroll; it glides. (GSAP ScrollSmoother equivalent.)
2. **Scroll-linked / scrubbed hero.** The hero is pinned (sticky) and its inner content + a large media block transform as you scroll *through* it — scale/translate/opacity tied directly to scroll progress (not a one-shot animation). This is the signature "it moves with me" moment.
3. **Fade-up reveals on enter.** Content blocks (`div-block-4`, `qoute-wrapper`, `stats-container`) start at `translateY(240px)` and animate to `0` + fade in as they enter the viewport — generous travel (~240px), staggered, eased.
4. **Sticky curtain footer.** Final section is sticky; the body scrolls up off it so the footer is *revealed underneath* rather than pushed up. Cheap, premium-feeling depth.
5. **Horizontal scroll segment** for a gallery/episode strip (Swiper). Optional for us — we have the staggered gallery instead.

## Implementation plan for Owner's Circle (Next.js 16 / React 19 / Framer Motion 12)

Do NOT add GSAP/Webflow/Swiper. Replicate the feel with the existing stack + one tiny dep:

- **Lenis** (`lenis` ~ small, framework-agnostic) for inertial smooth-scroll. Mounted once in a client `SmoothScroll` provider in the root layout. RAF-driven, `lerp: 0.085`, custom easing, syncs with Framer Motion's scroll. Disabled entirely under `prefers-reduced-motion`.
- **Framer Motion `useScroll` + `useTransform`** for the scrubbed signature moment: the home hero is **`position: sticky` pinned** for ~1.4 viewport heights; as scroll progresses the giant "Owners." serif word and the inset photo **scale + translate + the word's letter-spacing/opacity shift** — scroll-linked, scrubbed, 60fps (transform/opacity only). This is our equivalent of carcompany's pinned hero.
- **`whileInView` staggered fade-up** (`ScrollReveal` wrapper): `y: 48 → 0`, `opacity: 0 → 1`, custom cubic-bezier `[0.16, 1, 0.3, 1]`, `staggerChildren`, `viewport={{ once: true, margin: "-12% 0px" }}`. Used on manifesto, podcast rows, gallery tiles, apply columns, footer.
- **Sticky curtain footer** — footer `position: sticky; bottom: 0`, the section above it scrolls up to reveal it (pure CSS, the carcompany move, no JS cost).
- **Parallax** on the hero inset photo + the footer ghost word via `useTransform` on scroll (subtle, ±40px).
- **prefers-reduced-motion:** Lenis not initialized, all Framer variants collapse to instant (no y travel, no scrub — content just appears), sticky-pin still works (it's layout, not motion) but without transform scrub. Verified path.

Performance bar: transforms/opacity only, `will-change` only on the 2–3 scrubbed nodes, no layout-triggering props animated, no scroll-jacking that blocks user input (Lenis passes wheel through with momentum, never traps). Target 60fps, zero CLS.
