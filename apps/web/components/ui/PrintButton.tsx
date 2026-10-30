"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn secondary"
      style={{ fontSize: "0.88rem", padding: "0.55rem 1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
      title="Print Daily Mass Sheet for the Sanctuary"
    >
      <Printer size={16} />
      Print Mass Sheet
    </button>
  );
}
