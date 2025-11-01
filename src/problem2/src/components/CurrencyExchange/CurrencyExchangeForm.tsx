import type { FC } from 'react';
import { Formik, type FormikConfig } from 'formik';

import type { CurrencyExchangeFormData } from './CurrencyExchange.types';

import { StyledContainer } from './CurrencyExchangeForm.styled';
import { FormRenderer } from './FormRenderer';

type CurrencyExchangeFormProps = FormikConfig<CurrencyExchangeFormData>;

export const CurrencyExchangeForm: FC<CurrencyExchangeFormProps> = ({ initialValues, onSubmit }) => {
  return (
    <StyledContainer>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formProps) => <FormRenderer {...formProps} />}
      </Formik>
    </StyledContainer>
  );
};
