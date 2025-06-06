import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const sendVerificationCode = useCallback((recipientEmail) => {
    // In real app, call backend. Here, generate fake code 6 digits.
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setEmail(recipientEmail);
    setVerificationCode(code);
    console.log('Mock verification code sent:', code);
  }, []);

  const verifyCode = useCallback((codeInput) => {
    if (codeInput.length === 6) {
      setIsVerified(true);
      return true; // accept any 6-char code in prototype
    }
    return false;
  }, []);

  return (
    <AuthContext.Provider
      value={{ email, isVerified, sendVerificationCode, verifyCode }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 