export const amountNumberToWords = (amountNumber: number): string => {
  const singleDigits = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const twoDigits = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const placeValues = ["", "Thousand", "Lakh", "Crore"];

  const convertToWords = (n: number): string => {
    if (n === 0) return "";
    if (n < 10) return singleDigits[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return `${twoDigits[Math.floor(n / 10)]} ${singleDigits[n % 10]}`.trim();
    if (n < 1000) return `${singleDigits[Math.floor(n / 100)]} Hundred ${convertToWords(n % 100)}`.trim();

    for (let i = 0, unit = 1000; i < placeValues.length; i++, unit *= 100) {
      if (n < unit * 100) {
        return `${convertToWords(Math.floor(n / unit))} ${placeValues[i]} ${convertToWords(n % unit)}`.trim();
      }
    }
    return "";
  };

  const rupees = Math.floor(amountNumber);
  const paise = Math.round((amountNumber - rupees) * 100);

  let result = `${convertToWords(rupees)} Rupees`;
  if (paise > 0) {
    result += ` and ${convertToWords(paise)} Paise`;
  }

  return result || "Zero Rupees";
};
