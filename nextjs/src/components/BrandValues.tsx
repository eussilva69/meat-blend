import { Fragment } from 'react';
import { site } from '@/content/site';

/** "exclusiva / rigorosa / segura" com a barra em vermelho decorativo (<i>). */
export function BrandValues() {
  return (
    <>
      {site.valuesList.map((value, i) => (
        <Fragment key={value}>
          {i > 0 ? (
            <>
              {' '}
              <i>/</i>{' '}
            </>
          ) : null}
          {value}
        </Fragment>
      ))}
    </>
  );
}
