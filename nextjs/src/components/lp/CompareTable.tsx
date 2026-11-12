import { lpComparison, lpComparisonColumns } from '@/content/benefits';
import { site } from '@/content/site';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';

/** Tabela "Do jeito de sempre vs. meat blend" da landing page (rola na horizontal se faltar espaço). */
export function CompareTable() {
  return (
    <Reveal className="compare-wrap">
      <table className="compare">
        <caption className="sr-only">
          Comparativo entre moer e porcionar a carne na casa e usar o blend da {site.nameLower}
        </caption>
        <thead>
          <tr>
            <th scope="col">
              <span className="sr-only">Critério</span>
            </th>
            <th scope="col">{lpComparisonColumns.common}</th>
            <th scope="col">{lpComparisonColumns.brand}</th>
          </tr>
        </thead>
        <tbody>
          {lpComparison.map((row) => (
            <tr key={row.criterion}>
              <th scope="row">{row.criterion}</th>
              <td>
                <span>
                  <Icon name="x" />
                  {row.common}
                </span>
              </td>
              <td>
                <span>
                  <Icon name="check" />
                  {row.meatBlend}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}
