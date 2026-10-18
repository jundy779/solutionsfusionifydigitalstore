// The DS "sheet" label: a technical-drawing title block above a section.
export function Sheet({ no, children, onSky = false }: { no?: string; children: React.ReactNode; onSky?: boolean }) {
  return (
    <p className={`sheet${onSky ? " sheet--sky" : ""}`}>
      {no && <span className="sheet__no">{no}</span>}
      <span>{children}</span>
    </p>
  );
}
