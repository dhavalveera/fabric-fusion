export const generateOTP = (): number => {
  // Generate a random number between 100000 and 999999
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;

  // Convert the random number to a string
  const otpString = randomNumber.toString();

  // Pad the OTP string with leading zeros if necessary
  const paddedOtpString = otpString.padStart(6, "0");

  // Return the padded OTP string
  return Number(paddedOtpString);
};
