"use client";

import { useEffect, useState } from "react";
import { Emblem } from "./Emblem";
import { LOGO_SRC } from "@/lib/site";

/**
 * Shows the placeholder emblem by default and swaps to the approved Marian image only once it has
 * actually loaded from LOGO_SRC, so a missing file never renders a broken-image icon.
 */
export function Logo() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setLoaded(true);
    img.src = LOGO_SRC;
  }, []);
  if (!loaded) return <Emblem />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={LOGO_SRC} alt="" width={40} height={40} style={{ width: "2.4rem", height: "2.4rem", objectFit: "contain", borderRadius: "50%" }} />;
}
