import crypto from 'crypto';

export const generateOTP = (length = 6) => {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
};

export const isOTPValid = (storedOTP, enteredOTP, expiryTime) => {
  if (!storedOTP || !enteredOTP) return false;
  if (Date.now() > expiryTime) return false;
  return storedOTP === enteredOTP;
};