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
  const handleSwapFromTo = () => {
    // TODO: For improvement:
    // When users click on this button, the From and To field would be swapped
  };

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
            <div className="text-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full not-disabled:cursor-pointer"
                onClick={handleSwapFromTo}
                disabled // temporary disabled to improve if any chances
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-down-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
                  />
                </svg>
              </Button>
            </div>
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
