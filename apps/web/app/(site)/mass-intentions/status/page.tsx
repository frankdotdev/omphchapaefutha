import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { StatusLookup } from "@/components/forms/StatusLookup";

export const metadata: Metadata = { title: "Check a Mass Intention" };

export default function StatusPage() {
  return (
    <>
      <PageHead title="Check a Mass Intention" lede="Enter the reference number you were given." crumbs={[{ href: "/mass-intentions", label: "Mass Intentions" }]} />
      <section className="section"><div className="wrap"><StatusLookup /></div></section>
    </>
  );
}
