/** Visible keyboard focus ring shared by interactive elements. */
export const focusRingClassName =
  "focus-visible:outline-2 focus-visible:outline-focus-ring";

/** Accent text link with a 44px touch target (back links, inline actions). */
export const accentActionLinkClassName = `inline-flex items-center min-h-[44px] text-small font-medium text-accent hover:underline ${focusRingClassName}`;
