interface WalletBalance {
  currency: string;
  amount: number;
  blockchain?: string; // Seem like we missing this
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
// Since we defined them as interface, so we can apply interface's inheritance, while they have some similar properties
/**
 * interface FormattedWalletBalance extends WalletBalance {
 *  formatted: string;
 *}
 * */

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };
  // => this getPriority isn't necessary, while that switch/case make this logic more complicated, then we need to write test it later as well
  // we can provide a global constant:
  /**
   * const FALLBACK_BLOCKCHAIN_PRIORITY = -99
   * const BLOCKCHAIN_PRIORITY_MAP: {[key: string]: number} = {
   *  'Osmosis': 100,
   *  'Ethereum': 50,
   *  'Arbitrum': 30,
   *  'Zilliqa': 20,
   *  'Neo': 20
   * }
   */

  // Now the getPriority could be refactored:
  /**
   * const getPriority = (blockchain: string | null): number => blockchain && BLOCKCHAIN_PRIORITY_MAP[blockchain] || FALLBACK_BLOCKCHAIN_PRIORITY
   * */

  // Since the logic isn't too complicated, the useMemo here is something overkill
  // I prefer to remove it to release the memory
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // => unused variable, just remove it
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
        // No need if return here
        // Just simply:
        // return lhsPriority > FALLBACK_BLOCKCHAIN_PRIORITY && balance.amount <= 0
        // one more thing, I can't see any lhsPriority defined, while the balancePriority has no usage, I can assume that is the wrong typing:
        // return balancePriority > FALLBACK_BLOCKCHAIN_PRIORITY && balance.amount <= 0
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }

        // No if... else necessary
        // just simply:
        // return rightPriority - leftPriority
      });

    // I can't find any usage of this prices in this useMemo callback
    // Since we have no specific logics for it, just remove that in the dependency list
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // That should be formattedBalances.map() instead
  // actually, we can combine all of sortedBalances, formattedBalances and this rows calculation loops ablove
  // into 1 chaining .reduce().sort() instead
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index} // Using index here isn't good enough, better have an id foreach instead
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    },
  );

  return <div {...rest}>{rows}</div>;
};
