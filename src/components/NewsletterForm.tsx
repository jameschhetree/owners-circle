"use client";

import { WaitlistButton } from "@/components/Waitlist";

interface NewsletterFormProps {
  variant?: "full" | "inline";
  tone?: "burgundy" | "paper";
}

export function NewsletterForm({
  variant = "full",
  tone = "paper",
}: NewsletterFormProps) {
  const onBurgundy = tone === "burgundy";

  if (variant === "inline") {
    return (
      <div className="news-form news-form-cta">
        <span className="news-form-hint">Get Owner&apos;s Notes, weekly</span>
        <WaitlistButton intent="Newsletter" source="Newsletter inline">
          Subscribe
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
            color: rgba(76, 58, 51, 0.5);
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
          color: onBurgundy ? "rgba(245,239,229,0.72)" : "var(--espresso)",
          opacity: onBurgundy ? 1 : 0.7,
          maxWidth: "440px",
        }}
      >
        Lessons, stories, and opportunities from inside the circle. Subscribe
        free and we&apos;ll keep you close.
      </p>
      <WaitlistButton
        intent="Newsletter"
        source="Newsletter page"
        className="pill"
        style={{ alignSelf: "flex-start", marginTop: "4px" }}
      >
        Subscribe Free
      </WaitlistButton>
    </div>
  );
}
