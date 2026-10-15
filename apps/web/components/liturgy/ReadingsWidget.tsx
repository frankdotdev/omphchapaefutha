"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";

const SCRIPT = "https://cdn1.catholicgallery.org/wp-content/uploads/widgets/rich-card/cg_mrc_widget.js";
const PAGE = "https://catholicgallery.org";

/**
 * Third-party Mass readings widget (Catholic Gallery).
 * Uses allow-same-origin in sandbox so that localStorage and DOM initialization succeed.
 */
export function ReadingsWidget() {
  const [on, setOn] = useState(true);

  const doc = `<!doctype html><html><head><meta charset="utf-8"><base target="_blank"><style>body{margin:0;padding:12px;font-family:system-ui,-apple-system,BlinkMacSystemFont,sans-serif;color:#1e293b;line-height:1.6}h1,h2,h3{color:#00205b}.cg_mrc_widget{min-height:220px}</style></head><body><div id="cg_mrc_widget" class="cg_mrc_widget"></div><script src="${SCRIPT}"></script></body></html>`;

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--line)",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <h3 style={{ margin: 0, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--navy)" }}>
            <BookOpen size={18} style={{ color: "var(--gold-text)" }} /> Catholic Daily Readings Widget
          </h3>
          <button
            type="button"
            className="link-btn"
            onClick={() => setOn((v) => !v)}
            style={{ fontSize: "0.82rem" }}
          >
            {on ? "Refresh widget" : "Load widget"}
          </button>
        </div>

        {on ? (
          <div>
            <iframe
              className="widget-frame"
              title="Mass readings from Catholic Gallery"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              srcDoc={doc}
              style={{
                width: "100%",
                height: "32rem",
                border: "1px solid var(--line)",
                borderRadius: "6px",
                background: "#fff",
              }}
            />
            <p className="muted small" style={{ marginTop: "0.5rem" }}>
              Provided by <a href={PAGE} rel="noopener noreferrer" target="_blank">Catholic Gallery</a>.
              If content does not load due to ad-blockers or browser privacy shields, use the direct publisher link above.
            </p>
          </div>
        ) : (
          <div className="ask-notice">
            <p>Widget is currently paused.</p>
            <button type="button" className="btn" onClick={() => setOn(true)}>Load readings widget</button>
          </div>
        )}
      </div>
    </div>
  );
}
