import Link from 'next/link';
import { blendContactHref, blends } from '@/content/blends';

/** Tabela-resumo "Os blends lado a lado" (/blends), gerada de src/content/blends.ts. */
export function SpecTable() {
  return (
    <div className="container">
      <div className="spec-table-wrap" tabIndex={0} role="region" aria-labelledby="spec-cap">
        <table className="spec-table">
          <caption id="spec-cap">Os blends lado a lado</caption>
          <thead>
            <tr>
              <th scope="col">Blend</th>
              <th scope="col">Cortes</th>
              <th scope="col">Carne / gordura</th>
              <th scope="col">Gramaturas</th>
              <th scope="col">Formato</th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody>
            {blends.map((b) => {
              const cells =
                b.kind === 'standard'
                  ? {
                      cuts: b.cuts,
                      ratio: `${b.lean}/${b.fat}`,
                      weights: `${b.weights.join(' · ')} g`,
                      format: b.formatShort,
                      action: 'Testar',
                    }
                  : { ...b.table, action: 'Desenvolver' };
              return (
                <tr key={b.slug}>
                  <th scope="row">{b.name}</th>
                  <td>{cells.cuts}</td>
                  <td>{cells.ratio}</td>
                  <td>{cells.weights}</td>
                  <td>{cells.format}</td>
                  <td>
                    <Link href={blendContactHref(b)}>
                      {cells.action}
                      <span className="sr-only"> o blend {b.name}</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
