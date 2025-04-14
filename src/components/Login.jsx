
// import axios from "axios";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [userInput, setUserInput] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loggingLoading, setLoggingLoading] = useState(false);
//   const [otpError, setOtpError] = useState(""); // State for OTP error message
//   const [inputError, setInputError] = useState(""); // State for email/mobile validation error
//   const [timer, setTimer] = useState(30); // Timer state for countdown
//   const [isDisabled, setIsDisabled] = useState(false); // To disable button during wait time

//   const handleResendOTP = () => {
//     if (isDisabled) return; // Prevent multiple clicks
//     console.log("Resending OTP...");

//     // Start cooldown
//     setIsDisabled(true);
//     setTimer(30); // Set cooldown time
//     const interval = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval); // Stop countdown
//           setIsDisabled(false); // Re-enable button
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const isEmail = (input) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(input);
//   };

//   const fetchLogin = async (input) => {
//     try {
//       const payload = isEmail(input)
//         ? { email: input }
//         : { mobile_number: input };
//       setLoading(true);
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}vendor/login`,
//         payload,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       startTimer(); // Start the timer when OTP is sent
//       setOtpSent(true);
//       setInputError(""); // Clear any previous input errors
//     } catch (error) {
//       setLoading(false);
//       // Ensure error response has message
//       const errorMessage =
//         error?.response?.data?.message ||
//         "An unexpected error occurred. Please try again.";
//       alert(errorMessage);
//       setOtpSent(false);
//     }
//   };

//   const handleSendOtp = async () => {
//     if (userInput) {
//       const isValidInput = isEmail(userInput) || userInput?.length === 10;
//       if (isValidInput) {
//         await fetchLogin(userInput);
//       } else {
//         setInputError("Please enter a valid email or 10-digit mobile number");
//       }
//     } else {
//       setInputError("Input cannot be empty");
//     }
//   };

//   const handleLogin = async () => {
//     if (!otpSent) {
//       alert("Please request an OTP first");
//       return;
//     }
//     setLoggingLoading(true);
//     if (otp) {
//       try {
//         const payload = isEmail(userInput)
//           ? { email: userInput, otp }
//           : { mobile_number: userInput, otp };

//         const response = await axios.post(
//           `${process.env.REACT_APP_BASE_URL}vendor/verifyOTP`,
//           payload
//         );
//         // alert("OTP Verified! Logging in...");
//         const token = response?.data?.token;
//         const vendorID = response?.data?.vendorId;
//         localStorage?.setItem("token", token);
//         localStorage?.setItem("vendorId", vendorID);
//         localStorage?.setItem("login", true);
//         navigate("/dashboard");
//       } catch (error) {
//         setLoggingLoading(false);
//         // Check if error response contains a message
//         const errorMessage =
//           error?.response?.data?.message || "Invalid OTP. Please try again.";
//         setOtpError(errorMessage); // Update the OTP error state to show the message
//       }
//     } else {
//       setOtpError("Please enter the OTP sent to your mobile or email");
//     }
//   };

//   const startTimer = () => {
//     let countdown = 30;
//     const timerInterval = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer <= 1) {
//           clearInterval(timerInterval);
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-50">
//       <div className="flex w-full max-w-4xl bg-white p-3 shadow-lg rounded-lg gap-5">
//         <div className="flex justify-center md:w-1/2">
//           <img
//             src={require("../images/SignUp.jpg")}
//             alt="Login Illustration"
//             className="w-[300px] h-[300px] object-cover"
//           />
//         </div>
//         <div className="w-full md:w-1/2">
//           <h2 className="text-2xl font-semibold text-center mb-4">
//             Seller Login
//           </h2>
//           <div className="mb-2">
//             <label
//               htmlFor="user_input"
//               style={{ marginBottom: 0 }}
//               className="block text-lg text-gray-600"
//             >
//               Email or Mobile Number
//             </label>
//             <input
//               type="text"
//               id="user_input"
//               value={userInput}
//               onChange={(e) => {
//                 setUserInput(e.target.value);
//                 setInputError(""); // Clear input error on change
//               }}
//               placeholder="Enter your email or mobile number"
//               className={`w-full p-2 border ${
//                 inputError ? "border-red-500" : "border-gray-300"
//               } rounded-lg`}
//               disabled={otpSent}
//             />
//             {inputError && (
//               <p className="text-red-500 text-sm mt-1">{inputError}</p>
//             )}
//           </div>
//           {!otpSent && (
//             <button
//               onClick={handleSendOtp}
//               className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition"
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//           )}
//           {otpSent && (
//             <>
//               <div className="mb-1">
//                 <label
//                   htmlFor="otp"
//                   style={{ marginBottom: 0 }}
//                   className="block text-lg text-gray-600"
//                 >
//                   Enter OTP
//                 </label>
//                 <input
//                   type="text"
//                   id="otp"
//                   value={otp}
//                   onChange={(e) => {
//                     setOtp(e.target.value);
//                     setOtpError(""); // Clear OTP error on change
//                   }}
//                   placeholder="Enter OTP"
//                   className={`w-full p-2 border ${
//                     otpError ? "border-red-500" : "border-gray-300"
//                   } rounded-lg`}
//                 />
//                 {otpError && (
//                   <p className="text-red-500 text-sm mt-1">{otpError}</p>
//                 )}
//               </div>
//               <div className="flex justify-between mb-4">
//                 <p className="text-sm text-gray-600">
//                   OTP sent to your email/phone.
//                   <span className="text-red-700 ml-2">{timer}s</span>
//                 </p>
//                 <div className="bg-gray-100 rounded-lg">
//                   <button
//                     onClick={handleResendOTP}
//                     disabled={isDisabled}
//                     className={`px-2 py-1 rounded-lg text-gray-700 text-sm transition ${
//                       isDisabled
//                         ? "text-gray-800 cursor-not-allowed"
//                         : "hover:text-blue-500 active:text-blue-700 bg-red-500 text-white"
//                     }`}
//                   >
//                     {isDisabled ? `Resend OTP` : "Resend OTP"}
//                   </button>
//                 </div>
//               </div>
//               <button
//                 onClick={handleLogin}
//                 className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-700 hover:bg-left-to-right-fill transition-all duration-300 animation-left-to-right"
//               >
//                 {loggingLoading ? "Logging..." : "Login"}
//               </button>
//             </>
//           )}
//           <div className="mt-4 text-center">
//             <p className="text-gray-600">
//               Don't have an account?
//               <Link to="/signup">
//                 <span className="text-purple-700 hover:underline">Sign Up</span>
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg gap-6">
        {/* Image Section */}
        <div className="flex justify-center md:w-1/2 mb-4 md:mb-0">
          <img
            src={require("../images/SignUp.jpg")}
            alt="Login Illustration"
            className="w-64 h-64 md:w-[300px] md:h-[300px] object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">
            Seller Login
          </h2>

          {/* Email or Phone Input */}
          <div className="mb-2">
            <label
              htmlFor="user_input"
              className="block text-base text-gray-600 mb-1"
            >
              Email or Mobile Number
            </label>
            <input
              type="text"
              id="user_input"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
                setInputError("");
              }}
              placeholder="Enter your email or mobile number"
              className={`w-full p-2 border ${
                inputError ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              disabled={otpSent}
            />
            {inputError && (
              <p className="text-red-500 text-sm mt-1">{inputError}</p>
            )}
          </div>

          {/* Send OTP Button */}
          {!otpSent && (
            <button
              onClick={handleSendOtp}
              className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition mt-2"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          )}

          {/* OTP Input Section */}
          {otpSent && (
            <>
              <div className="mt-4">
                <label
                  htmlFor="otp"
                  className="block text-base text-gray-600 mb-1"
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
                  placeholder="Enter OTP"
                  className={`w-full p-2 border ${
                    otpError ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {otpError && (
                  <p className="text-red-500 text-sm mt-1">{otpError}</p>
                )}
              </div>

              <div className="flex justify-between items-center mt-2 mb-4">
                <p className="text-sm text-gray-600">
                  OTP sent. <span className="text-red-700 ml-2">{timer}s</span>
                </p>
                <button
                  onClick={handleResendOTP}
                  disabled={isDisabled}
                  className={`text-sm px-3 py-1 rounded-lg transition ${
                    isDisabled
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  Resend OTP
                </button>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-all"
              >
                {loggingLoading ? "Logging..." : "Login"}
              </button>
            </>
          )}

          {/* Signup Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="text-purple-700 hover:underline">Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

