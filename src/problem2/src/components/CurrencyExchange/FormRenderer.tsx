import type { FormikProps } from 'formik';
import type { FC } from 'react';

import { TextInput } from '@/components/TextInput';

import type { CurrencyExchangeFormData } from './CurrencyExchange.types';

export const FormRenderer: FC<FormikProps<CurrencyExchangeFormData>> = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h5>Enter the amount you wish to convert and select the desired currency.</h5>
      <TextInput
        name="from.value"
        fieldLabel="From"
        value={values.from.value}
        onChange={handleChange}
        onTextInputBlur={handleBlur}
      />
      <TextInput name="to.value" fieldLabel="To" value={values.to?.value ?? 0} onChange={handleChange} isDisabled />
      <button type="submit">CONFIRM SWAP</button>
    </form>
  );
};
