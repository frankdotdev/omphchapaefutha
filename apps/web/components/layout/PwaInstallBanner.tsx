"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, X, Smartphone, Share2, Check } from "lucide-react";

export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone/installed mode
    if (typeof window !== "undefined") {
      const isStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true;
      if (isStandaloneMode) {
        setIsStandalone(true);
        return;
      }

      // Check if user previously dismissed today
      const wasDismissed = sessionStorage.getItem("omph_pwa_dismissed");
      if (wasDismissed) {
        setDismissed(true);
      }

      // Detect iOS Safari
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      const isSafari = /safari/.test(userAgent) && !/chrome|crios|fxios/.test(userAgent);
      if (isIosDevice) {
        setIsIOS(true);
      }

      // Listen for Android / Chrome / Edge install prompt
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      window.addEventListener("appinstalled", () => {
        setInstalled(true);
        setDeferredPrompt(null);
        setTimeout(() => setIsStandalone(true), 3000);
      });

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      };
    }
  }, []);

  if (isStandalone) return null;

  async function handleInstallClick() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setInstalled(true);
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      setShowIosGuide(true);
    } else {
      // Direct instructions for other browsers
      alert("To install: Open your browser settings menu (⋮ or ⋯) and select 'Install app' or 'Add to Home screen'.");
    }
  }

  function handleDismiss() {
    setDismissed(true);
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("omph_pwa_dismissed", "true");
    }
  }

  if (dismissed && !showIosGuide) {
    // Keep a subtle floating pill on mobile so it can still be installed
    return (
      <aside aria-label="Install web application" style={{ position: "fixed", bottom: "1rem", left: "1rem", zIndex: 45 }}>
        <button
          type="button"
          onClick={() => setDismissed(false)}
          className="btn"
          style={{
            background: "var(--burgundy)",
            color: "#fff",
            fontSize: "0.82rem",
            padding: "0.45rem 0.85rem",
            borderRadius: "20px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <Smartphone size={15} /> Install App
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Install official chaplaincy web app"
      style={{
        background: "linear-gradient(135deg, #142a43 0%, #183b63 100%)",
        color: "#ffffff",
        borderBottom: "3px solid var(--gold)",
        padding: "0.85rem 1rem",
        position: "relative",
        zIndex: 50,
        boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* App Branding & Pitch */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", minWidth: "260px", flex: "1 1 auto" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "#ffffff",
              padding: "4px",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/pictures/ourmotherofperpetualhelp.png"
              alt="OMPH App Icon"
              width={36}
              height={36}
              style={{ objectFit: "contain" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <strong style={{ fontSize: "1.05rem", color: "#fff", letterSpacing: "0.01em" }}>
                Install OMPH Chaplaincy App
              </strong>
              <span
                style={{
                  background: "var(--gold)",
                  color: "#142a43",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  padding: "0.15rem 0.45rem",
                  borderRadius: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Fast &amp; Offline
              </span>
            </div>
            <p style={{ margin: "0.15rem 0 0", fontSize: "0.88rem", color: "#e2e8f0", lineHeight: 1.35 }}>
              Add to your phone home screen for instant daily Mass readings, hymns, schedule &amp; intentions!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
          {installed ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#4ade80", fontWeight: 700, fontSize: "0.95rem" }}>
              <Check size={18} /> App Installed!
            </span>
          ) : (
            <button
              type="button"
              onClick={handleInstallClick}
              className="btn"
              style={{
                background: "var(--gold)",
                color: "#142a43",
                fontWeight: 700,
                fontSize: "0.92rem",
                padding: "0.5rem 1.15rem",
                borderRadius: "6px",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                cursor: "pointer",
              }}
            >
              <Download size={17} />
              {isIOS ? "How to Install on iPhone" : "📲 Install App Now"}
            </button>
          )}

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close install prompt"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "#fff",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* iOS Safari Instruction Modal / Dropdown */}
      {showIosGuide && (
        <div
          style={{
            marginTop: "1rem",
            background: "#ffffff",
            color: "var(--navy)",
            borderRadius: "8px",
            padding: "1.25rem",
            boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
            maxWidth: "34rem",
            marginInline: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem" }}>
            <h3 style={{ margin: 0, fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--navy)" }}>
              <Smartphone size={18} color="var(--marian)" /> How to Install on iPhone &amp; iPad
            </h3>
            <button
              type="button"
              onClick={() => setShowIosGuide(false)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontWeight: 700 }}
            >
              ✕
            </button>
          </div>

          <ol style={{ margin: "0 0 1rem", paddingLeft: "1.25rem", fontSize: "0.92rem", lineHeight: 1.6 }}>
            <li>
              In Safari, tap the <strong>Share button</strong> <Share2 size={16} style={{ display: "inline", verticalAlign: "middle" }} /> at the bottom of your screen.
            </li>
            <li>
              Scroll down and tap <strong>&ldquo;Add to Home Screen&rdquo;</strong> (it has a square icon with a plus sign ⊞).
            </li>
            <li>
              Tap <strong>&ldquo;Add&rdquo;</strong> in the top right corner.
            </li>
          </ol>

          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)", fontStyle: "italic" }}>
            The OMPH Chaplaincy icon will appear on your phone home screen just like a regular native app!
          </p>

          <div style={{ marginTop: "1rem", textAlign: "right" }}>
            <button
              type="button"
              className="btn secondary small"
              onClick={() => {
                setShowIosGuide(false);
                handleDismiss();
              }}
            >
              Got it, close
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
