import { CurrencyExchangeForm } from './containers/CurrencyExchange';
import type { CurrencyExchangeFormData } from './containers/CurrencyExchange/CurrencyExchange.types';

import { StyledContainer } from './App.styled';

const CURRENCY_EXCHANGE_INITIAL_VALUES: CurrencyExchangeFormData = {
  from: {
    value: '',
    unit: 'USD',
  },
  to: {
    value: '',
    unit: 'EUR',
  },
};

function App() {
  const handleExchangeCurrency = console.log;

  return (
    <StyledContainer className="w-full h-full">
      <CurrencyExchangeForm initialValues={CURRENCY_EXCHANGE_INITIAL_VALUES} onSubmit={handleExchangeCurrency} />
    </StyledContainer>
  );
}

export default App;
