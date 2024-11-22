import { verifyUPI } from '../lib/upiValidation';
// src/lib/upiValidation.ts

 
// UPI ID validation
const validateUpiId = (upiId: string): boolean => {
  // Supports most Indian UPI formats including newer ones
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
  return pattern.test(upiId);
};


// List of valid UPI handles in India
const VALID_UPI_HANDLES = [
  'okaxis',
  'okhdfcbank',
  'okicici',
  'oksbi',
  'paytm',
  'ybl'
];

/**
 * Validates a UPI ID format and handle
 * @param upiId The UPI ID to validate
 * @returns boolean indicating if the UPI ID is valid
 */
const validateUPI = (upiId: string): boolean => {
  if (!upiId || typeof upiId !== 'string') {
    return false;
  }
  
  // Check basic format using regex
  if (!UPI_REGEX.test(upiId)) {
    return false;
  }
  
  const [username, handle] = upiId.split('@');
  
  // Validate username length
  if (username.length < 3) {
    return false;
  }
  
  // Validate UPI handle
  return VALID_UPI_HANDLES.includes(handle.toLowerCase());
};

/**
 * Verifies a UPI ID with simulated async validation
 * @param upiId The UPI ID to verify
 * @returns Promise with verification result
 */
export const verifyUPI = async (upiId: string) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isValid = validateUPI(upiId);
    
    return {
      success: isValid,
      verified: isValid,
      upiId: isValid ? upiId : null,
      error: isValid ? null : 'Invalid UPI ID format or handle'
    };
  } catch (error) {
    return {
      success: false,
      verified: false,
      upiId: null,
      error: error instanceof Error ? error.message : 'Failed to verify UPI ID'
    };
  }
};