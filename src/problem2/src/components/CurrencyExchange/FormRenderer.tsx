import type { FormikProps } from 'formik';
import type { FC } from 'react';
import type { CurrencyExchangeFormData } from './CurrencyExchange.types';

export const FormRenderer: FC<FormikProps<CurrencyExchangeFormData>> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h5>Swap</h5>
      <label htmlFor="input-amount">Amount to send</label>
      <input id="input-amount" />

      <label htmlFor="output-amount">Amount to receive</label>
      <input id="output-amount" />

      <button type="submit">CONFIRM SWAP</button>
    </form>
  );
};
