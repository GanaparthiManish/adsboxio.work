// UPI validation constants and regex
const UPI_REGEX = /^[a-zA-Z0-9.\-_]{3,}@[a-zA-Z]{3,}$/;

const VALID_UPI_HANDLES = [
  'okaxis',
  'okhdfcbank',
  'okicici',
  'oksbi',
  'paytm',
  'ybl',
  'apl',
  'airtel',
  'freecharge'
];

export const validateUPI = (upiId: string): boolean => {
  if (!upiId || typeof upiId !== 'string') {
    return false;
  }
  
  // Trim whitespaces and convert to lowercase
  const cleanedUpiId = upiId.trim().toLowerCase();
  
  // Check basic format using regex
  if (!UPI_REGEX.test(cleanedUpiId)) {
    return false;
  }
  
  const [username, handle] = cleanedUpiId.split('@');
  
  // Enhanced username validation
  if (username.length < 3 || username.length > 30) {
    return false;
  }
  
  // Validate UPI handle
  return VALID_UPI_HANDLES.includes(handle);
};

export const verifyUPI = async (upiId: string): Promise<{ isValid: boolean; message: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isValid = validateUPI(upiId);
    
    return {
      isValid,
      message: isValid ? 'Valid UPI ID' : 'Invalid UPI ID format or handle'
    };
  } catch (error) {
    return {
      isValid: false,
      message: error instanceof Error ? error.message : 'Failed to verify UPI ID'
    };
  }
};