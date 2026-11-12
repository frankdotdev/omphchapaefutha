import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { CatechistBulkAnnouncements } from "@/components/announcements/CatechistBulkAnnouncements";

export const metadata: Metadata = {
  title: "Catechist Announcement Portal — Single-Box Sunday Notices",
  description:
    "Type or paste all Sunday Mass announcements into a single box. The system automatically structures, formats, and publishes them to the Church Projector and Website.",
};

export default function BulkAnnouncementsPage() {
  return (
    <>
      <PageHead
        title="Catechist Announcement Dashboard"
        latin="Praedicate Evangelium"
        image={{ src: "/images/art/church-interior.jpg", position: "center 30%" }}
        lede="One-box announcement editor for Sunday Masses. Type or paste all notices at once; the system formats them for the Church Projector and Website."
        crumbs={[{ href: "/announcements", label: "Announcements" }]}
      />

      <section className="section">
        <div className="wrap">
          <CatechistBulkAnnouncements />
        </div>
      </section>
    </>
  );
}
