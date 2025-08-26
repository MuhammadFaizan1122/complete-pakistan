// For production, use Redis or database instead
const otpStore = new Map();

export const storeOTP = (email, otp, expiryMinutes = 10) => {
  const expiryTime = Date.now() + expiryMinutes * 60 * 1000;
  otpStore.set(email, { otp, expiryTime });
  setTimeout(() => otpStore.delete(email), expiryMinutes * 60 * 1000);
};

export const getOTP = (email) => {
  return otpStore.get(email);
};

export const deleteOTP = (email) => {
  otpStore.delete(email);
};