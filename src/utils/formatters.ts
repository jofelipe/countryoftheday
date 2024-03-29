import { Currency } from '@/types';

export const formatNumber = (number: number, locale: string) =>
  new Intl.NumberFormat(locale).format(number);

export const formatCurrency = (currencies: Currency) => {
  if (!currencies) return

  const currencyCode = Object.keys(currencies)[0];
  const currencyData = currencies[currencyCode];

  return `${currencyCode}/${currencyData.name} - ${currencyData.symbol}`;
};
