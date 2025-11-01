import { CurrencyExchangeForm } from './components/CurrencyExchange';
import type { CurrencyExchangeFormData } from './components/CurrencyExchange/CurrencyExchange.types';

import { StyledContainer } from './App.styled';

const CURRENCY_EXCHANGE_INITIAL_VALUES: CurrencyExchangeFormData = {
  value: 0,
};

function App() {
  return (
    <StyledContainer>
      <CurrencyExchangeForm initialValues={CURRENCY_EXCHANGE_INITIAL_VALUES} onSubmit={console.log} />
    </StyledContainer>
  );
}

export default App;
