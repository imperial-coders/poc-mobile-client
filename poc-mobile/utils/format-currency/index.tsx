interface CurrencyFormatterParams {
  amount: number;
  locale?: string;
  currencyCode?: string;
  disableDecimalPlaces?: boolean;
  removeEmptyDecimalPlaces?: boolean;
}

export const formatCurrency = ({
  amount,
  locale = "en",
  currencyCode = "USD",
  disableDecimalPlaces = false,
  removeEmptyDecimalPlaces = true,
}: CurrencyFormatterParams) => {
  if (!Number.isFinite(Number(amount))) {
    return null;
  }

  const formattedAmount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: disableDecimalPlaces ? 0 : 2,
    maximumFractionDigits: disableDecimalPlaces ? 0 : 2,
  }).format(amount);

  if (removeEmptyDecimalPlaces && formattedAmount.includes(".00")) {
    // TODO => this needs to work dynamically for decimal point
    return formattedAmount.split(".")[0];
  }

  return formattedAmount;
};

export const formatCentsToDollars = (amount: number) => {
  const amountString = amount.toString().replace(/[^\d.-]/g, "");
  const amountInDollars = parseFloat(amountString);
  return amountInDollars ? amountInDollars / 100 : 0;
};
