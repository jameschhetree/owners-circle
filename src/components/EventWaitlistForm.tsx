"use client";

import { WaitlistButton } from "@/components/Waitlist";

/**
 * Consolidated into THE single shared site-wide form. Opens the shared
 * waitlist modal with the "Events" intent preset.
 */
export function EventWaitlistForm() {
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
        Owner&apos;s Circle Live is coming. Get on the list and we&apos;ll
        reach out the moment we have a date and a room.
      </p>
      <WaitlistButton
        intent="Events"
        source="Events page"
        className="pill"
        style={{ alignSelf: "flex-start", marginTop: "4px" }}
      >
        Join the Event Waitlist
      </WaitlistButton>
    </div>
  );
}
