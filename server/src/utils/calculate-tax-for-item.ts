type CalculateTaxForItemReturn = {
  cgstAmount: number | null;
  sgstAmount: number | null;
  igstAmount: number | null;
};

export const calculateTaxForItem = (productGstPercentage: number, isIntraState: boolean): CalculateTaxForItemReturn => {
  if (isIntraState) {
    // Divide the GST Percentage equally for CGST & SGST
    const cgst = productGstPercentage / 2;
    const sgst = productGstPercentage / 2;

    return { cgstAmount: cgst, sgstAmount: sgst, igstAmount: null };
  } else {
    return { cgstAmount: null, sgstAmount: null, igstAmount: productGstPercentage };
  }
};
