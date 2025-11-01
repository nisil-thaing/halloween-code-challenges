export type CurrencyData = {
  value: number;
  unit: string;
};

export type CurrencyExchangeFormData = {
  from: CurrencyData;
  to?: CurrencyData;
};
