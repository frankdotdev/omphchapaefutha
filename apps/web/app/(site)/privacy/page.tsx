import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/ui/PageHead";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHead title="Privacy" latin="Custodi me" lede="What this website collects, why, and who can see it." />
      <section className="section">
        <div className="wrap narrow">
          <p className="muted small">This notice describes how the site is built. The chaplaincy should have it reviewed against the Nigeria Data Protection Act 2023 before it is treated as final.</p>
          <h2>What we collect</h2>
          <ul>
            <li><strong>Mass intentions:</strong> the name of the person or intention, the dates requested and your contact details so the office can reach you.</li>
            <li><strong>Prayer requests:</strong> the text you send. Requests are reviewed by the chaplaincy before anything is shown publicly. Please avoid sharing health details about other people without their consent.</li>
            <li><strong>Contact messages:</strong> your name, your contact details and your message.</li>
            <li><strong>Ask a Padre:</strong> your question. It is searched against our own library; if no match is found it may be sent to an external service (Magisterium) to prepare an answer. Please do not include personal details.</li>
          </ul>
          <h2>Who can see it</h2>
          <p>Only authorised chaplaincy staff, according to their role. Data is stored with our hosting and database provider, which acts on our behalf. We do not sell personal information and do not use advertising trackers.</p>
          <h2>Cookies and browser storage</h2>
          <p>The public pages set no tracking cookies. Your browser may store your chosen language, and, if you install the site, a cache of pages so they can open offline. Staff who sign in to the admin area have a sign-in session stored in their browser.</p>
          <h2>Other websites</h2>
          <p>The readings widget on the Readings page loads content from Catholic Gallery only if you choose to load it. Links to other sites are governed by their own policies.</p>
          <h2>Your choices</h2>
          <p>You may ask to see, correct or delete what you have sent us. Please <Link href="/contact">contact the chaplaincy office</Link>.</p>
        </div>
      </section>
    </>
  );
}
