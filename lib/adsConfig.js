// ============================================================
//   ★ ADS SETTINGS ★  — turn ads on and set your codes here
// ============================================================
//
//  STEP 1 — Get approved by an ad network (e.g. Google AdSense).
//  STEP 2 — Come back here and fill in the values below.
//  STEP 3 — Set  enabled: false
//  STEP 4 — Upload to GitHub. Ads appear automatically.
//
//  While enabled is false, NO ads show and nothing breaks.
// ------------------------------------------------------------

export const adsConfig = {
  // Master switch. Keep false until you are approved and ready.
  enabled: false,

  // ---- Google AdSense ----
  // Your AdSense publisher ID, looks like: ca-pub-1234567890123456
  adsenseClient: "",

  // Ad slot IDs from AdSense (each ad unit you create gives you a number).
  // Leave blank to hide that slot. Example: "1234567890"
  slots: {
    afterHero: "",     // ad shown just below the top downloader
    inContent: "",     // ad shown in the middle of the homepage
    beforeFooter: "",  // ad shown near the bottom of the homepage
    infoPage: "",      // ad shown on About/Contact/Privacy/DMCA/Terms
  },
};

// ---- helper: is a given slot ready to show? ----
export function adReady(slotKey) {
  return Boolean(
    adsConfig.enabled &&
      adsConfig.adsenseClient &&
      adsConfig.slots[slotKey]
  );
}
