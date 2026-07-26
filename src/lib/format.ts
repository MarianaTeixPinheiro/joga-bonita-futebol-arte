/**
 * Joga Bonita — formatting helpers.
 *
 * Money is always Brazilian Real: comma decimal, dot thousands — "R$ 109,90".
 * Mirrors the `brl` helper exported by the design system's PriceTag.
 */
export function brl(value: number): string {
  return (
    'R$ ' +
    value
      .toFixed(2)
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  );
}
