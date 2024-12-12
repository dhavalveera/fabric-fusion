export const calculatePaymentGatewayFee = (paymentGatewayPercentage: number, amount: number): number => Math.ceil((Number(amount) * Number(paymentGatewayPercentage)) / 100);

export const calculateGST = (taxPercentage: number, taxableAmount: number): number => Math.ceil((Number(taxableAmount) * Number(taxPercentage)) / 100);

export const discountAmount = (totalPriceWithoutGST: number, discountPercentage: number, discountValue: number): number => {
  if (discountPercentage) {
    return Math.ceil(Number(totalPriceWithoutGST) * (Number(discountPercentage) / 100));
  } else if (discountValue) {
    return Number(discountValue);
  } else {
    return 0;
  }
};

export const getAmountAfterDiscount = (mrp: number, discountedAmt: number): number => Math.ceil(Number(mrp) - Number(discountedAmt));

export const totalPriceWithoutGST = (qty: number, pPrice: number): number => Math.ceil(Number(qty) * Number(pPrice));

export const totalPriceWithGST = (totalPrice: number, gstValue: number): number => Math.ceil(Number(totalPrice) + Number(gstValue));

export const totalPayableValue = (amtWithGST: number, paymentGatewayValue: number): number => Math.ceil(Number(amtWithGST) + Number(paymentGatewayValue));
