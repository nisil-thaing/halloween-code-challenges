import type { FC } from 'react';
import { Formik, type FormikConfig } from 'formik';
import * as Yup from 'yup';

import { CurrencyAmountFieldSchema } from '@/components/CurrencyAmountField/CurrencyAmountField';
import type { CurrencyExchangeFormData } from './CurrencyExchange.types';
import { FormRenderer } from './FormRenderer';

import { StyledContainer } from './CurrencyExchangeForm.styled';

type CurrencyExchangeFormProps = FormikConfig<CurrencyExchangeFormData>;

const validationSchema = Yup.object().shape({
  from: CurrencyAmountFieldSchema,
});

export const CurrencyExchangeForm: FC<CurrencyExchangeFormProps> = ({ initialValues, onSubmit }) => {
  return (
    <StyledContainer className="w-full max-w-xl">
      <h2 className="text-center scroll-m-20 border-b mb-10 pb-4 text-3xl font-semibold tracking-tight first:mt-0">
        Currency Exchange
      </h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formProps) => <FormRenderer {...formProps} />}
      </Formik>
    </StyledContainer>
  );
};
