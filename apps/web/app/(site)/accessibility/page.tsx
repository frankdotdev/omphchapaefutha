import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/ui/PageHead";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <>
      <PageHead title="Accessibility" latin="Omnibus omnia" lede="Our aim is a site everyone in the parish family can use." />
      <section className="section">
        <div className="wrap narrow">
          <p>We build to the Web Content Accessibility Guidelines (WCAG) 2.2 level AA as a goal. We have not had the site audited by an independent specialist, so we do not claim full conformance.</p>
          <h2>What we do</h2>
          <ul>
            <li>Keyboard access to all pages, with a skip link and visible focus.</li>
            <li>Headings, landmarks and labelled forms for screen readers.</li>
            <li>Text that scales and layouts that adapt to small screens.</li>
            <li>Colour contrast checked for text, and meaning never carried by colour alone.</li>
            <li>The home page slideshow can be paused and respects the reduced-motion setting.</li>
            <li>Text alternatives for images.</li>
          </ul>
          <h2>Known limits</h2>
          <ul>
            <li>Translations into Igbo, Hausa and Yoruba cover only the navigation and are awaiting review by native speakers.</li>
            <li>Some images are older or small scans of artworks and may look soft.</li>
          </ul>
          <h2>Tell us about a problem</h2>
          <p>If something is hard to use, please <Link href="/contact">contact the chaplaincy office</Link> and describe the page and what went wrong. We will try to help and to fix it.</p>
        </div>
      </section>
    </>
  );
}
