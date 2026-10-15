/**
 * Placeholder Marian emblem (outline star above a cross). Replace with the chaplaincy's approved mark via
 * the admin media library once supplied. Drawn in flat colours; no gradients.
 */
export function Emblem({ title }: { title?: string }) {
  return (
    <svg viewBox="0 0 64 64" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} fill="none">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 9l2.6 6.2 6.7.6-5.1 4.4 1.5 6.5L32 23.2l-5.7 3.5 1.5-6.5-5.1-4.4 6.7-.6L32 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M32 31v21M24.5 38.5h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
