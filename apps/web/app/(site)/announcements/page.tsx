import type { Metadata } from "next";
import { getDataClient } from "@/lib/data";
import { PageHead } from "@/components/ui/PageHead";
import { SubmissionWhatsAppBanner } from "@/components/ui/SubmissionWhatsAppBanner";
import { AnnouncementsListClient } from "@/components/announcements/AnnouncementsListClient";

export const metadata: Metadata = {
  title: "Announcements — Chaplaincy Notices & Pastoral Bulletins",
  description: "Official weekly announcements and notices from Our Mother of Perpetual Help Catholic Chaplaincy, AE-FUTHA.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AnnouncementsPage() {
  const items = await getDataClient().getAnnouncements(50);

  return (
    <>
      <PageHead
        title="Announcements"
        latin="Verbum Domini"
        lede="Official weekly pastoral notices, apostolate announcements, and community bulletins."
      />
      <section className="section">
        <div className="wrap" style={{ maxWidth: "56rem" }}>
          <AnnouncementsListClient initialAnnouncements={items} />

          {/* WhatsApp Submission Banner */}
          <div style={{ marginTop: "3rem" }}>
            <SubmissionWhatsAppBanner type="announcement" />
          </div>
        </div>
      </section>
    </>
  );
}
