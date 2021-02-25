import React from "react";
import { Value } from "./Value";

interface Props {
  value: number;
  previousValue?: number;
  decimals: number;
  unit?: string;
  displayMutedDecimals?: boolean;
  highlightDiff?: boolean;
  hideUnit?: boolean;
}

export const Price: React.FunctionComponent<Props> = (props) => {
  const {
    value,
    previousValue,
    decimals,
    unit,
    displayMutedDecimals = false,
    highlightDiff = true,
    hideUnit = false,
  } = props;

  return (
    <Value
      value={value}
      decimals={decimals}
      displayMutedDecimals={displayMutedDecimals}
      hideUnit={hideUnit}
      highlightDiff={highlightDiff}
      previousValue={previousValue}
      privacyMode={false}
      smallDecimals={true}
      unit={unit}
    />
  );
};
