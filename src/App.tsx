import React, { useState } from "react";
import { Ticker } from "./Ticker";

// create some example with random quantities
const tickers = [
  {
    pair: "BTCBUSD",
    decimals: 2,
    symbol: "BTC",
    baseCurrency: "BUSD",
    quantity: 0.1,
    type: "coin",
  },
  {
    pair: "ETHBUSD",
    decimals: 2,
    symbol: "ETH",
    baseCurrency: "BUSD",
    quantity: 1,
    type: "coin",
  },
  {
    pair: "XRPBUSD",
    decimals: 5,
    symbol: "XRP",
    baseCurrency: "BUSD",
    quantity: 3000,
    type: "coin",
  },
  {
    pair: "UNIBUSD",
    decimals: 4,
    symbol: "UNI",
    baseCurrency: "BUSD",
    quantity: 10,
    type: "token",
  },
  {
    pair: "BNBBUSD",
    decimals: 4,
    symbol: "BNB",
    baseCurrency: "BUSD",
    quantity: 0.75,
    type: "coin",
  },
  {
    pair: "ZECBUSD",
    decimals: 4,
    symbol: "ZEC",
    baseCurrency: "BUSD",
    quantity: 1,
    type: "coin",
  },
  {
    pair: "AAVEBUSD",
    decimals: 4,
    symbol: "AAVE",
    baseCurrency: "BUSD",
    quantity: 0.35,
    type: "token",
  },
  {
    pair: "DASHBUSD",
    decimals: 4,
    symbol: "DASH",
    baseCurrency: "BUSD",
    quantity: 0.5,
    type: "coin",
  },
  {
    pair: "EOSBUSD",
    decimals: 4,
    symbol: "EOS",
    baseCurrency: "BUSD",
    quantity: 30,
    type: "coin",
  },
  {
    pair: "BCHBUSD",
    decimals: 4,
    symbol: "BCH",
    baseCurrency: "BUSD",
    quantity: 0.2,
    type: "coin",
  },
  {
    pair: "USDCBUSD",
    decimals: 6,
    symbol: "DAI",
    baseCurrency: "BUSD",
    quantity: 4000,
    type: "stable",
  },
  {
    pair: "USDCBUSD",
    decimals: 6,
    symbol: "BUSD",
    baseCurrency: "BUSD",
    quantity: 500,
    type: "stable",
  },
  {
    pair: "EURBUSD",
    decimals: 2,
    symbol: "EUR",
    baseCurrency: "BUSD",
    quantity: 1000,
    type: "fiat",
  },
];

function App() {
  const [privacy, setPrivacy] = useState(false);
  const [displayMutedDecimals, setDisplayMutedDecimals] = useState(true);
  const [highlightDiff, setHighlightDiff] = useState(true);

  console.log(`Rendering App component`);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <div
        style={{
          height: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <input
            type="checkbox"
            checked={privacy}
            onChange={() => setPrivacy((p) => !p)}
          />{" "}
          Privacy mode
        </div>
        <div>
          <input
            type="checkbox"
            checked={displayMutedDecimals}
            onChange={() => setDisplayMutedDecimals((p) => !p)}
          />{" "}
          Display muted decimals
        </div>
        <div>
          <input
            type="checkbox"
            checked={highlightDiff}
            onChange={() => setHighlightDiff((p) => !p)}
          />{" "}
          Highlight diff
        </div>
      </div>
      <div
        style={{
          flexGrow: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <table style={{ fontSize: "1.6rem" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Pairs</th>
              <th style={{ textAlign: "right" }}>Price (USD)</th>
              <th style={{ textAlign: "right" }}>Quantity</th>
              <th style={{ textAlign: "right" }}>Balance (USD)</th>
            </tr>
          </thead>
          <tbody>
            {tickers.map((tick) => {
              return (
                <Ticker
                  key={tick.symbol}
                  symbol={tick.symbol}
                  pair={tick.pair}
                  type={tick.type}
                  decimals={tick.decimals}
                  quantity={tick.quantity}
                  currency={tick.baseCurrency}
                  displayMutedDecimals={displayMutedDecimals}
                  privacyMode={privacy}
                  highlightDiff={highlightDiff}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
