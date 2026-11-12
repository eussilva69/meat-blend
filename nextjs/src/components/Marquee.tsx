'use client';

import { Fragment, useState } from 'react';

type MarqueeProps = {
  words: readonly string[];
  /**
   * Quantas vezes a sequência se repete. A animação desloca -50%, então use um número
   * par e que preencha telas largas (home: 4 × 3 palavras; landing: 2 × 4 palavras).
   */
  repeat?: number;
};

/**
 * Faixa vermelha com palavras correndo. O texto é decorativo (aria-hidden); o botão de
 * pausa é acessível (aria-pressed). Pausa também no hover e no foco; com "reduzir
 * movimento" a faixa fica parada e o botão some (CSS).
 */
export function Marquee({ words, repeat = 2 }: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const items = Array.from({ length: repeat }, () => words).flat();
  return (
    <div className={paused ? 'marquee is-paused' : 'marquee'}>
      <div className="marquee__track" aria-hidden="true">
        {items.map((word, i) => (
          <Fragment key={i}>
            <span>{word}</span>
            <i>/</i>
          </Fragment>
        ))}
      </div>
      <button className="marquee__toggle" type="button" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
        <span className="sr-only">{paused ? 'Retomar a faixa animada' : 'Pausar a faixa animada'}</span>
        <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="currentColor" d={paused ? 'M8 5v14l11-7z' : 'M7 5h3v14H7zM14 5h3v14h-3z'} />
        </svg>
      </button>
    </div>
  );
}
