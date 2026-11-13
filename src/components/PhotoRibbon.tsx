import { Iso } from './Iso';

export type PhotoRibbonVariant = 'seal' | 'stripe' | 'corner';

type PhotoRibbonProps = {
  /**
   * - 'seal': Etiqueta de fita vermelha com o isotipo da marca em creme (padrão no rodapé).
   * - 'stripe': Fita fina vermelha chanfrada na base da imagem.
   * - 'corner': Etiqueta no canto superior para fotos sobrepostas.
   */
  variant?: PhotoRibbonVariant;
  className?: string;
};

/**
 * Detalhe visual de fita/selo vermelho nos cantos das fotos.
 * 100% gráfico (aria-hidden), sem palavras ou caixas de texto.
 */
export function PhotoRibbon({ variant = 'seal', className }: PhotoRibbonProps) {
  if (variant === 'stripe') {
    return <span className={`photo-ribbon photo-ribbon--stripe ${className ?? ''}`.trim()} aria-hidden="true" />;
  }

  const cls = [
    'photo-ribbon',
    variant === 'corner' && 'photo-ribbon--corner',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={cls} aria-hidden="true">
      <Iso className="photo-ribbon__icon" />
    </span>
  );
}
