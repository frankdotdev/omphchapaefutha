import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHead } from "@/components/ui/PageHead";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHead title="Page not found" lede="We could not find the page you were looking for." />
        <section className="section"><div className="wrap"><Link className="btn" href="/">Return home</Link></div></section>
      </main>
      <Footer />
    </>
  );
}
