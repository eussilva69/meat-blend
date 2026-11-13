type MarqueeProps = {
  words: readonly string[];
  /**
   * Quantas vezes a sequência se repete. A animação desloca -50%, então use um número
   * par e que preencha telas largas (home: 4 × 3 palavras; landing: 2 × 4 palavras).
   */
  repeat?: number;
};

/**
 * Faixa vermelha com palavras correndo. O texto é decorativo (aria-hidden).
 * Pausa no hover e no foco por CSS; com "reduzir movimento" a faixa fica estática.
 */
export function Marquee({ words, repeat = 12 }: MarqueeProps) {
  const items = Array.from({ length: repeat }, () => words).flat();
  return (
    <div className="marquee" role="region" aria-label="Destaques">
      <div className="marquee__track" aria-hidden="true">
        {items.map((word, i) => (
          <span key={i} className="marquee__item">
            <span>{word}</span>
            <i aria-hidden="true">/</i>
          </span>
        ))}
      </div>
    </div>
  );
}
