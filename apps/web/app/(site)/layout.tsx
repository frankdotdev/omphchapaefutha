import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegisterSW } from "@/components/layout/RegisterSW";
import { NoticeStrip } from "@/components/layout/NoticeStrip";
import { AskPadreChatbot } from "@/components/ask/AskPadreChatbot";
import { UrgentNoticeModal } from "@/components/ui/UrgentNoticeModal";
import { getDataClient } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const announcements = await getDataClient().getAnnouncements(10).catch(() => []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <NoticeStrip />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <UrgentNoticeModal announcements={announcements} />
      <AskPadreChatbot />
      <RegisterSW />
    </>
  );
}
