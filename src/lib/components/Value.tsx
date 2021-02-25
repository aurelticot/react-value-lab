import React from 'react'
import { getComparisonDiffIndex, convertValueToString } from '../utils'
import { MAX_NB_DECIMALS } from "../constants"

interface Props {
  value: number;
  previousValue?: number;
  decimals: number;
  unit?: string;
  privacyMode?: boolean;
  displayMutedDecimals?: boolean;
  smallDecimals?: boolean;
  highlightDiff?: boolean;
  hideUnit?: boolean;
}

export const Value: React.FunctionComponent<Props> = (props) => {
  const {
    value,
    previousValue,
    decimals,
    unit,
    privacyMode = false,
    displayMutedDecimals = false,
    smallDecimals = false,
    highlightDiff = false,
    hideUnit = false
  } = props;

  const valueString = convertValueToString(value, decimals);

  const nbIntegers = valueString.length - decimals;
  const nbDecimals = decimals <= MAX_NB_DECIMALS ? (decimals < 0 ? 0 : decimals) : MAX_NB_DECIMALS;

  const valueInteger = valueString.slice(0, nbIntegers);
  const valueDecimals = valueString.slice(nbIntegers, valueString.length - (decimals - MAX_NB_DECIMALS));

  let diffColor = "inherit"
  let neutralValueInteger = valueInteger;
  let changedValueInteger = '';
  let neutralValueDecimals = valueDecimals;
  let changedValueDecimals = '';

  if (highlightDiff && previousValue) {
    diffColor = value > previousValue ? "#4caf50" : value < previousValue ? "#f44336" : "inherit";

    const previousAmountString = convertValueToString(previousValue, decimals);
    let diffIndex = getComparisonDiffIndex(valueString, previousAmountString);

    neutralValueInteger = valueInteger.slice(0, diffIndex);
    changedValueInteger = valueInteger.slice(diffIndex, valueInteger.length +1)

    if (diffIndex < nbIntegers) {
      neutralValueDecimals = '';
      changedValueDecimals = valueDecimals;
    } else {
      neutralValueDecimals = valueDecimals.slice(0, diffIndex - nbIntegers);
      changedValueDecimals = valueDecimals.slice(diffIndex - nbIntegers);
    }
  }

  const mutedDecimals = String(10 ** (MAX_NB_DECIMALS - nbDecimals)).slice(1);

  return (
    <span style={{fontFamily: "'Roboto Mono', monospace"}}>
      <span style={privacyMode ? { color: 'transparent', textShadow: '0 0 0.8rem rgba(0,0,0,0.5)' } : {}}>
        <span>
          <span>
            {neutralValueInteger}
            <span style={privacyMode ? {} : { color: diffColor }}>
              {changedValueInteger}
            </span>
          </span>
          {`.`}
          <span style={smallDecimals ? { fontSize: "0.8em" } : {}}>
            {neutralValueDecimals}
            <span style={privacyMode ? {} : { color: diffColor }}>
              {changedValueDecimals}
            </span>
            {displayMutedDecimals &&
              <span style={privacyMode ? {} : { color: '#adadad' }}>
                {mutedDecimals}
              </span>
            }
          </span>
        </span>
      </span>
      {!hideUnit && unit && <span>{` ${unit}`}</span>}
    </span>
  )
}