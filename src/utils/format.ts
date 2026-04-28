const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

export function formatBRL(value: number, withSign = false): string {
  if (withSign && value >= 0) {
    return `-${BRL.format(value)}`;
  }
  return BRL.format(value);
}

const NUM = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatBRNumber(value: number): string {
  return NUM.format(value);
}
