import type { FormikProps } from 'formik';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import { FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { CurrencyAmountField } from '@/components/CurrencyAmountField';

import type { CurrencyExchangeFormData } from './CurrencyExchange.types';

const CurrencyAmountFieldInput = CurrencyAmountField<CurrencyExchangeFormData>;

export const FormRenderer: FC<FormikProps<CurrencyExchangeFormData>> = ({ handleSubmit }) => {
  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="text-center mb-4 text-slate-500">
            Enter the amount you wish to convert and select the desired currency.
          </FieldLegend>
          <FieldGroup className="w-full max-w-sm mx-auto">
            <CurrencyAmountFieldInput name="from" fieldLabel="From" isAutoFocus />
            <CurrencyAmountFieldInput name="to" fieldLabel="To" isDisabled={{ value: true }} />
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
      <section className="text-right mt-6 cta-buttons">
        <Button type="submit">Change</Button>
      </section>
    </form>
  );
};
