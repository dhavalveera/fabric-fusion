export const gstAmountCalculator = (basePrice: number, gstPercentage: number): number => {
  // Calculate GST Amount
  const gstAmount = basePrice * (gstPercentage / 100);

  // Calculate Total Price
  const totalPrice = basePrice + gstAmount;

  return totalPrice;
};
