import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${SITE.name}, ${SITE.designation}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  manifest: "/manifest.webmanifest",
  openGraph: { siteName: SITE.name, type: "website", locale: "en_NG" },
};

export const viewport: Viewport = { themeColor: "#183b63", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
