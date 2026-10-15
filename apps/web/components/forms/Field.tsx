export function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {hint && <p className="hint" id={`${id}-hint`}>{hint}</p>}
      {children}
      {error && <p className="field-error" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}
