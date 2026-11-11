import { Suspense } from "react";
import type { Metadata } from "next";
import { ProjectorView } from "@/components/projector/ProjectorView";

export const metadata: Metadata = {
  title: "Church Projector Mode — Live Mass Broadcast",
  description:
    "High-contrast, large-font church projector display for Daily Mass Readings, Order of Mass (English, Latin, Igbo), Choir Hymns, and Intentions.",
};

export default function ProjectorPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            background: "#05070a",
            color: "#eab308",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "serif",
            fontSize: "1.5rem",
          }}
        >
          Initializing Church Projector Mode...
        </div>
      }
    >
      <ProjectorView />
    </Suspense>
  );
}
