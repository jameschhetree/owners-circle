"use client";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Play, Mic2 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { WaitlistButton } from "@/components/Waitlist";
import "./home.css";
export default function Home() {
  return (
    <div className="oc-home">
      <Nav tone="burgundy" />
      <section className="home-hero">
        <div className="hero-copy">
          <div className="home-kicker">
            <span /> THE OWNER’S CIRCLE PODCAST
          </div>
          <h1>
            Behind every
            <br />
            business.
            <br />
            <em>A real story.</em>
          </h1>
          <p>
            Honest conversations with the owners, operators, and builders doing
            the work. The decisions. The lessons. The people behind it all.
          </p>
          <div className="hero-actions">
            <Link href="/episodes" className="home-button">
              <Play size={15} fill="currentColor" /> Explore the episodes{" "}
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/about" className="hero-text-link">
              Meet the circle <ArrowRight size={15} />
            </Link>
          </div>
          <div className="hero-footnote">
            <Mic2 size={16} />
            <span>LONG-FORM CONVERSATIONS. LASTING PERSPECTIVE.</span>
          </div>
        </div>
        <div className="cover-scene">
          <div className="cover-caption">
            <span>THE CONVERSATIONS THAT BUILD US.</span>
            <span>EST. 2026</span>
          </div>
          <div className="podcast-cover">
            <div className="cover-top">
              OWNERS. OPERATORS. ORIGINAL THINKERS.
            </div>
            <div className="cover-ring">
              <img
                src="/brand/oc-logo.jpg"
                alt="Owner’s Circle crest"
                width="240"
                height="240"
              />
            </div>
            <h2>
              Owner’s
              <br />
              <em>Circle.</em>
            </h2>
            <div className="cover-bottom">
              <span>
                TAKE A SEAT.
                <br />
                STAY FOR THE STORY.
              </span>
              <Mic2 size={25} />
            </div>
          </div>
          <div className="cover-caption below">
            <span>INDEPENDENT VOICES.</span>
            <span>SHARED AMBITION. ↗</span>
          </div>
        </div>
      </section>
      <div className="topic-strip">
        <span>OWNERSHIP</span>
        <i>✳</i>
        <span>GROWTH</span>
        <i>✳</i>
        <span>LEADERSHIP</span>
        <i>✳</i>
        <span>TECHNOLOGY</span>
        <i>✳</i>
        <span>THE PEOPLE BEHIND IT</span>
      </div>
      <section className="home-editorial">
        <div className="editorial-heading">
          <span className="home-kicker dark">01 / INSIDE THE CONVERSATION</span>
          <h2>
            Less surface.
            <br />
            <em>More substance.</em>
          </h2>
        </div>
        <div className="editorial-copy">
          <p>
            A company is more than the headline. We’re interested in the choices
            that came before it—and the person making them.
          </p>
          <p>
            Owner’s Circle makes room for the honest version: the first leap,
            the hard pivot, the work nobody saw.
          </p>
          <Link href="/episodes">
            Step inside the podcast <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>
      <section className="home-topics">
        <div className="topics-heading">
          <div>
            <span className="home-kicker dark">
              THE QUESTIONS WE COME BACK TO
            </span>
            <h2>Built for the people building.</h2>
          </div>
          <Link href="/episodes">
            Explore the show <ArrowRight size={17} />
          </Link>
        </div>
        <div className="topic-cards">
          {[
            {
              n: "01",
              category: "OWNERSHIP",
              title: "What does it take to bet on yourself?",
              text: "The leap from an idea to something you own.",
            },
            {
              n: "02",
              category: "GROWTH",
              title: "How do you grow without losing the point?",
              text: "The trade-offs behind teams, scale, and ambition.",
            },
            {
              n: "03",
              category: "THE ROOM",
              title: "Who changes the way you see the work?",
              text: "Relationships, perspective, and the people who matter.",
            },
          ].map((t) => (
            <Link href="/episodes" className="topic-card" key={t.n}>
              <div>
                <span>{t.category}</span>
                <span>{t.n}</span>
              </div>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              <ArrowUpRight size={25} />
            </Link>
          ))}
        </div>
        <p className="topics-note">
          Themes we explore. Visit the episode page for the current release
          lineup.
        </p>
      </section>
      <section className="home-notes">
        <div>
          <span className="home-kicker">02 / OWNER’S NOTES</span>
          <h2>
            A little perspective.
            <br />
            <em>In your inbox.</em>
          </h2>
          <p>
            Lessons and ideas from inside the circle. For the space between
            conversations.
          </p>
          <WaitlistButton
            intent="Newsletter"
            source="Home · Notes"
            className="home-button"
          >
            Get Owner’s Notes <ArrowRight size={17} />
          </WaitlistButton>
        </div>
        <div className="notes-paper">
          <span>OWNER’S NOTES</span>
          <div className="paper-rule" />
          <h3>
            The work.
            <br />
            The lessons.
            <br />
            <em>The next move.</em>
          </h3>
          <p>A field note for the people building something of their own.</p>
          <div className="paper-rule" />
          <span>FROM INSIDE THE CIRCLE ↗</span>
        </div>
      </section>
      <section className="home-invitation">
        <div>
          <span className="home-kicker dark">
            THERE’S A SEAT FOR A GOOD STORY.
          </span>
          <h2>
            Who should be
            <br />
            <em>in the circle?</em>
          </h2>
        </div>
        <div>
          <p>
            Know an owner with a story worth telling? Introduce us. We’re
            looking for the people doing meaningful work.
          </p>
          <Link href="/nominate" className="home-button burgundy">
            Nominate a guest <ArrowUpRight size={18} />
          </Link>
          <Link href="/sponsors" className="partner-link">
            Partner with the show <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
