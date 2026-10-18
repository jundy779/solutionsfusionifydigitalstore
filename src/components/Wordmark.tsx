// The big "fusionify" in the footer sea; letters surface one by one.
export function Wordmark() {
  const letters = "fusionify".split("");
  return (
    <div className="wordmark" data-reveal aria-hidden="true">
      {letters.map((l, i) => (
        <span key={i} style={{ transitionDelay: `${i * 55}ms` }}>
          {l}
        </span>
      ))}
    </div>
  );
}
