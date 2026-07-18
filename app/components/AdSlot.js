"use client";

import { useEffect } from "react";
import { adsConfig, adReady } from "../../lib/adsConfig";

// Shows a Google AdSense ad in the given slot.
// If ads are off or the slot is empty, it renders nothing (no gap, no break).
export default function AdSlot({ slot, className = "" }) {
  const ready = adReady(slot);

  useEffect(() => {
    if (!ready) return;
    try {
      // Tell AdSense to fill this unit.
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [ready]);

  if (!ready) return null;

  return (
    <div className={"mx-auto w-full max-w-3xl px-6 " + className}>
      <div className="overflow-hidden rounded-xl">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adsConfig.adsenseClient}
          data-ad-slot={adsConfig.slots[slot]}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
