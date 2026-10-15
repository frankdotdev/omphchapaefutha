import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/ui/PageHead";

export const metadata: Metadata = { title: "You are offline", robots: { index: false } };

export default function Offline() {
  return (
    <>
      <PageHead title="You are offline" latin="Dominus vobiscum" lede="This page is not available without a connection." />
      <section className="section"><div className="wrap narrow">
        <p>Pages you have visited before may still open. Please check your connection and <Link href="/">return to the home page</Link>.</p>
      </div></section>
    </>
  );
}
