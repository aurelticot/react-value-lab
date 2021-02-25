import React, { useState, useEffect } from 'react';
import { Amount, Quantity, Price } from './lib/components';
import { getBinanceTickerWSUrl, normalizeAmount } from './lib/utils'

interface Props {
  symbol: string;
  pair: string;
  type: string;
  decimals?: number;
  quantity?: number;
  currency: string;
  privacyMode?: boolean;
  displayMutedDecimals?: boolean;
  highlightDiff?: boolean;
  onBalanceChange?: (symbol: string, balance: number) => void;
}

interface PriceDef {
  current: number;
  previous: number;
}

export const Ticker: React.FunctionComponent<Props> = (props) => {
  const {
    symbol,
    pair,
    type,
    decimals = 6,
    quantity = 0,
    currency,
    privacyMode = false,
    displayMutedDecimals = false,
    highlightDiff = false,
  } = props;

  const [price, setPrice] = useState<PriceDef>({ current: 0, previous: 0 });
  const [balance, setBalance] = useState<PriceDef>({ current: 0, previous: 0 });

  useEffect(() => {
    const binanceWSUrl = getBinanceTickerWSUrl(pair);
    const socket = new WebSocket(binanceWSUrl)
    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      const newBalance = quantity * data.c;
      setPrice(priceState => ({
        current: data.c,
        previous: priceState.current
      }));
      setBalance(balanceState => ({
        current: newBalance,
        previous: balanceState.current
      }));
    })
    return () => {
      socket.close();
    }
  }, [quantity, pair, balance, symbol] )

  return (
    <tr>
      <td style={{ textAlign: "left" }}>
        {symbol}
        <span style={{marginLeft: "10px", fontSize: "0.7em", color: "grey"}}>
          {type}
        </span>
      </td>
      <td style={{ textAlign: "right"}}>
        <Price
          value={normalizeAmount(price.current, decimals)}
          previousValue={normalizeAmount(price.previous, decimals)}
          decimals={decimals}
          unit={currency}
          displayMutedDecimals={displayMutedDecimals}
          highlightDiff={highlightDiff}
          hideUnit
          />
      </td>
      <td style={{ textAlign: "right" }}>
        <span style={privacyMode ? { color: 'transparent', textShadow: '0 0 0.8rem rgba(0,0,0,0.5)' } : {}}>
          <Quantity
            value={normalizeAmount(quantity, 6)}
            decimals={6}
            displayMutedDecimals={true}
            privacyMode={privacyMode}
          />
        </span>
      </td>
      <td style={{ textAlign: "right"}}>
        <Amount
          value={normalizeAmount(balance.current, 2)}
          previousValue={normalizeAmount(balance.previous, 2)}
          decimals={2}
          displayMutedDecimals={false}
          highlightDiff={highlightDiff}
          privacyMode={privacyMode}
          hideUnit
          />
      </td>
    </tr>
  );
}