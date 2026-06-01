"use client";

import { WaitlistButton } from "@/components/Waitlist";

/**
 * The newsletter signup is no longer a parallel form — per the single
 * shared-form requirement it opens THE site-wide waitlist modal with the
 * "Newsletter" intent preset. The inline variant keeps the pill-input
 * silhouette so the section layout is unchanged; the email field simply
 * launches the shared modal (which collects email + name + intent).
 */
interface NewsletterFormProps {
  variant?: "full" | "inline";
  tone?: "field" | "paper";
}

export function NewsletterForm({
  variant = "full",
  tone = "paper",
}: NewsletterFormProps) {
  const onField = tone === "field";

  if (variant === "inline") {
    return (
      <div className="news-form news-form-cta">
        <span className="news-form-hint">Get Inside the Circle, weekly</span>
        <WaitlistButton intent="Newsletter" source="Newsletter inline">
          Join the Waitlist
        </WaitlistButton>
        <style>{`
          .news-form-cta {
            align-items: center;
            padding-left: 22px;
            gap: 16px;
          }
          .news-form-hint {
            flex: 1;
            font-size: 13px;
            color: rgba(28,20,16,0.5);
            letter-spacing: 0.01em;
          }
          .news-form-cta button { border-radius: 999px; }
          @media (max-width: 900px) {
            .news-form-cta { padding: 18px 18px; flex-direction: column; gap: 14px; }
            .news-form-hint { flex: none; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="oc-form">
      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.7,
          color: onField ? "rgba(243,236,225,0.7)" : "#5a4a3c",
          maxWidth: "440px",
        }}
      >
        One list for the people building — the newsletter, the room, and
        what comes next. Join the waitlist and we&apos;ll keep you close.
      </p>
      <WaitlistButton
        intent="Newsletter"
        source="Newsletter page"
        className="pill"
        style={{ alignSelf: "flex-start", marginTop: "4px" }}
      >
        Join the Waitlist
      </WaitlistButton>
    </div>
  );
}
