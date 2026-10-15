"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircleQuestion, X, Send, BookOpen, AlertCircle, Sparkles } from "lucide-react";
import { useLang } from "@/components/layout/useLang";

type Result =
  | { kind: "safety"; message: string }
  | { kind: "library"; matches: { id: string; question: string; snippet: string }[] }
  | { kind: "magisterium"; text: string; citations: { title: string; url?: string }[]; also: { id: string; question: string }[] }
  | { kind: "none"; message: string };

interface Message {
  id: string;
  sender: "user" | "padre";
  text?: string;
  result?: Result;
}

const QUICK_PROMPTS = [
  "Why do Catholics pray to Mary?",
  "How do I prepare for Confession?",
  "Can a non-Catholic receive Holy Communion?",
  "What is the biblical basis for Purgatory?",
];

export function AskPadreChatbot() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, busy]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Handle Escape key to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSend(qText: string) {
    const trimmed = qText.trim();
    if (!trimmed || busy) return;

    const userMsgId = `user-${Date.now()}`;
    setMessages((prev) => [...prev, { id: userMsgId, sender: "user", text: trimmed }]);
    setQuestion("");
    setBusy(true);
    setError("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not retrieve answer. Please try again.");
      } else {
        const padreMsgId = `padre-${Date.now()}`;
        setMessages((prev) => [...prev, { id: padreMsgId, sender: "padre", result: data }]);
      }
    } catch {
      setError("Unable to connect to the server. Please check your internet connection.");
    } finally {
      setBusy(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSend(question);
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <div
        className="padre-chat-widget"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 55,
          fontFamily: "var(--sans)",
        }}
      >
        {!open && (
          <button
            id="padre-chat-trigger"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open Ask a Padre Catholic faith chatbot"
            aria-expanded={false}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              background: "var(--marian)",
              color: "#fff",
              padding: "0.75rem 1.25rem",
              borderRadius: "999px",
              border: "2px solid var(--gold)",
              boxShadow: "0 6px 20px rgba(0, 32, 91, 0.28)",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "0.02em",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <MessageCircleQuestion size={20} aria-hidden="true" style={{ color: "var(--gold)" }} />
            <span>Ask a Padre</span>
            <span
              style={{
                background: "var(--burgundy)",
                color: "#fff",
                fontSize: "0.68rem",
                padding: "0.15rem 0.45rem",
                borderRadius: "999px",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Q&amp;A
            </span>
          </button>
        )}

        {/* Floating Chat Modal */}
        {open && (
          <div
            role="dialog"
            aria-label="Ask a Padre Catholic Faith Chatbot"
            style={{
              position: "fixed",
              bottom: "1.25rem",
              right: "1.25rem",
              width: "min(400px, calc(100vw - 2.5rem))",
              height: "min(580px, calc(100vh - 4rem))",
              background: "var(--paper)",
              border: "2px solid var(--gold)",
              borderRadius: "12px",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.22)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 65,
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "var(--marian)",
                color: "var(--ivory)",
                padding: "0.85rem 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "2px solid var(--gold)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <div
                  style={{
                    width: "2.2rem",
                    height: "2.2rem",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--gold)",
                  }}
                >
                  <MessageCircleQuestion size={18} style={{ color: "var(--gold)" }} />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.05rem", margin: 0, color: "#fff", fontFamily: "var(--serif)" }}>
                    {t("ask_padre_title", "Ask a Padre")}
                  </h2>
                  <p style={{ margin: 0, fontSize: "0.72rem", color: "#e0dacd", letterSpacing: "0.04em" }}>
                    Catholic Teaching &amp; Doctrine Assistant
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Ask a Padre chat window"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  padding: "0.3rem",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                background: "var(--ivory)",
              }}
            >
              {/* Welcome message */}
              <div
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  padding: "0.85rem",
                  fontSize: "0.88rem",
                  lineHeight: 1.45,
                }}
              >
                <p style={{ margin: "0 0 0.5rem", fontWeight: 600, color: "var(--navy)" }}>
                  Peace be with you!
                </p>
                <p style={{ margin: 0, color: "var(--ink)" }}>
                  Ask any question about Catholic doctrine, liturgy, sacraments, or Church teaching. Answers cite Sacred Scripture and the Catechism of the Catholic Church.
                </p>
                <p style={{ margin: "0.5rem 0 0", fontSize: "0.75rem", color: "var(--muted)", fontStyle: "italic" }}>
                  Note: This is an information service, not a priest. It does not hear confessions or give personal spiritual counsel.
                </p>
              </div>

              {/* Quick Prompts when conversation is empty */}
              {messages.length === 0 && (
                <div>
                  <p style={{ fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", margin: "0.25rem 0 0.5rem" }}>
                    Suggested Questions
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {QUICK_PROMPTS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleSend(p)}
                        style={{
                          textAlign: "left",
                          background: "var(--paper)",
                          border: "1px solid var(--line)",
                          borderRadius: "6px",
                          padding: "0.5rem 0.75rem",
                          fontSize: "0.84rem",
                          color: "var(--navy)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.45rem",
                          transition: "border-color 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
                      >
                        <Sparkles size={14} style={{ color: "var(--gold-text)", flexShrink: 0 }} />
                        <span>{p}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message History */}
              {messages.map((m) => {
                if (m.sender === "user") {
                  return (
                    <div
                      key={m.id}
                      style={{
                        alignSelf: "flex-end",
                        maxWidth: "85%",
                        background: "var(--marian)",
                        color: "#fff",
                        padding: "0.6rem 0.9rem",
                        borderRadius: "12px 12px 2px 12px",
                        fontSize: "0.9rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {m.text}
                    </div>
                  );
                }

                // Padre response
                const res = m.result;
                return (
                  <div
                    key={m.id}
                    style={{
                      alignSelf: "flex-start",
                      maxWidth: "92%",
                      background: "var(--paper)",
                      border: "1px solid var(--gold)",
                      borderRadius: "12px 12px 12px 2px",
                      padding: "0.85rem",
                      fontSize: "0.88rem",
                      lineHeight: 1.48,
                      color: "var(--navy)",
                    }}
                  >
                    {res?.kind === "safety" && (
                      <p style={{ margin: 0, color: "var(--burgundy)", fontWeight: 600 }}>{res.message}</p>
                    )}

                    {res?.kind === "none" && (
                      <div>
                        <p style={{ margin: "0 0 0.5rem" }}>{res.message}</p>
                        <p style={{ margin: 0 }}>
                          <Link href="/doctrine" onClick={() => setOpen(false)} style={{ color: "var(--marian)", fontWeight: 600 }}>
                            Browse all 80 Catholic teachings in our Library →
                          </Link>
                        </p>
                      </div>
                    )}

                    {res?.kind === "library" && (
                      <div>
                        <p style={{ margin: "0 0 0.6rem", fontWeight: 700, color: "var(--marian)" }}>
                          From our Catholic Doctrine Library:
                        </p>
                        {res.matches.map((match) => (
                          <div key={match.id} style={{ marginBottom: "0.6rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--line)" }}>
                            <p style={{ margin: "0 0 0.25rem", fontWeight: 600 }}>
                              <Link
                                href={`/doctrine/${match.id}`}
                                onClick={() => setOpen(false)}
                                style={{ color: "var(--navy)", textDecoration: "none" }}
                              >
                                {match.question}
                              </Link>
                            </p>
                            <p style={{ margin: "0 0 0.25rem", fontSize: "0.82rem", color: "var(--muted)" }}>
                              {match.snippet}…
                            </p>
                            <Link
                              href={`/doctrine/${match.id}`}
                              onClick={() => setOpen(false)}
                              style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--marian)" }}
                            >
                              Read full answer &amp; citations →
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}

                    {res?.kind === "magisterium" && (
                      <div>
                        {res.text.split(/\n{2,}/).map((p, i) => (
                          <p key={i} style={{ margin: "0 0 0.5rem" }}>{p}</p>
                        ))}
                        {res.citations && res.citations.length > 0 && (
                          <div style={{ marginTop: "0.65rem", paddingTop: "0.5rem", borderTop: "1px solid var(--line)", fontSize: "0.8rem" }}>
                            <strong style={{ color: "var(--gold-text)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                              <BookOpen size={13} /> Sources &amp; Citations:
                            </strong>
                            <ul style={{ margin: "0.3rem 0 0", paddingLeft: "1.2rem" }}>
                              {res.citations.map((c, i) => (
                                <li key={i} style={{ margin: "0.15rem 0" }}>
                                  {c.url ? (
                                    <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--marian)" }}>
                                      {c.title || c.url}
                                    </a>
                                  ) : (
                                    c.title
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {res.also && res.also.length > 0 && (
                          <p style={{ margin: "0.6rem 0 0", fontSize: "0.78rem", color: "var(--muted)" }}>
                            Related: {res.also.map((a, i) => (
                              <span key={a.id}>
                                {i > 0 && ", "}
                                <Link href={`/doctrine/${a.id}`} onClick={() => setOpen(false)} style={{ color: "var(--marian)" }}>
                                  {a.question}
                                </Link>
                              </span>
                            ))}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Busy state */}
              {busy && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    background: "var(--paper)",
                    border: "1px solid var(--line)",
                    borderRadius: "12px 12px 12px 2px",
                    padding: "0.6rem 0.9rem",
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span className="pulsing-dot" style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "var(--marian)" }} />
                  Searching Church documents &amp; doctrine…
                </div>
              )}

              {/* Error state */}
              {error && (
                <div
                  style={{
                    background: "#fdf2f2",
                    border: "1px solid #f8b4b4",
                    borderRadius: "6px",
                    padding: "0.6rem 0.8rem",
                    fontSize: "0.82rem",
                    color: "#9b1c2c",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <AlertCircle size={15} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSubmit}
              style={{
                borderTop: "1px solid var(--line)",
                background: "var(--paper)",
                padding: "0.7rem 0.85rem",
              }}
            >
              <div style={{ position: "relative" }}>
                <textarea
                  ref={inputRef}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value.slice(0, 500))}
                  placeholder={t("type_message", "Ask a question about the Catholic faith…")}
                  aria-label="Your question about the Catholic faith"
                  rows={2}
                  disabled={busy}
                  style={{
                    width: "100%",
                    padding: "0.5rem 2.4rem 0.5rem 0.65rem",
                    borderRadius: "6px",
                    border: "1px solid var(--line)",
                    fontSize: "0.88rem",
                    fontFamily: "inherit",
                    resize: "none",
                    boxSizing: "border-box",
                    color: "var(--navy)",
                    background: "#fff",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(question);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={busy || !question.trim()}
                  aria-label="Send question"
                  style={{
                    position: "absolute",
                    right: "0.4rem",
                    bottom: "0.55rem",
                    background: question.trim() ? "var(--marian)" : "#e2e8f0",
                    color: question.trim() ? "#fff" : "#a0aec0",
                    border: "none",
                    borderRadius: "4px",
                    width: "1.8rem",
                    height: "1.8rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: question.trim() && !busy ? "pointer" : "default",
                    transition: "background 0.15s ease",
                  }}
                >
                  <Send size={14} />
                </button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.35rem" }}>
                <Link
                  href="/doctrine"
                  onClick={() => setOpen(false)}
                  style={{ fontSize: "0.75rem", color: "var(--marian)", fontWeight: 600, textDecoration: "none" }}
                >
                  Open Doctrine Library (A–Z) →
                </Link>
                <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                  {question.length}/500
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
