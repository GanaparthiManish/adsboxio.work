export const generateReferralCode = (userId: string): string => {
  const prefix = 'ADSBOX';
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}${random}${timestamp.slice(-3)}`;
};

export const validateReferralCode = (code: string): boolean => {
  const pattern = /^ADSBOX[A-Z0-9]{6}$/;
  return pattern.test(code);
};