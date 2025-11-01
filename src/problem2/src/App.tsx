import { CurrencyExchangeForm } from './components/CurrencyExchange';
import type { CurrencyExchangeFormData } from './components/CurrencyExchange/CurrencyExchange.types';

import { StyledContainer } from './App.styled';

const CURRENCY_EXCHANGE_INITIAL_VALUES: CurrencyExchangeFormData = {
  from: {
    value: 0,
    unit: 'USD',
  },
};

function App() {
  const handleExchangeCurrency = console.log;

  return (
    <StyledContainer className="h-full">
      <CurrencyExchangeForm initialValues={CURRENCY_EXCHANGE_INITIAL_VALUES} onSubmit={handleExchangeCurrency} />
    </StyledContainer>
  );
}

export default App;
