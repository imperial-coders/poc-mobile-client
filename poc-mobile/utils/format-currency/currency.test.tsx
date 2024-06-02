import { formatCurrency } from ".";

describe("currency test", () => {
  it("whole numbers should not have decimals with default USD currency code", () => {
    let amount = 12;
    expect(formatCurrency({ amount })).toBe("$12");
    amount = 1;
    expect(formatCurrency({ amount })).toBe("$1");
    amount = 1012;
    expect(formatCurrency({ amount })).toBe("$1,012");
    amount = 23;
    expect(formatCurrency({ amount })).toBe("$23");
    amount = 500;
    expect(formatCurrency({ amount })).toBe("$500");
    amount = 1_000_000;
    expect(formatCurrency({ amount })).toBe("$1,000,000");
  });

  it("whole numbers with empty 00 decimals should not have decimals with default USD currency code", () => {
    let amount = 12.0;
    expect(formatCurrency({ amount })).toBe("$12");
    amount = 1.0;
    expect(formatCurrency({ amount })).toBe("$1");
    amount = 1012.0;
    expect(formatCurrency({ amount })).toBe("$1,012");
    amount = 23.0;
    expect(formatCurrency({ amount })).toBe("$23");
    amount = 500.0;
    expect(formatCurrency({ amount })).toBe("$500");
    amount = 1_000_000.0;
    expect(formatCurrency({ amount })).toBe("$1,000,000");
  });

  it("decimals should always be formatted correctly in default currency code USD", () => {
    let amount = 12.01;
    expect(formatCurrency({ amount })).toBe("$12.01");
    amount = 12.99;
    expect(formatCurrency({ amount })).toBe("$12.99");
    amount = 1.23;
    expect(formatCurrency({ amount })).toBe("$1.23");
    amount = 1012.12;
    expect(formatCurrency({ amount })).toBe("$1,012.12");
    amount = 23.88;
    expect(formatCurrency({ amount })).toBe("$23.88");
    amount = 500.7;
    expect(formatCurrency({ amount })).toBe("$500.70");
    amount = 1_000_000.1;
    expect(formatCurrency({ amount })).toBe("$1,000,000.10");
  });
});
