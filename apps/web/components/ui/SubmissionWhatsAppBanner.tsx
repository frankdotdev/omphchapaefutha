"use client";

import { MessageSquare, Megaphone, CalendarPlus } from "lucide-react";

export function SubmissionWhatsAppBanner({
  type = "announcement",
}: {
  type?: "announcement" | "event";
}) {
  const catechistPhone = "08063314891";
  const chaplainPhone = "0904469505";

  const isEvent = type === "event";

  const catechistMsg = isEvent
    ? `Peace of Christ Catechist,

I would like to submit an upcoming event for the Chaplaincy calendar and website:
• Event Title:
• Organizing Body / Society:
• Date & Time:
• Venue:
• Description / Target Audience:

Kindly review for publication. Thank you!`
    : `Peace of Christ Catechist,

I would like to submit an announcement for the Sunday bulletin and Chaplaincy website:
• Notice Title:
• Issued By (Society/Ministry):
• Announcement Body:
• Any relevant date/deadline:

Kindly review for publication. Thank you!`;

  const chaplainMsg = isEvent
    ? `Peace of Christ Father,

I would like to submit an upcoming event for the Chaplaincy calendar and website:
• Event Title:
• Organizing Body / Society:
• Date & Time:
• Venue:
• Description:

Kindly review for pastoral blessing and publication. Thank you!`
    : `Peace of Christ Father,

I would like to submit an announcement for the Sunday bulletin and Chaplaincy website:
• Notice Title:
• Issued By (Society/Ministry):
• Details:

Kindly review for pastoral blessing and publication. Thank you!`;

  const catechistUrl = `https://wa.me/2348063314891?text=${encodeURIComponent(catechistMsg)}`;
  const chaplainUrl = `https://wa.me/234904469505?text=${encodeURIComponent(chaplainMsg)}`;

  return (
    <div
      style={{
        background: "var(--paper)",
        border: "2px solid var(--gold)",
        borderRadius: "8px",
        padding: "clamp(1.2rem, 3vw, 1.75rem)",
        margin: "2.5rem 0 1.5rem",
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
        {isEvent ? (
          <CalendarPlus size={22} color="var(--marian)" />
        ) : (
          <Megaphone size={22} color="var(--marian)" />
        )}
        <h3 style={{ margin: 0, fontSize: "1.25rem", color: "var(--navy)" }}>
          {isEvent ? "Have an Upcoming Event to Publish?" : "Submit an Announcement or Society Notice"}
        </h3>
      </div>

      <p className="muted" style={{ fontSize: "0.92rem", lineHeight: 1.5, margin: "0.3rem 0 1.25rem" }}>
        All notices, society meetings, banns, and apostolate events are reviewed and verified by the chaplaincy pastoral
        office before publication. Click below to submit your details directly via WhatsApp.
      </p>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <a
          href={catechistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{ background: "#25D366", borderColor: "#22c55e", color: "#fff", display: "inline-flex", alignItems: "center", gap: "0.45rem", fontSize: "0.88rem", padding: "0.55rem 1rem" }}
        >
          <MessageSquare size={16} />
          Submit to Catechist (08063314891)
        </a>

        <a
          href={chaplainUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{ background: "#128C7E", borderColor: "#0f766e", color: "#fff", display: "inline-flex", alignItems: "center", gap: "0.45rem", fontSize: "0.88rem", padding: "0.55rem 1rem" }}
        >
          <MessageSquare size={16} />
          Submit to Chaplain (0904469505)
        </a>
      </div>
    </div>
  );
}
