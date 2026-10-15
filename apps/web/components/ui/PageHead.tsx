import Link from "next/link";
import { Inscription } from "@/components/art/Art";

export function PageHead({ title, lede, crumbs, latin, image }: { title: string; lede?: string; crumbs?: { href: string; label: string }[]; latin?: string; image?: { src: string; position?: string } }) {
  return (
    <div
      className={`page-head has-inscription ${image ? "has-photo" : "pattern-quatrefoil"}`}
      style={image ? ({ ["--ph-img" as string]: `url(${image.src})`, ["--ph-pos" as string]: image.position ?? "center" } as React.CSSProperties) : undefined}
    >
      {latin && <Inscription>{latin}</Inscription>}
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs?.map((c) => (
            <span key={c.href}> / <Link href={c.href}>{c.label}</Link></span>
          ))}
        </nav>
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
    </div>
  );
}

export function Awaiting({ children }: { children: React.ReactNode }) {
  return <div className="awaiting" role="note">{children}</div>;
}
