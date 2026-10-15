import Link from "next/link";
import { getDataClient } from "@/lib/data";
import { SITE } from "@/lib/site";
import { CrossDivider } from "@/components/art/Art";

export async function Footer() {
  const contact = await getDataClient().getContact();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer pattern-lattice">
      <div className="wrap">
        <CrossDivider className="ornament" />
        <p className="footer-motto" lang="la">Mater de Perpetuo Succursu, ora pro nobis</p>
        <div className="footer-grid">
          <div>
            <p className="footer-name">Our Mother of Perpetual Help Chaplaincy</p>
            <p style={{ letterSpacing: "0.18em", fontWeight: 700, fontSize: "0.8rem", color: "var(--gold)" }}>{SITE.designation}</p>
            {contact.address || contact.phone || contact.email ? (
              <address style={{ fontStyle: "normal" }}>
                {contact.address && <div>{contact.address}</div>}
                {contact.phone && <div>{contact.phone}</div>}
                {contact.email && <div><a href={`mailto:${contact.email}`}>{contact.email}</a></div>}
              </address>
            ) : (
              <p style={{ fontSize: "0.95rem" }}>Contact details will be published once confirmed by the chaplaincy office.</p>
            )}
          </div>
          <nav aria-label="Worship and prayer">
            <h2>Worship</h2>
            <ul>
              <li><Link href="/mass-schedule">Mass schedule</Link></li>
              <li><Link href="/announcements">Announcements</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/sacraments">The sacraments</Link></li>
              <li><Link href="/doctrine">Questions and answers</Link></li>
              <li><Link href="/ask">Ask a Padre</Link></li>
              <li><Link href="/sacred-art">Sacred art</Link></li>
            </ul>
          </nav>
          <nav aria-label="Community">
            <h2>Community</h2>
            <ul>
              <li><Link href="/about">About the chaplaincy</Link></li>
              <li><Link href="/societies">Societies</Link></li>
              <li><Link href="/leadership">Leadership</Link></li>
              <li><Link href="/ecclesiastical-communion">In communion with the Church</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
        <div className="footer-base" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.75rem" }}>
          <div>
            © {year} {SITE.name}, {SITE.designation}. <Link href="/privacy">Privacy</Link> · <Link href="/accessibility">Accessibility</Link>
          </div>
          <div style={{ fontSize: "0.9rem" }}>
            Built by <a href="https://frankoge.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}>Frank Oge</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
