"use client";

import { WaitlistButton } from "@/components/Waitlist";

/**
 * Consolidated into THE single shared site-wide form. This is no longer a
 * parallel form — it opens the shared waitlist modal with the
 * "Nominate a guest" intent preset (visitor can change it, and add the
 * nominee in the message field).
 */
export function GuestNominationForm() {
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
        One form for everyone building the circle. Tell us who you are, drop
        the nominee&apos;s name and why they belong, and we&apos;ll take it
        from there.
      </p>
      <WaitlistButton
        intent="Nominate a guest"
        source="Nominate page"
        className="pill"
        style={{ alignSelf: "flex-start", marginTop: "4px" }}
      >
        Nominate a Guest
      </WaitlistButton>
    </div>
  );
}
