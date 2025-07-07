export const REGEX: Record<string, { pattern: RegExp; message?: string }> = {
  NUMBERS: {
    pattern: /^\d+$/,
  },
  PHONE: {
    pattern: /^\d{8,15}$/,
  },
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  DECIMALS: {
    pattern: /^\d+(\.\d{1,2})?$/,
  },
  COUNTRY_CODE: {
    pattern: /^\+\d{1,4}$/,
  },
  PASSWORD: {
    pattern: /[0-9A-Za-z!@#$*&^%]{8}/,
    message: "Include upper, lower, digit, and special character",
  },
};
