import type { FC } from 'react';
import { Formik, type FormikConfig } from 'formik';
import * as Yup from 'yup';

import { GENERAL_PATTERN } from '@/constants';
import type { CurrencyExchangeFormData } from './CurrencyExchange.types';
import { FormRenderer } from './FormRenderer';

import { StyledContainer } from './CurrencyExchangeForm.styled';

type CurrencyExchangeFormProps = FormikConfig<CurrencyExchangeFormData>;

const validationSchema = Yup.object().shape({
  from: Yup.object().shape({
    value: Yup.string()
      .required('Please fill your currency value')
      .matches(GENERAL_PATTERN.CURRENCY_VALUE, 'Please fill valid currency value'),
  }),
});

export const CurrencyExchangeForm: FC<CurrencyExchangeFormProps> = ({ initialValues, onSubmit }) => {
  return (
    <StyledContainer>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formProps) => <FormRenderer {...formProps} />}
      </Formik>
    </StyledContainer>
  );
};
