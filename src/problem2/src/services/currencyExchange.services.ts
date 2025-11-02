import type { CurrencyAmountData } from '@/types';
import { axiosInstance } from '@/services/axiosInstance';

export type CurrencyResponse = {
  currency: string;
  date: string;
  price: number;
};
export const fetchCurrencies = async (): Promise<Array<CurrencyAmountData>> => {
  const currenciesResponse = await axiosInstance.get<Array<CurrencyResponse>>(
    'https://interview.switcheo.com/prices.json'
  );
  const currenciesResponseDataMapping =
    currenciesResponse?.data?.reduce?.(
      (acc, item) => ({
        ...acc,
        [item.currency]: {
          value: item.price,
          unit: item.currency,
        },
      }),
      {}
    ) ?? {};

  return Object.values(currenciesResponseDataMapping);
};
export type ConvertCurrencyUnitPayload = {
  from: CurrencyAmountData;
  toUnit: CurrencyAmountData['unit'];
};
export const convertCurrencyUnit = async (payload: ConvertCurrencyUnitPayload) => {
  const currencies = await fetchCurrencies();

  if (!currencies?.length) {
    throw new Error("Oops! Couldn't convert this currency");
  }

  const fromCurrencyResource: CurrencyAmountData | null =
    (payload.from.unit && currencies.find((currencyItem) => currencyItem.unit === payload.from.unit)) || null;
  const toCurrencyResource: CurrencyAmountData | null =
    (payload.from.unit && currencies.find((currencyItem) => currencyItem.unit === payload.toUnit)) || null;

  if (!fromCurrencyResource?.value || !toCurrencyResource?.value) {
    throw new Error("Oops! Couldn't convert this currency");
  }

  const fromCurrencyBaseValue = Number(payload.from.value) * Number(fromCurrencyResource.value);

  const result = Number(toCurrencyResource.value) * fromCurrencyBaseValue;

  // Just want to add a little bit delay to test loading showing
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(result);
    }, 4000);
  });
};
