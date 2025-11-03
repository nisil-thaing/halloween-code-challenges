import { FC, ReactElement } from "react";
// Sample import for hooks
import { usePrices, useWalletBalances } from "@/hooks";

// Imagine we have this import
import classes from "./wallet.styles";

// Should move this to separated file: Ex. "wallet.typed.ts"
export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain?: string;
}

// Should move this to separated file: Ex. "wallet.typed.ts"
export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Should move this to separated file: Ex. "wallet.constants.ts"
export const FALLBACK_BLOCKCHAIN_PRIORITY = -99;
export const BLOCKCHAIN_PRIORITY_MAP: { [key: string]: number } = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

// Since this function has no arguments specific inside the component
// I decide to move it to outside
const getPriority = (blockchain: string | undefined): number =>
  (blockchain && BLOCKCHAIN_PRIORITY_MAP[blockchain]) ||
  FALLBACK_BLOCKCHAIN_PRIORITY;

// I just wanna export this to reuse somewhere, mayby test files
export interface Props extends BoxProps {}

export const WalletPage: FC<Props> = ({ children, ...rest }) => {
  const balances: Array<WalletBalance> = useWalletBalances();
  const prices = usePrices();

  const rows = balances
    .sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      return rightPriority - leftPriority;
    })
    .reduce((acc: Array<ReactElement>, balance: WalletBalance, idx: number) => {
      const balancePriority = getPriority(balance.blockchain);

      if (
        balancePriority > FALLBACK_BLOCKCHAIN_PRIORITY &&
        balance.amount <= 0
      ) {
        const usdValue = prices[balance.currency] * balance.amount;

        return [
          ...acc,
          <WalletRow
            className={classes.row}
            key={idx}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.amount.toFixed()}
          />,
        ];
      }

      return acc;
    }, []);

  return <div {...rest}>{rows}</div>;
};
