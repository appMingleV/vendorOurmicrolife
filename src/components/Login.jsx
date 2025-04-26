import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggingLoading, setLoggingLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [inputError, setInputError] = useState("");
  const [timer, setTimer] = useState(30);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleResendOTP = () => {
    if (isDisabled) return;
    setIsDisabled(true);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const isEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const fetchLogin = async (input) => {
    try {
      const payload = isEmail(input)
        ? { email: input }
        : { mobile_number: input };
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}vendor/login`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      startTimer();
      setOtpSent(true);
      setInputError("");
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      alert(errorMessage);
      setOtpSent(false);
    }
  };

  const handleSendOtp = async () => {
    if (userInput) {
      const isValidInput = isEmail(userInput) || userInput?.length === 10;
      if (isValidInput) {
        await fetchLogin(userInput);
      } else {
        setInputError("Please enter a valid email or 10-digit mobile number");
      }
    } else {
      setInputError("Input cannot be empty");
    }
  };

  const handleLogin = async () => {
    if (!otpSent) {
      alert("Please request an OTP first");
      return;
    }
    setLoggingLoading(true);
    if (otp) {
      try {
        const payload = isEmail(userInput)
          ? { email: userInput, otp }
          : { mobile_number: userInput, otp };

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}vendor/verifyOTP`,
          payload
        );

        const token = response?.data?.token;
        const vendorID = response?.data?.vendorId;
        localStorage?.setItem("token", token);
        localStorage?.setItem("vendorId", vendorID);
        localStorage?.setItem("login", true);
        navigate("/dashboard");
      } catch (error) {
        setLoggingLoading(false);
        const errorMessage =
          error?.response?.data?.message || "Invalid OTP. Please try again.";
        setOtpError(errorMessage);
      }
    } else {
      setOtpError("Please enter the OTP sent to your mobile or email");
    }
  };

  const startTimer = () => {
    let countdown = 30;
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerInterval);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 p-8 flex items-center justify-center">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <img
              src={require("../images/SignUp.jpg")}
              alt="Login Illustration"
              className="w-full h-auto max-h-[300px] object-contain rounded-lg shadow-lg"
            />
            <div className="mt-6 text-center">
              <h3 className="text-white text-xl font-bold">Welcome Back!</h3>
              <p className="text-purple-100 mt-2">
                Login to access your seller dashboard and manage your business.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Seller Login</h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto mt-2 rounded-full"></div>
          </div>

          {/* Email or Phone Input */}
          <div className="mb-4">
            <label
              htmlFor="user_input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email or Mobile Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="user_input"
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                  setInputError("");
                }}
                placeholder="Enter your email or mobile number"
                className={`w-full p-3 border-2 ${
                  inputError ? "border-red-400" : "border-gray-200"
                } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                disabled={otpSent}
              />
              {isEmail(userInput) && (
                <div className="absolute right-3 top-3 text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              )}
              {!isEmail(userInput) && userInput.length > 0 && (
                <div className="absolute right-3 top-3 text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
              )}
            </div>
            {inputError && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {inputError}
              </p>
            )}
          </div>

          {/* Send OTP Button */}
          {!otpSent && (
            <div className="mt-6">
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
                  loading
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-200"
                } flex items-center justify-center`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          )}

          {/* OTP Input Section */}
          {otpSent && (
            <div className="mt-4">
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setOtpError("");
                  }}
                  placeholder="Enter 6-digit OTP"
                  className={`w-full p-3 border-2 ${
                    otpError ? "border-red-400" : "border-gray-200"
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                />
                {otpError && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {otpError}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    OTP sent <span className="font-medium text-gray-700 ml-1">{timer}s</span>
                  </span>
                </div>
                <button
                  onClick={handleResendOTP}
                  disabled={isDisabled}
                  className={`text-sm px-4 py-2 rounded-lg transition-all ${
                    isDisabled
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200 font-medium"
                  } flex items-center`}
                >
                  {isDisabled ? (
                    "Resend OTP"
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      Resend
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={loggingLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                  loggingLoading
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-200"
                }`}
              >
                {loggingLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Login to Dashboard"
                )}
              </button>
            </div>
          )}

          {/* Signup Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="text-purple-600 font-medium hover:underline hover:text-purple-700 transition-all">
                  Create New Account
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;