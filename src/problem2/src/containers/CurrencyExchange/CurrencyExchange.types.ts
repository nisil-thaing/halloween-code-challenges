export type CurrencyAmountData = {
  value: number | string;
  unit: string;
};

export type CurrencyExchangeFormData = {
  from: CurrencyAmountData;
  to: CurrencyAmountData;
};
