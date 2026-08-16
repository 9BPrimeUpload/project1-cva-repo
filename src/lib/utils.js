import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getPreferredCurrency(locale) {
  const resolvedLocale = locale || Intl.DateTimeFormat().resolvedOptions().locale;
  const region = resolvedLocale?.split("-")[1] || resolvedLocale?.split("_")[1];

  const currencyByRegion = {
    US: "USD",
    GB: "GBP",
    IN: "INR",
    AU: "AUD",
    CA: "CAD",
    DE: "EUR",
    FR: "EUR",
    ES: "EUR",
    IT: "EUR",
    NL: "EUR",
    BE: "EUR",
    PT: "EUR",
    IE: "EUR",
    AT: "EUR",
    LU: "EUR",
    FI: "EUR",
    GR: "EUR",
    SI: "EUR",
    MT: "EUR",
    CY: "EUR",
    EE: "EUR",
    LV: "EUR",
    LT: "EUR",
    SK: "EUR",
    CZ: "EUR",
    HR: "EUR",
    RO: "EUR",
    BG: "EUR",
    PL: "EUR",
    HU: "EUR",
    SE: "SEK",
    NO: "NOK",
    DK: "DKK",
    CH: "CHF",
    JP: "JPY",
    SG: "SGD",
    NZ: "NZD",
    ZA: "ZAR",
    BR: "BRL",
    MX: "MXN",
    AE: "AED",
    SA: "SAR",
  };

  return currencyByRegion[region?.toUpperCase()] || "USD";
}

export async function getCurrencyFromIpService() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error("Unable to determine currency from IP");
    }

    const data = await response.json();
    return data.currency?.toUpperCase() || null;
  } catch {
    return null;
  }
}

export function useDetectedCurrency(locale) {
  const [currency, setCurrency] = useState(() => getPreferredCurrency(locale));

  useEffect(() => {
    let isActive = true;

    async function loadCurrency() {
      const detectedCurrency = await getCurrencyFromIpService();
      if (!isActive) return;

      setCurrency(detectedCurrency || getPreferredCurrency(locale));
    }

    loadCurrency();

    return () => {
      isActive = false;
    };
  }, [locale]);

  return currency;
}

export function formatPlanPrice(amount, locale, currencyOverride) {
  const currency = currencyOverride || getPreferredCurrency(locale);
  const formatter = new Intl.NumberFormat(locale || undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
}
