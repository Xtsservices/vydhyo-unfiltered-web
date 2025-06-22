"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PhoneOutlined = () => <span>📱</span>;
// const MessageOutlined = () => <span>💬</span>;
const EyeOutlined = () => <span>👁️</span>;
const EyeInvisibleOutlined = () => <span>🙈</span>;

interface LoginResponse {
  userId?: string;
  message?: string;
  success?: boolean;
  expiresAt?: string;
}

interface OTPValidationResponse {
  accessToken?: string;
  user?: {
    id: string;
    name: string;
    mobile: string;
  };
  message?: string;
  success?: boolean;
}

const Login = () => {
  const router = useRouter();
  const API_BASE_URL = "http://216.10.251.239:3000";

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(timer => timer - 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [otpTimer]);

  const validatePhone = (phoneNumber: string) => {
    return /^[0-9]{10}$/.test(phoneNumber);
  };

  const makeAPIRequest = async (endpoint: string, data: any) => {
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
      const responseText = await response.text();
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        responseData = { message: responseText, success: false };
      }

      if (!response.ok) {
        if (response.status === 401 && endpoint === '/auth/validateOtp') {
          return {
            ...responseData,
            success: false,
            message: responseData.message || 'Invalid OTP. Please try again.'
          };
        }
        throw new Error(responseData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return responseData;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  const handleSendOTP = async () => {
    if (!validatePhone(phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const requestData = {
        mobile: phone,
        userType: "admin",
        language: "tel"
      };

      const data = await makeAPIRequest('/auth/login', requestData);

      if (data.userId || data.success !== false) {
        setUserId(data.userId || `temp-${Date.now()}`);
        setOtpSent(true);
        setOtpTimer(60);
        setSuccessMessage(data.message || 'OTP sent successfully!');
        setError('');
      } else {
        setError(data.message || 'Failed to send OTP. Please try again.');
      }

    } catch (error) {
      console.error('Error sending OTP:', error);
      if (error instanceof Error) {
        if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          setError('Network Error: Unable to connect to server. Please check your connection.');
        } else if (error.message.includes('401')) {
          setError('Authentication failed. Please contact support.');
        } else if (error.message.includes('400')) {
          setError('Invalid request. Please check your mobile number format.');
        } else if (error.message.includes('500')) {
          setError('Server error. Please try again later.');
        } else {
          setError(error.message || 'Failed to send OTP. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    if (!userId) {
      setError('Session expired. Please request OTP again.');
      resetPhoneLogin();
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const requestData = {
        userId: userId,
        OTP: otp,
        mobile: phone
      };

      const data: OTPValidationResponse = await makeAPIRequest('/auth/validateOtp', requestData);

      if (data.accessToken) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', data.accessToken);
        }
        
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          router.push('/Admin/app/dashboard');
        }, 1500);
      }

    } catch (error) {
      console.error('Error verifying OTP:', error);
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          setError('Invalid OTP. Please try again.');
        } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          setError('Network Error: Unable to connect to server.');
        } else {
          setError(error.message || 'Verification failed. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetPhoneLogin = () => {
    setOtpSent(false);
    setOtpTimer(0);
    setError('');
    setSuccessMessage('');
    setPhone('');
    setOtp('');
    setUserId('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(value);
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Illustration */}
      <div className={`${isMobile ? 'hidden' : 'flex'} flex-1 items-center justify-center p-8 bg-white`}>
        <div className="max-w-md text-center">
          {/* Healthcare Illustration */}
          <div className="mb-8">
            <svg width="400" height="300" viewBox="0 0 400 300" className="w-full h-auto">
              {/* Medical Background Elements */}
              <circle cx="80" cy="60" r="25" fill="#e8f4fd" opacity="0.7"/>
              <circle cx="320" cy="80" r="20" fill="#fff0e6" opacity="0.7"/>
              <circle cx="60" cy="200" r="15" fill="#f0f9ff" opacity="0.7"/>
              
              {/* Medical Icons */}
              <rect x="90" y="30" width="40" height="35" rx="8" fill="#6366f1" opacity="0.8"/>
              <text x="110" y="52" fill="white" fontSize="20" textAnchor="middle">+</text>
              
              {/* Doctor Character */}
              <circle cx="200" cy="120" r="35" fill="#fde68a"/>
              <rect x="175" y="145" width="50" height="60" rx="25" fill="#ffffff"/>
              <rect x="185" y="155" width="30" height="3" fill="#6366f1"/>
              <rect x="185" y="165" width="20" height="3" fill="#6366f1"/>
              <circle cx="190" cy="115" r="3" fill="#374151"/>
              <circle cx="210" cy="115" r="3" fill="#374151"/>
              <path d="M185 125 Q200 135 215 125" stroke="#374151" strokeWidth="2" fill="none"/>
              
              {/* Patient Character */}
              <circle cx="120" cy="140" r="25" fill="#fed7aa"/>
              <rect x="105" y="160" width="30" height="40" rx="15" fill="#f97316"/>
              <circle cx="115" cy="135" r="2" fill="#374151"/>
              <circle cx="125" cy="135" r="2" fill="#374151"/>
              
              {/* Medical Equipment */}
              <rect x="260" y="160" width="60" height="40" rx="8" fill="#ef4444"/>
              <rect x="270" y="170" width="15" height="3" fill="white"/>
              <rect x="290" y="170" width="20" height="3" fill="white"/>
              <text x="300" y="190" fill="white" fontSize="12" textAnchor="middle">🏥</text>
              
              {/* Medical Bag */}
              <rect x="50" y="180" width="30" height="25" rx="5" fill="#dc2626"/>
              <rect x="60" y="175" width="10" height="8" rx="2" fill="#dc2626"/>
              <text x="65" y="195" fill="white" fontSize="12" textAnchor="middle">+</text>
              
              {/* Decorative Elements */}
              <circle cx="300" cy="200" r="8" fill="#22d3ee" opacity="0.6"/>
              <rect x="340" y="180" width="20" height="20" rx="3" fill="#a855f7" opacity="0.6"/>
              
              {/* Heartbeat Line */}
              <path d="M50 250 L80 250 L90 230 L100 270 L110 230 L120 250 L350 250" 
                    stroke="#ef4444" strokeWidth="3" fill="none" opacity="0.7"/>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to Vydhyo
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your trusted healthcare companion. Secure, reliable, and always here for you.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {otpSent ? 'Enter OTP' : 'Login Vydhyo'}
            </h1>
            {!otpSent && (
              <p className="text-gray-600">Enter your mobile number to continue</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              ✅ {successMessage}
            </div>
          )}

          {!otpSent ? (
            /* Phone Number Input */
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your 10-digit mobile number"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember Me</span>
                </label>
                <button className="text-sm text-blue-600 hover:text-blue-500">
                  Login with OTP
                </button>
              </div>

              {/* Send OTP Button */}
              <button
                onClick={handleSendOTP}
                disabled={!phone || phone.length !== 10 || isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>

            </div>
          ) : (
            /* OTP Input */
            <div className="space-y-6">
              <div className="text-center mb-6">
               
                <p className="text-gray-600 mb-2">
                  OTP sent to +91 {phone}
                </p>
                <button
                  onClick={resetPhoneLogin}
                  className="text-blue-600 hover:text-blue-500 text-sm underline"
                >
                  ← Change number
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg font-mono letter-spacing-wider focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  style={{ letterSpacing: '0.5em' }}
                />
              </div>

              {/* Resend OTP */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Didn't receive OTP?"}
                </span>
                {otpTimer === 0 && (
                  <button
                    onClick={handleSendOTP}
                    disabled={isLoading}
                    className="text-blue-600 hover:text-blue-500 underline disabled:opacity-50"
                  >
                    {isLoading ? 'Sending...' : 'Resend OTP'}
                  </button>
                )}
              </div>

              {/* Verify Button */}
              <button
                onClick={handleOTPVerification}
                disabled={!otp || otp.length !== 6 || isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? 'Verifying...' : 'Verify & Sign In'}
              </button>
            </div>
          )}

          {/* Terms and Privacy */}
          <div className="mt-8 text-center text-sm text-gray-600">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 underline">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;