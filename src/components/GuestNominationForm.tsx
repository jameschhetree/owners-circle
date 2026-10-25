"use client";

import { WaitlistButton } from "@/components/Waitlist";

export function GuestNominationForm() {
  return (
    <div className="oc-form">
      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.7,
          color: "rgba(245,239,229,0.72)",
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
        style={{ alignSelf: "flex-start", marginTop: "4px", background: "var(--gold)", color: "var(--burgundy-deep)" }}
      >
        Nominate a Guest
      </WaitlistButton>
    </div>
  );
}
