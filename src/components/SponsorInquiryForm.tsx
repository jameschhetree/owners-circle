"use client";

import { WaitlistButton } from "@/components/Waitlist";

/**
 * Consolidated into THE single shared site-wide form. Opens the shared
 * waitlist modal with the "Sponsor / Partner" intent preset.
 */
export function SponsorInquiryForm() {
  return (
    <div className="oc-form">
      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.7,
          color: "rgba(243,236,225,0.72)",
          maxWidth: "440px",
        }}
      >
        One form, one conversation. Tell us who you are and how you&apos;d
        like to partner across the podcast, newsletter, and live events —
        we&apos;ll be in touch with the details.
      </p>
      <WaitlistButton
        intent="Sponsor / Partner"
        source="Sponsors page"
        className="pill"
        style={{ alignSelf: "flex-start", marginTop: "4px" }}
      >
        Start the Conversation
      </WaitlistButton>
    </div>
  );
}
