import type { FormikProps } from 'formik';
import type { FC } from 'react';

import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { CurrencyAmountField, type CurrencyAmountFieldProps } from '@/components/CurrencyAmountField';

import type { CurrencyExchangeFormData } from './CurrencyExchange.types';

type FormRendererProps = FormikProps<CurrencyExchangeFormData> & {
  unitOptions: CurrencyAmountFieldProps['unitOptions'];
};

const CurrencyAmountFieldInput = CurrencyAmountField<CurrencyExchangeFormData>;

export const FormRenderer: FC<FormRendererProps> = ({ unitOptions, isSubmitting, dirty, isValid, handleSubmit }) => {
  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="text-center mb-4 text-slate-500">
            Enter the amount you wish to convert and select the desired currency.
          </FieldLegend>
          <FieldGroup className="w-full max-w-sm mx-auto">
            <CurrencyAmountFieldInput
              name="from"
              fieldLabel="From"
              isAutoFocus
              unitOptions={unitOptions}
              isDisabled={isSubmitting}
            />
            <CurrencyAmountFieldInput
              name="to"
              fieldLabel="To"
              unitOptions={unitOptions}
              isDisabled={isSubmitting || { value: true }}
            />
            <section className="text-right cta-buttons">
              <Button
                type="submit"
                className="not-disabled:cursor-pointer"
                disabled={isSubmitting || !dirty || !isValid}
              >
                Change{isSubmitting ? <Spinner /> : null}
              </Button>
            </section>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};
