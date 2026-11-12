import { redirect } from "next/navigation";

export default function BulkAnnouncementsRedirect() {
  redirect("/admin/announcements");
}
