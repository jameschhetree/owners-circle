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

/**
 * THE singular site-wide capture form. Every CTA on the site opens this
 * one shared modal — there are no parallel forms. The "What are you here
 * for?" select auto-presets to whichever button opened it but the visitor
 * can change it. Submissions POST to /api/waitlist (delivered to
 * jchhetree@gmail.com via FormSubmit).
 */

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

/**
 * Per-intent verbiage map. The form architecture / endpoint / styling are
 * shared; only the visible copy adapts to whichever CTA opened the modal.
 * The visitor can still change the intent select after open.
 */
const COPY: Record<
  WaitlistIntent,
  { headingLead: string; headingEm: string; submit: string; sub: string }
> = {
  Waitlist: {
    headingLead: "Join the",
    headingEm: "waitlist.",
    submit: "Join the waitlist",
    sub: "One list for the people building. Drop your name + email.",
  },
  "Nominate a guest": {
    headingLead: "Nominate a",
    headingEm: "guest.",
    submit: "Submit nomination",
    sub: "Tell us who belongs at the table. Drop your name + email and who you'd nominate.",
  },
  "Sponsor / Partner": {
    headingLead: "Sponsor /",
    headingEm: "Partner.",
    submit: "Send inquiry",
    sub: "For brands building alongside us. Drop your name + email and we'll reach out.",
  },
  Episodes: {
    headingLead: "Get notified on new",
    headingEm: "episodes.",
    submit: "Notify me",
    sub: "We'll send each new drop straight to your inbox. Drop your name + email.",
  },
  Newsletter: {
    headingLead: "Subscribe to the",
    headingEm: "newsletter.",
    submit: "Subscribe",
    sub: "Field notes from the circle. Drop your name + email.",
  },
  Events: {
    headingLead: "Join the",
    headingEm: "events list.",
    submit: "Save my seat",
    sub: "First access to gatherings, tapings, and dinners. Drop your name + email.",
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

    // All site forms funnel through /api/contact via submitContact(). The
    // "intent" select is preserved in the message body so context isn't lost.
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
      // submitContact never throws (returns {success:false} instead), but
      // belt-and-suspenders — we still want the optimistic confirmation UI.
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
              className="oc-wl-panel on-field-sec"
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
                      color: "var(--bone)",
                      marginBottom: "12px",
                      lineHeight: 1.15,
                    }}
                  >
                    You&apos;re on the list.
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "rgba(243,236,225,0.66)",
                      lineHeight: 1.65,
                    }}
                  >
                    We&apos;ve got it. Watch your inbox — we&apos;ll be in touch
                    as the circle opens.
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
                  <span
                    className="tag"
                    style={{
                      color: "var(--ember)",
                      display: "block",
                      marginBottom: "16px",
                    }}
                  >
                    Owner&apos;s Circle
                  </span>
                  <h2
                    className="serif"
                    style={{
                      fontSize: "clamp(28px,4vw,40px)",
                      lineHeight: 1.1,
                      color: "var(--bone)",
                      marginBottom: "10px",
                    }}
                  >
                    {COPY[intent].headingLead}{" "}
                    <em className="serif-it" style={{ color: "var(--ember)" }}>
                      {COPY[intent].headingEm}
                    </em>
                  </h2>
                  <p
                    style={{
                      fontSize: "14.5px",
                      lineHeight: 1.65,
                      color: "rgba(243,236,225,0.62)",
                      marginBottom: "30px",
                      maxWidth: "440px",
                    }}
                  >
                    {COPY[intent].sub}
                  </p>

                  <form onSubmit={handleSubmit} className="oc-form">
                    <div>
                      <label className="oc-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="oc-input"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="oc-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="oc-input"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="oc-label">
                        What are you here for?
                      </label>
                      <select
                        name="intent"
                        className="oc-input"
                        value={intent}
                        onChange={(e) =>
                          setIntent(e.target.value as WaitlistIntent)
                        }
                      >
                        {INTENTS.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="oc-label">
                        Anything to add? (optional)
                      </label>
                      <textarea
                        name="message"
                        className="oc-input"
                        placeholder="A line about you, who you'd nominate, or how you'd partner."
                        style={{ height: "92px" }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="pill"
                      disabled={loading}
                      style={{ alignSelf: "flex-start", marginTop: "4px" }}
                    >
                      {loading ? "Sending…" : COPY[intent].submit}
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
          background: rgba(28,8,6,0.62);
          backdrop-filter: blur(8px) saturate(120%);
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
          border-radius: 20px;
          border: 1px solid rgba(243,236,225,0.18);
          background:
            radial-gradient(130% 120% at 78% 18%, var(--field-hi), var(--field) 58%, var(--field-lo) 100%);
          padding: clamp(32px,5vw,52px);
          position: relative;
          box-shadow: 0 60px 120px -40px rgba(20,4,3,0.8);
        }
        .oc-wl-close {
          position: absolute;
          top: 22px;
          right: 24px;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(243,236,225,0.55);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        .oc-wl-close:hover { color: var(--bone); }
      `}</style>
    </WaitlistContext.Provider>
  );
}

/** Reusable CTA button — every call-to-action site-wide uses this. */
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
