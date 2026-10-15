/**
 * Flat, single-colour ornamental line art (stroke = currentColor). No gradients, filters or glows.
 * All pieces are decorative: aria-hidden.
 */
const TAU = Math.PI * 2;

export function RoseWindow({ className }: { className?: string }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false">
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="88" strokeDasharray="2 4" />
      <circle cx="100" cy="100" r="30" />
      {petals.map((a) => (
        <g key={a} transform={`rotate(${a} 100 100)`}>
          <ellipse cx="100" cy="56" rx="11" ry="26" />
          <circle cx="100" cy="22" r="5" />
        </g>
      ))}
      {petals.map((a) => (
        <line key={`s${a}`} x1="100" y1="70" x2="100" y2="12" transform={`rotate(${a + 15} 100 100)`} strokeOpacity="0.5" />
      ))}
      <path d="M100 82v36M82 100h36" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Rays({ className }: { className?: string }) {
  const rays = Array.from({ length: 36 }, (_, i) => i * 10);
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false">
      {rays.map((a, i) => (
        <line key={a} x1="100" y1={i % 2 ? 28 : 14} x2="100" y2="52" transform={`rotate(${a} 100 100)`} strokeLinecap="round" strokeWidth={i % 2 ? 1 : 1.8} />
      ))}
      <circle cx="100" cy="100" r="46" />
      <circle cx="100" cy="100" r="38" strokeOpacity="0.55" />
      <path d="M100 74v52M74 100h52" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="100" cy="100" r="6" />
    </svg>
  );
}

export function RosaryRing({ className }: { className?: string }) {
  const R = 84;
  const beads: { x: number; y: number; big: boolean }[] = [];
  // five decades: 10 small beads then 1 larger bead, around the ring
  const total = 55;
  for (let i = 0; i < total; i++) {
    const a = (i / total) * TAU - Math.PI / 2;
    beads.push({ x: 100 + R * Math.cos(a), y: 92 + R * Math.sin(a) * 0.98, big: i % 11 === 10 });
  }
  return (
    <svg className={className} viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false">
      <circle cx="100" cy="92" r={R} strokeOpacity="0.45" />
      {beads.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={b.big ? 4.6 : 2.7} fill="currentColor" stroke="none" />
      ))}
      <line x1="100" y1="176" x2="100" y2="196" strokeOpacity="0.7" />
      <circle cx="100" cy="184" r="3.4" fill="currentColor" stroke="none" />
      <path d="M100 198v34M88 208h24" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** Small divider: rule, cross, rule. */
export function CrossDivider({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false">
      <line x1="0" y1="12" x2="100" y2="12" />
      <line x1="140" y1="12" x2="240" y2="12" />
      <path d="M120 3v18M111 10h18" strokeWidth="2" strokeLinecap="round" />
      <circle cx="104" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="136" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Large faint Latin inscription used as a background watermark. */
export function Inscription({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`inscription ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}
