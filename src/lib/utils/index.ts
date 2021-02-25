export const normalizeAmount = (amount: number, decimals: number): number => {
  const precision = 10 ** (decimals < 0 ? 0 : decimals )
  return amount * precision;
}

export const getComparisonDiffIndex = (value1: string, value2: string): number => {
  // TODO handle when values are not same length
  let index = value2.length + 1;
  value2.split('').forEach((val, i) => {
      if (val !== value1.charAt(i)) {
        index = Math.min(index, i)
      }
  })
  return index;
}

export const convertValueToString = (value: number, decimals: number): string => {
  let valueString = String(value).split('.')[0];
  if (valueString.length < decimals + 1) {
    const nbMissingLeadingZeros = decimals + 1 - valueString.length;
    const leadingZeros = String(10 ** nbMissingLeadingZeros).slice(1);
    valueString = `${leadingZeros}${valueString}`
  }
  return valueString;
}

export const getBinanceTickerWSUrl = (pair: string): string => {
  return `wss://stream.binance.com:9443/ws/${pair.toLowerCase()}@ticker`
}
