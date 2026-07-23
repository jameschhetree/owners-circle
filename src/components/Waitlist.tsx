"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { submitContact } from "@/lib/contact";

export type WaitlistIntent =
  | "Waitlist"
  | "Nominate a guest"
  | "Sponsor / Partner"
  | "Episodes"
  | "Newsletter"
  | "Events";

const INTENTS: WaitlistIntent[] = [
  "Waitlist",
  "Nominate a guest",
  "Sponsor / Partner",
  "Episodes",
  "Newsletter",
  "Events",
];

const COPY: Record<
  WaitlistIntent,
  { headingLead: string; headingEm: string; submit: string; sub: string }
> = {
  Waitlist: {
    headingLead: "Join the",
    headingEm: "circle.",
    submit: "Join the circle",
    sub: "One list for the people building. Drop your name and email.",
  },
  "Nominate a guest": {
    headingLead: "Nominate a",
    headingEm: "guest.",
    submit: "Submit nomination",
    sub: "Tell us who belongs at the table. Drop your name, email, and who you'd nominate.",
  },
  "Sponsor / Partner": {
    headingLead: "Sponsor /",
    headingEm: "Partner.",
    submit: "Send inquiry",
    sub: "For brands building alongside us. Drop your name and email and we'll reach out.",
  },
  Episodes: {
    headingLead: "Get notified on new",
    headingEm: "episodes.",
    submit: "Notify me",
    sub: "We'll send each new drop straight to your inbox.",
  },
  Newsletter: {
    headingLead: "Subscribe to",
    headingEm: "Owner's Notes.",
    submit: "Subscribe",
    sub: "Lessons and field notes from inside the circle. Weekly.",
  },
  Events: {
    headingLead: "Join the",
    headingEm: "events list.",
    submit: "Save my seat",
    sub: "First access to gatherings, tapings, and dinners.",
  },
};

const EASE = [0.16, 1, 0.3, 1] as const;

interface Ctx {
  open: (intent?: WaitlistIntent, source?: string) => void;
}

const WaitlistContext = createContext<Ctx | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used within WaitlistProvider");
  return ctx;
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [intent, setIntent] = useState<WaitlistIntent>("Waitlist");
  const [source, setSource] = useState("Waitlist");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const open = useCallback(
    (i: WaitlistIntent = "Waitlist", src?: string) => {
      setIntent(i);
      setSource(src || i);
      setSubmitted(false);
      setIsOpen(true);
    },
    []
  );

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const intentValue = (form.elements.namedItem("intent") as HTMLSelectElement)
      .value;
    const message =
      (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";

    const composedMessage = message
      ? `Intent: ${intentValue}\n\n${message}`
      : `Intent: ${intentValue}`;
    const composedSource = source ? `${source} (${intentValue})` : intentValue;
    const data = { name, email, intent: intentValue, message, source };

    try {
      await submitContact({
        name,
        email,
        message: composedMessage,
        source: composedSource,
      });
    } catch {
      // submitContact never throws (returns {success:false} instead)
    } finally {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `oc-waitlist-${Date.now()}`,
          JSON.stringify({ ...data, timestamp: new Date().toISOString() })
        );
      }
      setSubmitted(true);
      setLoading(false);
    }
  }

  const backdropMotion = reduce
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.4, ease: EASE },
      };

  const panelMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 36, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 24, scale: 0.99 },
        transition: { duration: 0.6, ease: EASE },
      };

  return (
    <WaitlistContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="oc-wl-backdrop"
            className="oc-wl-backdrop"
            onClick={close}
            {...backdropMotion}
          >
            <motion.div
              key="oc-wl-panel"
              className="oc-wl-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Join Owner's Circle"
              onClick={(e) => e.stopPropagation()}
              {...panelMotion}
            >
              <button
                aria-label="Close"
                className="oc-wl-close"
                onClick={close}
              >
                Close
              </button>

              {submitted ? (
                <div style={{ padding: "26px 0 6px" }}>
                  <p
                    className="serif"
                    style={{
                      fontSize: "32px",
                      color: "var(--burgundy)",
                      marginBottom: "12px",
                      lineHeight: 1.15,
                    }}
                  >
                    You&apos;re in.
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "var(--espresso)",
                      opacity: 0.7,
                      lineHeight: 1.65,
                    }}
                  >
                    We&apos;ve got it. Watch your inbox -- we&apos;ll be in touch.
                  </p>
                  <button
                    className="pill"
                    style={{ marginTop: "30px" }}
                    onClick={close}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div
                    className="gold-divider"
                    style={{ marginBottom: "20px" }}
                  />
                  <h2
                    className="serif"
                    style={{
                      fontSize: "clamp(28px, 4vw, 38px)",
                      lineHeight: 1.1,
                      color: "var(--burgundy)",
                      marginBottom: "10px",
                    }}
                  >
                    {COPY[intent].headingLead}{" "}
                    <em className="serif-it" style={{ color: "var(--burgundy-deep)" }}>
                      {COPY[intent].headingEm}
                    </em>
                  </h2>
                  <p
                    style={{
                      fontSize: "14.5px",
                      lineHeight: 1.65,
                      color: "var(--espresso)",
                      opacity: 0.65,
                      marginBottom: "30px",
                      maxWidth: "440px",
                    }}
                  >
                    {COPY[intent].sub}
                  </p>

                  <form onSubmit={handleSubmit} className="oc-form">
                    <div>
                      <label className="oc-label" style={{ color: "var(--espresso)" }}>Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="oc-input"
                        placeholder="Your full name"
                        style={{
                          border: "1px solid var(--taupe)",
                          background: "#fff",
                          color: "var(--espresso)",
                        }}
                      />
                    </div>
                    <div>
                      <label className="oc-label" style={{ color: "var(--espresso)" }}>Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="oc-input"
                        placeholder="you@company.com"
                        style={{
                          border: "1px solid var(--taupe)",
                          background: "#fff",
                          color: "var(--espresso)",
                        }}
                      />
                    </div>
                    <div>
                      <label className="oc-label" style={{ color: "var(--espresso)" }}>
                        What are you here for?
                      </label>
                      <select
                        name="intent"
                        className="oc-input"
                        value={intent}
                        onChange={(e) =>
                          setIntent(e.target.value as WaitlistIntent)
                        }
                        style={{
                          border: "1px solid var(--taupe)",
                          background: "#fff",
                          color: "var(--espresso)",
                        }}
                      >
                        {INTENTS.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="oc-label" style={{ color: "var(--espresso)" }}>
                        Anything to add? (optional)
                      </label>
                      <textarea
                        name="message"
                        className="oc-input"
                        placeholder="A line about you, who you'd nominate, or how you'd partner."
                        style={{
                          height: "92px",
                          border: "1px solid var(--taupe)",
                          background: "#fff",
                          color: "var(--espresso)",
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="pill"
                      disabled={loading}
                      style={{ alignSelf: "flex-start", marginTop: "4px" }}
                    >
                      {loading ? "Sending..." : COPY[intent].submit}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .oc-wl-backdrop {
          position: fixed;
          inset: 0;
          z-index: 500;
          background: rgba(76, 58, 51, 0.4);
          backdrop-filter: blur(10px) saturate(120%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .oc-wl-panel {
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 16px;
          border: 1px solid var(--taupe);
          background: var(--ivory);
          padding: clamp(32px, 5vw, 48px);
          position: relative;
          box-shadow: 0 40px 100px -30px rgba(76, 58, 51, 0.3);
        }
        .oc-wl-close {
          position: absolute;
          top: 20px;
          right: 22px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--espresso);
          opacity: 0.5;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          transition: opacity 0.3s ease;
        }
        .oc-wl-close:hover { opacity: 1; }
      `}</style>
    </WaitlistContext.Provider>
  );
}

export function WaitlistButton({
  children,
  intent = "Waitlist",
  source,
  variant = "pill",
  className,
  style,
  onClick,
}: {
  children: ReactNode;
  intent?: WaitlistIntent;
  source?: string;
  variant?: "pill" | "pill-outline on-field" | "pill-outline on-paper";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const { open } = useWaitlist();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open(intent, source);
      }}
      className={className ?? variant}
      style={style}
    >
      {children}
    </button>
  );
}
