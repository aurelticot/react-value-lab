import React from 'react'
import { Value } from './Value';

interface Props {
  value: number;
  previousValue?: number;
  decimals: number;
  unit?: string;
  privacyMode?: boolean;
  displayMutedDecimals?: boolean;
  highlightDiff?: boolean;
  hideUnit?: boolean;
}

export const Amount: React.FunctionComponent<Props> = (props) => {
  const {
    value,
    previousValue,
    decimals,
    unit,
    privacyMode = false,
    displayMutedDecimals = false,
    highlightDiff = false,
    hideUnit = false
  } = props;

  return <Value
    value={value}
    decimals={decimals}
    displayMutedDecimals={displayMutedDecimals}
    hideUnit={hideUnit}
    highlightDiff={highlightDiff}
    previousValue={previousValue}
    privacyMode={privacyMode}
    smallDecimals={true}
    unit={unit}
  />;
}