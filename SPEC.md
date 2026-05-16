Use this as the Claude/Cursor build prompt.

You are building a premium, modern website for a new media/community brand called Owner’s Circle.

Brand positioning:
Owner’s Circle is a DMV-first podcast, newsletter, and private network spotlighting the business owners, operators, creators, and tech leaders building real companies, real influence, and real rooms.

Core brand idea:
This is not just a podcast. It is the start of a private business community. The site should feel like a modern media platform, private founder network, and premium event brand.

Tone:
Modern, sleek, high-status, confident, warm, founder/operator energy. Not corporate boring. Not cheesy entrepreneur guru. Think premium media brand meets private business club.

Design inspiration:
I have Refero and other markdown design reference files in this repo. Read all available MD/design files first and extract the style principles. Use them as inspiration, but create an original Owner’s Circle identity.

Tech stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui components where useful
- Lucide icons
- Fully responsive
- Deploy-ready for Vercel

Site goals:
1. Get people to join the newsletter.
2. Make the podcast look premium and real.
3. Invite high-quality guests to apply/nominate someone.
4. Attract sponsors/partners.
5. Build anticipation for live events and future membership.
6. Make Owner’s Circle feel like “the room” for DMV owners and builders.

Primary CTA:
Join the Circle

Secondary CTAs:
Nominate a Guest
Sponsor / Partner With Us
Watch Episodes

Website pages:
Build these pages:

1. Home
2. Episodes
3. Newsletter
4. Nominate a Guest
5. Sponsors / Partners
6. Events
7. About

Global design requirements:
- Dark premium background, but not flat black.
- Use subtle gradients, radial glows, glassmorphism cards, thin borders, soft shadows.
- Accent color can be gold, off-white, muted red, or electric blue. Pick a polished palette that feels premium.
- Use elegant typography with strong hierarchy.
- Big bold hero headline.
- Lots of breathing room.
- Smooth scroll animations.
- Hover effects on cards/buttons.
- Subtle animated background elements.
- Use Framer Motion for page entrance, scroll reveal, floating elements, and staggered cards.
- Add a tasteful animated marquee of audience types: Founders, Operators, Creators, Tech Leaders, Investors, Builders, Owners, Executives.
- Use responsive mobile-first design.
- No clutter.
- Make it feel expensive.

Suggested visual style:
- Background: deep charcoal / black gradient
- Text: off-white
- Muted text: gray/slate
- Accent: warm gold or red-gold
- Cards: translucent dark glass with 1px borders
- Buttons: rounded-full, premium hover lift
- Sections: generous padding, strong spacing
- Add subtle noise texture or radial background glow if simple to implement

Homepage structure:

Hero section:
Headline:
“The room for people building real companies, real influence, and real rooms.”

Subheadline:
“Owner’s Circle is a DMV-first podcast, newsletter, and private network spotlighting business owners, operators, creators, and tech leaders.”

Buttons:
Join the Circle
Nominate a Guest

Hero visual:
Create a premium abstract “circle” visual with layered glowing rings, orbiting dots, or member cards around a circle. It should imply access, network, and community.

Add small badge:
“DMV-first. Built to go national.”

Section 2: What is Owner’s Circle?
Copy:
“Owner’s Circle starts with conversations. Each episode highlights the people building companies, communities, platforms, and movements. The bigger vision is a private room where ambitious owners and leaders connect, collaborate, and grow.”

Use 3 cards:
- Podcast: Long-form conversations with real builders.
- Newsletter: Weekly lessons, stories, and opportunities from inside the circle.
- Events: Private rooms for owners, operators, creators, and tech leaders.

Section 3: Why it exists
Headline:
“Most networking feels random. Owner’s Circle is curated.”

Copy:
“We’re building a media platform and private community around people who are actually building. The podcast tells the stories. The newsletter keeps the audience close. The events bring the room to life.”

Section 4: Featured pillars
Create cards for:
- Ownership
- Growth
- Leadership
- Technology
- The Room

Each card should have a short description.

Ownership:
“The pressure, discipline, and mindset behind building something real.”

Growth:
“Sales, marketing, hiring, capital, systems, and scale.”

Leadership:
“The decisions, people, and lessons that shape operators.”

Technology:
“AI, automation, tools, and the future of work.”

The Room:
“Relationships, referrals, access, and community.”

Section 5: Episodes preview
Create a beautiful episode grid with placeholder data.
Each episode card should have:
- Guest name
- Role/company
- Episode title
- Category tag
- Short description
- Watch button

Use placeholder guests for now:
- Founder / CEO
- Tech Leader
- Agency Owner
- Real Estate Operator
- Healthcare Executive
- Creator-Founder

Make this data easy to edit in a constants file.

Section 6: Newsletter CTA
Newsletter name:
“Inside the Circle”

Headline:
“Get the lessons, stories, and opportunities from inside the circle.”

Copy:
“Every week, get sharp takeaways from featured owners and leaders, plus the asks, opportunities, and introductions shaping the DMV business community.”

Email capture form:
Fields:
- Email
- Optional first name

Button:
Join the Circle

For now, make the form ready to connect later. Use a placeholder API route or simple form handler with TODO comments.

Section 7: Guest nomination CTA
Headline:
“Know someone who belongs in the circle?”

Copy:
“We’re looking for business owners, operators, creators, and tech leaders with real stories, real lessons, and real rooms.”

Button:
Nominate a Guest

Section 8: Sponsor CTA
Headline:
“Reach the people building the DMV.”

Copy:
“Partner with Owner’s Circle across the podcast, newsletter, and live events to reach founders, owners, executives, creators, and decision-makers.”

Button:
Sponsor / Partner With Us

Section 9: Events teaser
Headline:
“Owner’s Circle Live is coming.”

Copy:
“A private evening for DMV owners, operators, creators, and tech leaders. Conversations, curated networking, and the first look at Founding Membership.”

Button:
Join the Event Waitlist

Section 10: Final CTA
Headline:
“Don’t just watch the circle. Join it.”

Button:
Join the Circle

Episodes page:
- Hero: “Conversations with the people building what’s next.”
- Filterable grid by category: Ownership, Growth, Leadership, Technology, The Room.
- Episode cards using editable placeholder data.
- Include search/filter UI if simple.
- Make it easy to replace with real podcast episodes later.

Newsletter page:
- Hero for “Inside the Circle.”
- Explain the newsletter format:
  1. This Week Inside the Circle
  2. The Big Lesson
  3. The Story
  4. The Playbook
  5. The Ask
  6. Join the Circle
- Email signup form.
- Add sample newsletter preview card.

Nominate a Guest page:
Build a clean form with:
- Your name
- Your email
- Guest name
- Guest company
- Guest role
- Guest email or LinkedIn
- Why they should be featured
- What category fits them?
- Do they have a strong story, audience, business, or network?
- Submit button

Add page copy:
“We’re looking for people building real companies, real influence, and real rooms. They don’t need to be famous. They need to be real.”

Sponsors / Partners page:
Build a premium sponsor page.

Sections:
- Hero: “Partner with the room for DMV builders.”
- Audience cards:
  - Business owners
  - Founders
  - Operators
  - Creators
  - Tech leaders
  - Investors
  - Decision-makers

Sponsor inventory:
- Podcast sponsorship
- Newsletter sponsorship
- Event sponsorship
- Community partnership
- Content collaboration

Create 3 sponsor package cards:
1. Community Sponsor
2. Circle Sponsor
3. Presenting Partner

Do not include exact pricing yet. Use “Starting soon” or “Custom packages available.”

Add sponsor inquiry form:
- Name
- Company
- Email
- Website
- Interest area
- Message

Events page:
Hero:
“Owner’s Circle Live”

Copy:
“A private evening for DMV owners, operators, creators, and tech leaders.”

Sections:
- What to expect
- Who should attend
- Event format
- Waitlist form

Event format:
- Networking
- Live conversation/panel
- Curated introductions
- Member/sponsor spotlights
- Founding Membership preview

About page:
Tell the story:
Owner’s Circle is built by James Chhetree, a podcast studio owner, interviewer, builder, and connector in the DMV.

Copy direction:
“After producing shows, working with founders, and seeing how many real builders lacked a central room, Owner’s Circle was created to spotlight the people building and eventually bring them together.”

Keep it confident but not too self-centered.

Components to build:
- Navbar
- Footer
- HeroSection
- AnimatedCircleVisual
- CTAButton
- SectionHeader
- GlassCard
- EpisodeCard
- PillarCard
- NewsletterForm
- GuestNominationForm
- SponsorInquiryForm
- EventWaitlistForm
- AnimatedMarquee
- ScrollReveal wrapper
- Testimonial/quote card placeholder
- Badge component

Navbar:
Links:
- Episodes
- Newsletter
- Events
- Sponsors
- About
Button:
Join the Circle

Footer:
Include:
- Owner’s Circle
- Real owners. Real stories. Real rooms.
- Newsletter signup mini form
- Links
- Social placeholders
- Copyright

SEO:
Add strong metadata:
Title:
Owner’s Circle | Podcast, Newsletter & Private Network for DMV Builders

Description:
Owner’s Circle is a DMV-first podcast, newsletter, and private network spotlighting business owners, operators, creators, and tech leaders building real companies, real influence, and real rooms.

Performance:
- Keep animations smooth.
- Avoid huge dependencies.
- Optimize for mobile.
- Use semantic HTML.
- Make forms accessible.
- Use clean component structure.

Data structure:
Create editable data files:
- /data/episodes.ts
- /data/pillars.ts
- /data/sponsors.ts
- /data/nav.ts

Forms:
For now, build functional front-end forms with validation and clean success states. Add TODO notes for integration with:
- Beehiiv/Substack/Mailchimp for newsletter
- Airtable/Supabase/Google Sheets for guest nominations
- Airtable/Supabase/Google Sheets for sponsor inquiries
- Luma/Eventbrite for events

Animations:
Use Framer Motion for:
- Hero text fade/slide in
- Staggered cards
- Scroll reveal sections
- Button hover lift
- Animated glowing circle
- Marquee loop
- Subtle floating cards
- Page transitions if simple

Important:
Make the site feel alive, but not gimmicky. The animation should support the premium brand. No corny startup template look.

Final deliverable:
Build the full site with clean reusable components, dummy content, and clear TODO comments where integrations should go. Make it beautiful, modern, and deploy-ready.
Extra instruction to add after Claude builds v1

Paste this after the first version:

Now refine the design to feel more premium and less template-like.

Improve:
- spacing
- typography hierarchy
- button styles
- card depth
- animations
- mobile layout
- hero visual
- CTA sections

Make the site feel like a high-status media/community brand, not a generic podcast landing page.

Add more personality around the idea of “the room,” “the circle,” and “builders.” Keep the copy sharp, not too long.
Homepage copy you can use

Hero headline:
The room for people building real companies, real influence, and real rooms.

Subheadline:
Owner’s Circle is a DMV-first podcast, newsletter, and private network spotlighting business owners, operators, creators, and tech leaders.

CTA:
Join the Circle

Secondary CTA:
Nominate a Guest

Badge:
DMV-first. Built to go national.

Newsletter CTA:
Inside the Circle is the weekly brief for stories, lessons, and opportunities from the owners and leaders building the DMV and beyond.

Event CTA:
Owner’s Circle Live is coming. A private evening for DMV owners, operators, creators, and tech leaders.

Final CTA:
Don’t just watch the circle. Join it.

My suggested site structure

Start simple but premium:

/
  Home

/episodes
  Podcast episode library

/newsletter
  Inside the Circle signup

/nominate
  Nominate a guest

/events
  Owner’s Circle Live waitlist

/sponsors
  Sponsor / partner inquiry

/about
  About Owner’s Circle
Best vibe direction

Tell Claude this phrase if the design comes out too basic:

Make it feel like Soho House meets a modern founder podcast meets a premium private business network.

That should push it in the right direction.