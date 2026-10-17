// Splits a heading into words for the hero entrance. Screen readers get
// the plain sentence; the animated spans are hidden from them.
export function SplitWords({ text, start = 0, step = 0.06 }: { text: string; start?: number; step?: number }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={`${w}-${i}`}>
            <span className="word">
              <span style={{ animationDelay: `${(start + i * step).toFixed(2)}s` }}>{w}</span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </>
  );
}
