"use client";

import { WaitlistButton } from "@/components/Waitlist";

export function EventWaitlistForm() {
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
        Owner&apos;s Circle Live is coming. Get on the list and we&apos;ll
        reach out the moment we have a date and a room.
      </p>
      <WaitlistButton
        intent="Events"
        source="Events page"
        className="pill"
        style={{ alignSelf: "flex-start", marginTop: "4px", background: "var(--gold)", color: "var(--burgundy-deep)" }}
      >
        Join the Event Waitlist
      </WaitlistButton>
    </div>
  );
}
