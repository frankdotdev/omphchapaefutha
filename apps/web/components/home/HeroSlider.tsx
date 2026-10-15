"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { RoseWindow, Rays, RosaryRing, Inscription } from "@/components/art/Art";
import type { Slide } from "@/lib/slides";

const INTERVAL_MS = 9000;

function ArtFor({ kind }: { kind: Slide["art"] }) {
  if (kind === "rays") return <Rays className="slide-art" />;
  if (kind === "rosary") return <RosaryRing className="slide-art" />;
  return <RoseWindow className="slide-art" />;
}

/** Blur applied to a background so low-resolution files read as atmosphere rather than as visible pixels. */
function softness(width?: number): string | undefined {
  if (!width || width >= 1200) return undefined;
  return width < 500 ? "blur(7px)" : width < 900 ? "blur(2.5px)" : "blur(1px)";
}

export function HeroSlider({ slides: SLIDES }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hold, setHold] = useState(false); // hover/focus pause, never overrides the user's own choice
  const root = useRef<HTMLElement>(null);
  const count = SLIDES.length;

  // Autoplay starts only when the visitor has not asked for reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPlaying(!reduce);
  }, []);

  useEffect(() => {
    if (!playing || hold) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [playing, hold, count]);

  const go = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);

  return (
    <section
      ref={root}
      className="hero on-dark pattern-quatrefoil"
      aria-roledescription="carousel"
      aria-label="Welcome"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div className="slides" aria-live={playing && !hold ? "off" : "polite"}>
        {SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.id}
              className={`slide${active ? " is-active" : ""}${s.background ? " has-bg" : ""}${s.background && !s.image ? " bg-only" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              // inert keeps hidden slides' links out of the tab order
              {...(!active ? ({ inert: true } as object) : {})}
            >
              {s.background && (
                <>
                  {/* Decorative: the picture is credited in the caption; softened when the file is small so it never looks pixelated. */}
                  <div className="slide-bg" aria-hidden="true" style={{ backgroundImage: `url(${JSON.stringify(s.background.src)})`, filter: softness(s.background.width) }} />
                  <div className="slide-shade" aria-hidden="true" />
                </>
              )}
              {s.kind === "identity" && (
                <div className="wrap slide-grid">
                  <div>
                    <p className="eyebrow">AE-FUTHA · Catholic Chaplaincy</p>
                    {i === 0 ? <h1>Our Mother of Perpetual Help Chaplaincy</h1> : <h2>Our Mother of Perpetual Help Chaplaincy</h2>}
                    <hr className="hero-rule" />
                    <p className="lede">A Catholic home for worship, prayer and formation. Be welcome in the peace of Christ.</p>
                    <div className="btn-row">
                      <Link className="btn" href="/mass-schedule">View Mass Schedule</Link>
                      <Link className="btn secondary" href="/about">About the Chaplaincy</Link>
                    </div>
                  </div>
                  <figure className="hero-icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/omph-icon.jpg" width={404} height={495} alt="Icon of Our Mother of Perpetual Help, showing the Virgin Mary holding the Child Jesus with the archangels Michael and Gabriel" />
                    <figcaption>Mater de Perpetuo Succursu</figcaption>
                  </figure>
                </div>
              )}
              {s.kind === "inscription" && (
                <div className="wrap slide-grid">
                  <div>
                    <p className="eyebrow">{s.source}</p>
                    <p className="latin-display" lang="la">{s.latin}</p>
                    <hr className="hero-rule" />
                    <p className="lede">{s.english}</p>
                    {s.cta && (
                      <div className="btn-row">
                        <Link className="btn" href={s.cta.href}>{s.cta.label}</Link>
                      </div>
                    )}
                    {!s.image && s.background && (s.background.title || s.background.byline) && (
                      <p className="slide-credit">{[s.background.title, s.background.byline].filter(Boolean).join(" · ")}</p>
                    )}
                  </div>
                  {s.image ? (
                    <figure className="art-plate">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.image.src}
                        width={s.image.width}
                        height={s.image.height}
                        alt={s.image.alt}
                        style={s.image.maxCssWidth ? { maxWidth: `min(100%, ${s.image.maxCssWidth}px)` } : undefined}
                      />
                      {(s.image.title || s.image.byline) && (
                        <figcaption>{[s.image.title, s.image.byline].filter(Boolean).join(" · ")}</figcaption>
                      )}
                    </figure>
                  ) : s.background ? null : (
                    <div className="slide-art-wrap"><ArtFor kind={s.art} /></div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Inscription className="hero-watermark">Mater de Perpetuo Succursu</Inscription>

      <div className="wrap">
        <div className="slider-controls" role="group" aria-label="Slideshow controls">
          <button type="button" className="ctl" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>
            {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
          </button>
          <button type="button" className="ctl" onClick={() => go(index - 1)} aria-label="Previous slide"><ChevronLeft size={20} aria-hidden="true" /></button>
          <span className="slide-count" aria-hidden="true">{index + 1} / {count}</span>
          <div className="dots">
            {SLIDES.map((s, i) => (
              <button key={s.id} type="button" className="dot" aria-label={`Show slide ${i + 1} of ${count}`} aria-current={i === index ? "true" : undefined} onClick={() => go(i)} />
            ))}
          </div>
          <button type="button" className="ctl" onClick={() => go(index + 1)} aria-label="Next slide"><ChevronRight size={20} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
