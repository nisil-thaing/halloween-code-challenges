import { convertCurrencyUnit } from './services';

import { CurrencyExchangeForm } from './containers/CurrencyExchange';
import type { CurrencyExchangeFormData } from './containers/CurrencyExchange/CurrencyExchange.types';

import { StyledContainer } from './App.styled';
import type { FormikHelpers } from 'formik';

const CURRENCY_EXCHANGE_INITIAL_VALUES: CurrencyExchangeFormData = {
  from: {
    value: '',
    unit: 'USD',
  },
  to: {
    value: '',
    unit: 'USD',
  },
};

function App() {
  const handleExchangeCurrency = async (
    values: CurrencyExchangeFormData,
    { setFieldValue, setSubmitting }: FormikHelpers<CurrencyExchangeFormData>
  ) => {
    const payload = {
      from: values.from,
      toUnit: values.to.unit,
    };

    try {
      const result = await convertCurrencyUnit(payload);
      setFieldValue('to.value', result);
    } catch (_err) {
      // TODO:
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StyledContainer className="w-full h-full">
      <CurrencyExchangeForm initialValues={CURRENCY_EXCHANGE_INITIAL_VALUES} onSubmit={handleExchangeCurrency} />
    </StyledContainer>
  );
}

export default App;
