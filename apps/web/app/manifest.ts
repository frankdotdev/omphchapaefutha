import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name}, ${SITE.designation}`,
    short_name: "OMPH",
    description: SITE.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f3ea",
    theme_color: "#183b63",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
