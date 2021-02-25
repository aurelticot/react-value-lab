import React from "react";
import { Value } from "./Value";

interface Props {
  value: number;
  decimals: number;
  displayMutedDecimals?: boolean;
  privacyMode?: boolean;
}

export const Quantity: React.FunctionComponent<Props> = (props) => {
  const {
    value,
    decimals,
    displayMutedDecimals = false,
    privacyMode = false,
  } = props;

  return (
    <Value
      value={value}
      decimals={decimals}
      displayMutedDecimals={displayMutedDecimals}
      hideUnit
      privacyMode={privacyMode}
    />
  );
};
