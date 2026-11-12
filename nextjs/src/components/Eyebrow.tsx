import type { ReactNode } from 'react';

type EyebrowProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Sobretítulo em caixa-alta precedido de "/" vermelho decorativo (aria-hidden).
 * A numeração "/0X" fica só nos heros e em passos sequenciais (D-06).
 */
export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <p className={className ? `eyebrow ${className}` : 'eyebrow'}>
      <span className="eyebrow__num" aria-hidden="true">
        /
      </span>
      {children}
    </p>
  );
}
