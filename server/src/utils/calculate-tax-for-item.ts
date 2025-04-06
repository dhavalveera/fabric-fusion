type CalculateTaxForItemReturn = {
  cgstPercent: number | null;
  sgstPercent: number | null;
  igstPercent: number | null;
  cgstAmount: number | null;
  sgstAmount: number | null;
  igstAmount: number | null;
};

export const calculateTaxForItem = (productPrice: number, qty: number, isIntraState: boolean): CalculateTaxForItemReturn => {
  let productGstPercentage: number;

  // Determine the GST Rate based on Product Price
  if (productPrice < 1000) {
    productGstPercentage = 5; // 5% GST for Items prices below Rs. 1000
  } else {
    productGstPercentage = 12; // 12% GST for Items prices above Rs. 1000
  }

  if (isIntraState) {
    // Divide the GST Percentage equally for CGST & SGST
    const cgst = parseFloat((productGstPercentage / 2).toFixed(1));
    const sgst = parseFloat((productGstPercentage / 2).toFixed(1));

    const cgstAmount = (productPrice * cgst) / 100;
    const sgstAmount = (productPrice * sgst) / 100;

    return { cgstPercent: cgst, sgstPercent: sgst, cgstAmount, sgstAmount, igstPercent: null, igstAmount: null };
  } else {
    const igstAmount = (productPrice * productGstPercentage) / 100;

    return { cgstAmount: null, cgstPercent: null, sgstAmount: null, sgstPercent: null, igstAmount, igstPercent: parseFloat(productGstPercentage.toFixed(1)) };
  }
};
