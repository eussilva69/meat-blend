'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { calculator, volumeBand } from '@/content/calculator';
import { brl, decimal1 } from '@/lib/format';
import { Reveal } from './Reveal';

/** Número de um campo, aceitando vírgula decimal ("45,90", "1.500"). Vazio, zero ou inválido = NaN. */
export const parseNum = (value: string): number => {
  let s = value.trim();
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  const v = Number.parseFloat(s);
  return Number.isFinite(v) && v > 0 ? v : Number.NaN;
};

/**
 * Simulador de custo da carne por burger e por mês (/hamburguerias).
 * Resultado repetido junto dos campos no celular; leitor de tela recebe um resumo
 * (aria-live) 700 ms depois da última alteração; o CTA leva volume e mensagem ao formulário.
 */
export function CostCalculator() {
  const { defaults, quickGrams } = calculator;
  const [price, setPrice] = useState<string>(defaults.pricePerKg);
  const [grams, setGrams] = useState<string>(defaults.grams);
  const [units, setUnits] = useState<string>(defaults.unitsPerMonth);
  const [announce, setAnnounce] = useState('');
  const [touched, setTouched] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const p = parseNum(price);
  const g = parseNum(grams);
  const u = parseNum(units);
  const valid = ![p, g, u].some(Number.isNaN);
  const perUnit = valid ? (p * g) / 1000 : 0;
  const monthKg = valid ? (g * u) / 1000 : 0;
  const monthCost = perUnit * (valid ? u : 0);

  const unitText = valid ? brl.format(perUnit) : '—';
  const monthText = valid ? brl.format(monthCost) : '—';
  const kgText = valid ? `${decimal1.format(monthKg)} kg` : '—';
  const gramsText = Number.isNaN(g) ? '—' : `${decimal1.format(g)} g`;

  // Resumo para leitor de tela: só depois de o visitante mexer, com pausa de 700 ms.
  useEffect(() => {
    if (!touched) return;
    window.clearTimeout(timer.current);
    const summary = valid
      ? `Carne por burger: ${brl.format(perUnit)}. Por mês: ${decimal1.format(monthKg)} kg, ${brl.format(monthCost)}.`
      : calculator.hint;
    timer.current = window.setTimeout(() => setAnnounce(summary), 700);
    return () => window.clearTimeout(timer.current);
  }, [touched, valid, perUnit, monthKg, monthCost]);

  const edit = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setTouched(true);
  };

  const ctaHref = valid
    ? {
        pathname: '/contato',
        query: {
          volume: volumeBand(u),
          mensagem: `Quero receber a tabela de preços. Simulei ${decimal1.format(g)} g por burger e ${decimal1.format(u)} burgers por mês.`,
        },
        hash: 'pedir-amostra',
      }
    : '/contato#pedir-amostra';

  return (
    <Reveal className="calc">
      <div className="calc__inputs">
        <div className="field">
          <label htmlFor="calc-preco">
            {calculator.priceLabel} <span className="optional">(exemplo)</span>
          </label>
          <div className="affix">
            <span className="affix__pre">R$</span>
            <input
              id="calc-preco"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder={defaults.pricePerKg}
              value={price}
              onChange={(e) => edit(setPrice)(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="calc-gramatura">Gramatura por burger</label>
          <div className="affix affix--suf">
            <input
              id="calc-gramatura"
              type="number"
              inputMode="numeric"
              min="0"
              step="10"
              value={grams}
              onChange={(e) => edit(setGrams)(e.target.value)}
            />
            <span className="affix__suf">g</span>
          </div>
          <div className="quick" role="group" aria-label="Gramaturas comuns">
            {quickGrams.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={value === g}
                onClick={() => edit(setGrams)(String(value))}
              >
                {value} g
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <label htmlFor="calc-unidades">Burgers vendidos por mês</label>
          <div className="affix affix--suf">
            <input
              id="calc-unidades"
              type="number"
              inputMode="numeric"
              min="0"
              step="50"
              value={units}
              onChange={(e) => edit(setUnits)(e.target.value)}
            />
            <span className="affix__suf">un</span>
          </div>
        </div>
        <p className="calc__inline" aria-hidden="true">
          Carne por burger: <strong>{unitText}</strong> · por mês: <strong>{monthText}</strong>
        </p>
        {valid ? null : <p className="field__error">{calculator.hint}</p>}
      </div>
      <div className="calc__out">
        <div>
          <p className="calc__label">
            Carne por burger (<span>{gramsText}</span>)
          </p>
          <p className="calc__big">{unitText}</p>
          <p className="calc__note">{calculator.priceNote}</p>
        </div>
        <div className="calc__rows">
          <div className="calc__row">
            <span>Volume por mês</span>
            <strong>{kgText}</strong>
          </div>
          <div className="calc__row">
            <span>Custo de carne por mês</span>
            <strong>{monthText}</strong>
          </div>
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announce}
        </p>
        <p>
          <Link className="btn btn--red btn--block" href={ctaHref}>
            {calculator.ctaLabel}
          </Link>
        </p>
      </div>
    </Reveal>
  );
}
