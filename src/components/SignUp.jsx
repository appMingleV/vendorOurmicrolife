// import {
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Step,
//   StepLabel,
//   Stepper,
//   TextField,
// } from "@mui/material";

// import CheckIcon from "@mui/icons-material/Check";
// import Alert from "@mui/material/Alert";
// import axios from "axios";
// import { format } from "date-fns";
// import React, { useEffect, useState } from "react";
// import { FaCircleCheck } from "react-icons/fa6";
// import { FiUpload } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const steps = ["Personal Details", "Store Details", "KYC"];

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [activeStep, setActiveStep] = useState(0);
//   const [isMobileOtpVerified, setMobileOtpVerified] = useState(false);
//   const [isEmailOtpVerified, setEmailOtpVerified] = useState(false);
//   const [category, setCategory] = useState([]);
//   const [isOtpVisible, setOtpVisible] = useState({
//     mobile: false,
//     email: false,
//   });
//   const [otpSent, setOtpSent] = useState({
//     mobile: false,
//     email: false,
//   });
//   const [formData, setFormData] = useState({
//     name: "",
//     gender: "Male",
//     dob: "",
//     pan: "",
//     mobileOtp: "",
//     emailOtp: "",
//     mobile: "",
//     email: "",
//     address: "",
//     storeName: "",
//     username: "",
//     storeCategory: "",
//     storeAddress: "",
//     businessContact: "",
//     aadharNumber: "",
//     aadharFront: null,
//     aadharBack: null,
//     panFile: null,
//     gstOrMsme: "",
//     certificate: null,
//   });

//   const form = {
//     ownerName: formData.name,
//     gender: formData.gender,
//     mobile: formData.mobile,
//     email: formData.email,
//     address: formData.address,
//     storeName: formData.storeName,
//     userName: formData.username,
//     storeCategory: formData.storeCategory,
//     storeAddress: formData.storeAddress,
//     BusinessContact: formData.businessContact,
//     aadharNumberFront: formData.aadharFront,
//     aadharNumberBack: formData.aadharBack,
//     aadharNumber: formData.aadharNumber,
//     PANDocument: formData.panFile,
//     DocumentProof: formData.certificate,
//     PAN: formData.pan,
//     documentType: formData.gstOrMsme,
//   };
 

//   const handleSubmit = async () => {
//     console.log("owner name is");
//     const emptyFields = [];

//     // Check each field and add the field name to the list if empty
//     if (form.ownerName === "") emptyFields.push("Owner Name");
//     if (form.gender === "") emptyFields.push("Gender");
//     if (form.mobile === "") emptyFields.push("Mobile");
//     if (form.email === "") emptyFields.push("Email");
//     if (form.address === "") emptyFields.push("Address");
//     if (form.storeName === "") emptyFields.push("Store Name");
//     if (form.userName === "") emptyFields.push("User Name");
//     if (form.storeCategory === "") emptyFields.push("Store Category");
//     if (form.storeAddress === "") emptyFields.push("Store Address");
//     if (form.aadharNumber === "") emptyFields.push("Aadhar Number");
//     if (form.PAN === "") emptyFields.push("PAN");
//     if (form.documentType === "") emptyFields.push("Select Certificate");
//     if (formData.dob === "") emptyFields.push("Date of Birth");

//     // Validate File Uploads
//     if (form.aadharNumberFront === null)
//       emptyFields.push("Aadhar Number Front");
//     if (form.aadharNumberBack === null) emptyFields.push("Aadhar Number Back");
//     if (form.PANDocument === null) emptyFields.push("PAN Document");
//     if (form.DocumentProof === null) emptyFields.push(" GST/M.S.M.E Document");

//     // If there are empty fields, alert the user
//     if (emptyFields.length > 0) {
//       alert(`Please fill in the following fields:\n${emptyFields.join(", ")}`);
//       return;
//     }

//     const formDataToSend = new FormData();

//     // Add all fields to the FormData object
//     formDataToSend.append("ownerName", form.ownerName);
//     formDataToSend.append("gender", form.gender);
//     formDataToSend.append("dob", format(new Date(formData.dob), "yyyy-MM-dd"));
//     formDataToSend.append("mobile", form.mobile);
//     formDataToSend.append("email", form.email);
//     formDataToSend.append("address", form.address);
//     formDataToSend.append("storeName", form.storeName);
//     formDataToSend.append("userName", form.userName);
//     formDataToSend.append("storeCategory", form.storeCategory);
//     formDataToSend.append("storeAddress", form.storeAddress);
//     formDataToSend.append("BusinessContact", form.BusinessContact);
//     formDataToSend.append("aadharNumber", form.aadharNumber);
//     formDataToSend.append("PAN", form.PAN);
//     formDataToSend.append("documentType", form.documentType);

//     // Add files if they exist
//     if (form.aadharNumberFront) {
//       formDataToSend.append("aadharNumberFront", form.aadharNumberFront);
//     }
//     if (form.aadharNumberBack) {
//       formDataToSend.append("aadharNumberBack", form.aadharNumberBack);
//     }
//     if (form.PANDocument) {
//       formDataToSend.append("PANDocument", form.PANDocument);
//     }
//     if (form.DocumentProof) {
//       formDataToSend.append("DocumentProof", form.DocumentProof);
//     }

//     // Overwrite with formatted value
//     try {
//       console.log("signup data", formDataToSend);
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}vendor/signup`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       if (response.data.status === 200 || "success") {
//         // Show success popup and navigate
//         <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
//           Sucessfully signed Up.
//         </Alert>;
//         alert(" Sucessfully signed Up.");
//         navigate("/"); // Redirect to the login
//       }
//       console.log("response form", response.data);
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.error) {
//         alert(error.response.data.error); // Display the server error in an alert
//       } else if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         alert(error.response.data.message); // Display a fallback message if "error" key is not found
//       } else {
//         alert("An unexpected error occurred. Please try again.");
//       }
//       console.error("error in submit form", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//   };

//   const handleNext = () => {
//     if (activeStep < steps.length - 1) {
//       setActiveStep((prev) => prev + 1);
//     }
//   };

//   const handleBack = () => {
//     if (activeStep > 0) {
//       setActiveStep((prev) => prev - 1);
//     }
//   };

//   // Mobile otp send
//   const handleMobileSendOtp = async (field) => {
//     // Regular expression for validating a 10-digit mobile number
//     const mobileRegex = /^[0-9]{10}$/;

//     if (!formData[field] || !mobileRegex.test(formData[field])) {
//       alert("Please enter a valid 10-digit mobile number.");
//       return; // Exit if the mobile number is invalid
//     }

//     console.log(`Sending OTP to ${field}: ${formData[field]}`);

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}vendor/otp/vendor/number`,
//         { mobile_number: formData[field] },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Response for mobile OTP:", response.data);

//       // Show OTP field only after successful response
//       setOtpVisible((prev) => ({ ...prev, [field]: true }));
//       setOtpSent((prev) => ({ ...prev, [field]: true }));
//     } catch (error) {
//       console.error("Error in sending OTP to mobile:", error);
//       alert("Failed to send OTP. Please try again later.");
//     }
//   };

//   //Mobile Otp Verification
//   const handleMobileVerifyOtp = async () => {
//     console.log("verifyotp data", {
//       mobile_number: formData.mobile,
//       otp: formData.mobileOtp,
//     });
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}vendor/signup/verifyOTP`,
//         {
//           mobile_number: formData.mobile,
//           otp: formData.mobileOtp,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (response.status === 200) {
//         console.log("mobile otp verification successful", response.data);
//         setMobileOtpVerified(true); // Mark OTP as verified
//       }
//       console.log("mobile otp verification", response.data);
//     } catch (error) {
//       console.error("error in mobile otp verification", error);
//     }
//   };

//   const handleEmailSendOtp = async (field) => {
//     // Regular Expression for email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!formData[field] || !emailRegex.test(formData[field])) {
//       alert("Please enter a valid email address.");
//       return; // Exit if email is not valid
//     }

//     console.log(`Sending OTP to ${field}: ${formData[field]}`);

//     // Show OTP field only after success response
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}vendor/otp/vendor/email`,
//         { email: formData[field] },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Response for email OTP:", response.data);

//       // If successful, make OTP field visible
//       setOtpVisible((prev) => ({ ...prev, [field]: true }));
//       setOtpSent((prev) => ({ ...prev, [field]: true }));
//     } catch (error) {
//       console.error("Error in sending OTP to email:", error);
//       alert("Failed to send OTP. Please try again later.");
//     }
//   };

//   const handleEmailVerifyOtp = async () => {
//     console.log("verifyotp data", {
//       email: formData.email,
//       otp: formData.emailOtp,
//     });
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}vendor/signup/verifyOTP`,
//         {
//           email: formData.email,
//           otp: formData.emailOtp,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (response.status === 200) {
//         console.log("mobile otp verification successful", response.data);
//         setEmailOtpVerified(true); // Mark OTP as verified
//       }
//       console.log("mobile otp verification", response.data);
//     } catch (error) {
//       console.error("error in mobile otp verification", error);
//     }
//   };
//   const fetchCategory = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}admin/category`
//       );
//       console.log("response category", response.data.data);
//       setCategory(response.data.data);
//     } catch (error) {
//       console.log("error in fetching category", error);
//       if (error.response && error.response.data) {
//         alert(error.response.data.message); // Print the error message in an alert
//       } else {
//         alert("Duplicate Entry Of mobile number and email Please try again.");
//       }
//     }
//   };
//   useEffect(() => {
//     fetchCategory();
//   }, []);

//   const getDocumentLabel = () => {
//     if (formData.gstOrMsme === "gstnumber") return "GST Document";
//     if (formData.gstOrMsme === "msme") return "M.S.M.E Document";
//     if (formData.gstOrMsme === "other") return "Other Certificate";
//     return "GST/M.S.M.E Document";
//   };
//   return (
//     <>
//       <div
//         className="flex justify-center shadow-lg max-w-[1050px] rounded-2xl min-h-[512px]"
//         style={{ margin: "52px auto" }}
//       >
//         {/* child img-section */}
//         <div className="w-1/2  flex justify-center items-center">
//           <img
//             src={require("../images/SignUp.jpg")}
//             alt="Login_Image"
//             className="max-w-[480px]"
//           />
//         </div>

//         {/* progress-bar main */}
//         <div className="w-1/2 max-w-[520px] my-6 mr-2">
//           {/* <h1 className="text-2xl font-bold text-center">SignUp</h1> */}

//           <div className="flex flex-col items-center px-10 py-6">
//             <Stepper
//               activeStep={activeStep}
//               alternativeLabel
//               className="w-full max-w-2xl"
//             >
//               {steps.map((label, index) => (
//                 <Step key={index}>
//                   <StepLabel>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>

//             <div className="w-full max-w-2xl mt-6">
//               {activeStep === 0 && (
//                 <div>
//                   <h3 className="text-xl font-semibold mb-4">
//                     Personal Details
//                   </h3>
//                   <TextField
//                     fullWidth
//                     label="Owner Name (Same as PAN)"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="mb-2"
//                     sx={{
//                       "& .MuiInputBase-input": {
//                         paddingY: "7px",
//                         paddingX: "14px",
//                       },
//                       py: ["7px"],
//                     }}
//                   />

//                   <div className="flex items-center gap-4 mb-2">
//                     <Select
//                       fullWidth
//                       displayEmpty
//                       name="gender"
//                       required
//                       value={formData.gender}
//                       sx={{
//                         "& .MuiInputBase-input": {
//                           paddingY: "7px",
//                           paddingX: "14px",
//                         },
//                       }}
//                       onChange={(e) =>
//                         setFormData({ ...formData, gender: e.target.value })
//                       }
//                     >
//                       <MenuItem value="">Select Gender *</MenuItem>
//                       <MenuItem value="Male">Male</MenuItem>
//                       <MenuItem value="Female">Female</MenuItem>
//                     </Select>
//                     <TextField
//                       fullWidth
//                       label="Date of Birth (Same as PAN)"
//                       type="date"
//                       name="dob"
//                       required
//                       value={formData.dob}
//                       sx={{
//                         "& .MuiInputBase-input": {
//                           paddingY: "7px",
//                           paddingX: "14px",
//                         },
//                       }}
//                       onChange={handleInputChange}
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </div>

//                   <div className="flex mt-3 gap-4">
//                     <TextField
//                       fullWidth
//                       label="Mobile"
//                       name="mobile"
//                       type=""
//                       required
//                       value={formData.mobile}
//                       onChange={handleInputChange}
//                       disabled={otpSent.mobile}
//                       inputMode="numeric"
//                       pattern="\d{10}"
//                       maxLength={10}
//                       sx={{
//                         "& .MuiInputBase-input": {
//                           paddingY: "7px",
//                           paddingX: "14px",
//                         },
//                         py: ["7px"],
//                       }}
//                       onInput={(e) => {
//                         e.target.value = e.target.value
//                           .replace(/\D/g, "")
//                           .slice(0, 10);
//                       }}
//                     />
//                     <button
//                       className="text-sm w-24 py-0 px-2 h-8 rounded-md bg-green-600 hover:bg-green-700 text-white"
//                       style={{ marginTop: "9px", fontWeight: "500" }}
//                       onClick={() => handleMobileSendOtp("mobile")}
//                     >
//                       {otpSent.mobile ? "Resend" : "Send OTP"}
//                     </button>
//                   </div>

//                   {isOtpVisible.mobile && (
//                     <div className="flex items-center gap-2 mt-2">
//                       <TextField
//                         fullWidth
//                         label="Enter OTP"
//                         name="mobileOtp"
//                         type="text"
//                         required
//                         value={formData.mobileOtp}
//                         onChange={handleInputChange}
//                         disabled={isMobileOtpVerified}
//                         inputProps={{
//                           maxLength: 4,

//                           // Limit input to 10 characters
//                           // Automatically display input as uppercase
//                         }}
//                         onInput={(e) => {
//                           e.target.value = e.target.value.replace(
//                             /[^0-9]/g,
//                             ""
//                           ); // Allow only numeric values
//                         }}
//                         className="tracking-widest mt-0"
//                         sx={{
//                           "& .MuiInputBase-input": {
//                             paddingY: "7px",
//                             paddingX: "14px",
//                           },
//                           py: ["7px"],
//                         }}
//                       />
//                       {!isMobileOtpVerified ? (
//                         <button
//                           onClick={handleMobileVerifyOtp}
//                           className="text-sm w-24 py-0 px-2 h-8 rounded-md bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
//                           style={{ marginTop: "9px", fontWeight: "500" }}
//                         >
//                           Verify
//                         </button>
//                       ) : (
//                         <FaCircleCheck className="text-green-600 text-2xl mt-1" />
//                       )}
//                     </div>
//                   )}

//                   <div className="flex gap-4 mt-2">
//                     <TextField
//                       fullWidth
//                       label="Email"
//                       name="email"
//                       type="email"
//                       required
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       disabled={otpSent.email}
//                       sx={{
//                         "& .MuiInputBase-input": {
//                           paddingY: "7px",
//                           paddingX: "14px",
//                         },
//                         py: ["7px"],
//                       }}
//                     />
//                     <button
//                       className="text-sm w-24 py-0 px-2 h-8 rounded-md bg-green-600 hover:bg-green-700 text-white"
//                       style={{ marginTop: "9px", fontWeight: "500" }}
//                       onClick={() => handleEmailSendOtp("email")}
//                     >
//                       {otpSent.email ? "Resend " : "Send OTP"}
//                     </button>
//                   </div>

//                   {isOtpVisible.email && (
//                     <div className="flex items-center gap-2 mt-2">
//                       <TextField
//                         fullWidth
//                         label="Enter OTP"
//                         name="emailOtp"
//                         type="text"
//                         value={formData.emailOtp}
//                         onChange={handleInputChange}
//                         disabled={isEmailOtpVerified}
//                         className="tracking-widest mt-0"
//                         inputProps={{
//                           maxLength: 4,

//                           // Limit input to 10 characters
//                           // Automatically display input as uppercase
//                         }}
//                         onInput={(e) => {
//                           e.target.value = e.target.value.replace(
//                             /[^0-9]/g,
//                             ""
//                           ); // Allow only numeric values
//                         }}
//                         sx={{
//                           "& .MuiInputBase-input": {
//                             paddingY: "7px",
//                             paddingX: "14px",
//                           },
//                           py: ["7px"],
//                         }}
//                         required
//                       />
//                       {!isEmailOtpVerified ? (
//                         <button
//                           onClick={handleEmailVerifyOtp}
//                           className="text-sm w-24 py-0 px-2 h-8 rounded-md bg-green-600 hover:bg-green-700 text-white"
//                           style={{ marginTop: "1px", fontWeight: "500" }}
//                         >
//                           Verify
//                         </button>
//                       ) : (
//                         <FaCircleCheck className="text-green-600 text-2xl mt-1" />
//                       )}
//                     </div>
//                   )}
//                   {/*Email OTP End  */}

//                   <TextField
//                     fullWidth
//                     label="Address (Same as Aadhar Card)"
//                     name="address"
//                     value={formData.address}
//                     sx={{
//                       "& .MuiInputBase-input": {
//                         paddingY: "7px",
//                         paddingX: "14px",
//                       },
//                       py: ["7px"],
//                     }}
//                     onChange={handleInputChange}
//                     className="mb-2 mt-2"
//                     required
//                   />
//                   <div className="flex justify-end">
//                     <Button
//                       variant="contained"
//                       sx={{
//                         backgroundColor: "#a955f5",
//                         "&:hover": {
//                           backgroundColor: "#c494fe",
//                         },
//                       }}
//                       onClick={handleNext}
//                     >
//                       Next
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               {activeStep === 1 && (
//                 <div className="progress-bar-step-2 px-4">
//                   <h3 className="text-xl font-semibold mb-2">Store Details</h3>
//                   <form>
//                     <div>
//                       <div className="mt-4">
//                         <TextField
//                           label="Store Name"
//                           name="storeName"
//                           variant="outlined"
//                           sx={{
//                             "& .MuiInputBase-input": {
//                               paddingY: "7px",
//                               paddingX: "14px",
//                             },
//                             py: ["7px"],
//                           }}
//                           fullWidth
//                           onChange={handleInputChange}
//                           value={formData.storeName}
//                           required
//                         />
//                       </div>

//                       <div className="mt-2">
//                         <TextField
//                           label="Username"
//                           variant="outlined"
//                           name="username"
//                           sx={{
//                             "& .MuiInputBase-input": {
//                               paddingY: "7px",
//                               paddingX: "14px",
//                             },
//                             py: ["7px"],
//                           }}
//                           fullWidth
//                           onChange={handleInputChange}
//                           value={formData.username}
//                           required
//                         />
//                       </div>

//                       <div className="mt-3">
//                         <FormControl fullWidth>
//                           <InputLabel>Store Category</InputLabel>
//                           <Select
//                             defaultValue="gstnumber"
//                             required
//                             name="storeCategory"
//                             value={formData.storeCategory}
//                             onChange={(e) =>
//                               setFormData({
//                                 ...formData,
//                                 storeCategory: e.target.value,
//                               })
//                             }
//                             sx={{
//                               "& .MuiInputBase-input": {
//                                 paddingY: "2px",
//                                 paddingX: "14px",
//                               },
//                               py: ["9px"],
//                             }}
//                           >
//                             {category.map((category) => (
//                               <MenuItem key={category.id} value={category.id}>
//                                 {category.categorie_name}
//                               </MenuItem>
//                             ))}
//                           </Select>
//                         </FormControl>
//                       </div>
//                       <div className="mt-3">
//                         <TextField
//                           label="Store Address"
//                           variant="outlined"
//                           name="storeAddress"
//                           onChange={handleInputChange}
//                           value={formData.storeAddress}
//                           sx={{
//                             "& .MuiInputBase-input": {
//                               paddingY: "7px",
//                               paddingX: "14px",
//                             },
//                             py: ["7px"],
//                           }}
//                           fullWidth
//                           required
//                         />
//                       </div>
//                       <div className="mt-2">
//                         <TextField
//                           label="Business Contact No (Optional)"
//                           variant="outlined"
//                           name="businessContact"
//                           onChange={handleInputChange}
//                           value={formData.businessContact}
//                           sx={{
//                             "& .MuiInputBase-input": {
//                               paddingY: "7px",
//                               paddingX: "14px",
//                             },
//                             py: ["7px"],
//                           }}
//                           fullWidth
//                         />
//                       </div>
//                     </div>
//                   </form>
//                   <div className="flex justify-between mt-4">
//                     <Button
//                       variant="outlined"
//                       color="secondary"
//                       onClick={handleBack}
//                     >
//                       Back
//                     </Button>
//                     <Button
//                       variant="contained"
//                       sx={{
//                         backgroundColor: "#a955f5",
//                         "&:hover": {
//                           backgroundColor: "#c494fe",
//                         },
//                       }}
//                       className="ml-4"
//                       onClick={handleNext}
//                     >
//                       Next
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               {activeStep === 2 && (
//                 <div className="progress-bar-step-3 px-4">
//                   <h3 className="text-xl font-semibold mb-4">KYC</h3>
//                   <form>
//                     <div className="w-full mt-4">
//                       <TextField
//                         label="Aadhar Number"
//                         variant="outlined"
//                         name="aadharNumber"
//                         onChange={handleInputChange}
//                         value={formData.aadharNumber}
//                         inputProps={{
//                           maxLength: 12,

//                           // Limit input to 10 characters
//                           // Automatically display input as uppercase
//                         }}
//                         onInput={(e) => {
//                           e.target.value = e.target.value.replace(
//                             /[^0-9]/g,
//                             ""
//                           ); // Allow only numeric values
//                         }}
//                         sx={{
//                           "& .MuiInputBase-input": {
//                             paddingY: "7px",
//                             paddingX: "14px",
//                           },
//                           py: ["7px"],
//                         }}
//                         fullWidth
//                         required
//                       />
//                     </div>
//                     <div className="front-back mt-3">
//                       <div className="flex w-full gap-2 mb-2">
//                         <div className="px-2 pb-2 border rounded-md">
//                           <label className="text-xs font-semibold">
//                             Front Image
//                           </label>
//                           <div className="flex items-center">
//                             <input
//                               type="file"
//                               name="aadharFront"
//                               className="w-3/4 text-sm"
//                               onChange={handleFileChange}
//                               required
//                             />
//                             <FiUpload className="z-10 w-1/4" />
//                           </div>
//                         </div>
//                         <div className="px-2 pb-2 border rounded-md">
//                           <label className="text-xs font-semibold">
//                             Back Image
//                           </label>
//                           <div className="flex items-center">
//                             <input
//                               type="file"
//                               className="w-3/4 text-sm"
//                               name="aadharBack"
//                               onChange={handleFileChange}
//                               required
//                             />
//                             <FiUpload className="z-10 w-1/4" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="w-full mb-2 mt-3">
//                       <TextField
//                         label="PAN Number"
//                         variant="outlined"
//                         name="pan"
//                         onChange={handleInputChange}
//                         value={formData.pan}
//                         inputProps={{
//                           maxLength: 10, // Limit input to 10 characters
//                           style: { textTransform: "uppercase" }, // Automatically display input as uppercase
//                         }}
//                         onInput={(e) => {
//                           // Allow only uppercase letters (A-Z) and numbers (0-9)
//                           e.target.value = e.target.value.slice(0, 10);
//                         }}
//                         sx={{
//                           "& .MuiInputBase-input": {
//                             paddingY: "7px",
//                             paddingX: "14px",
//                           },
//                           py: ["7px"],
//                         }}
//                         fullWidth
//                         required
//                       />
//                       <div className="">
//                         <label className="text-xs font-semibold">
//                           PAN Image
//                         </label>
//                         <div className="flex flex-row mb-2 w-full relative border p-2 rounded-md">
//                           <input
//                             type="file"
//                             name="panFile"
//                             className="w-3/4 text-sm"
//                             onChange={handleFileChange}
//                             required
//                           />
//                           <FiUpload className="z-10 w-1/4 absolute -right-6" />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="w-full mb-2 mt-4">
//                       <FormControl fullWidth>
//                         <InputLabel
//                           sx={{
//                             "& .MuiInputBase-input": {
//                               paddingY: "7px",
//                               paddingX: "14px",
//                             },
//                             py: ["7px"],
//                           }}
//                         >
//                           Select the certificate
//                         </InputLabel>
//                         <Select
//                           defaultValue=""
//                           sx={{
//                             "& .MuiInputBase-input": {
//                               paddingY: "7px",
//                               paddingX: "14px",
//                             },
//                             py: ["5px"],
//                           }}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               gstOrMsme: e.target.value,
//                             })
//                           }
//                         >
//                           <MenuItem value="" defaultChecked></MenuItem>

//                           <MenuItem value="gstnumber">GST Number</MenuItem>
//                           <MenuItem value="msme">M.S.M.E</MenuItem>
//                           {/* <MenuItem value="other">Other</MenuItem> */}
//                         </Select>
//                       </FormControl>
//                     </div>
//                     <div className="w-full px-1">
//                       <label className="text-sm font-semibold">
//                         {getDocumentLabel()}
//                       </label>
//                       <div className="flex items-center w-full relative border p-2 rounded-md">
//                         <input
//                           type="file"
//                           name="certificate"
//                           className="w-3/4 text-sm"
//                           onChange={handleFileChange}
//                         />
//                         <FiUpload className="z-10 w-1/4 absolute -right-8" />
//                       </div>
//                     </div>
                    
//                   </form>
//                   <div className="flex justify-between my-4">
//                     <Button
//                       variant="outlined"
//                       color="secondary"
//                       onClick={handleBack}
//                     >
//                       Back
//                     </Button>
//                     <Button
//                       variant="contained"
//                       sx={{
//                         backgroundColor: "#a955f5",
//                         "&:hover": {
//                           backgroundColor: "#c494fe",
//                         },
//                       }}
//                       className="ml-4"
//                       onClick={handleSubmit}
//                     >
//                       Submit
//                     </Button>
//                   </div>
//                 </div>
//               )}
//               <div className="mt-4 text-center">
//                 <p className="text-gray-600">
//                   Don't have an account?{" "}
//                   <span
//                     className="text-purple-700 cursor-pointer hover:text-purple-900"
//                     onClick={() => navigate("/")}
//                   >
//                     Login
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Paper,
  Divider
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaCircleCheck, FaStore, FaUserTie, FaIdCard } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { purple } from "@mui/material/colors";

const steps = ["Personal Details", "Store Details", "KYC Verification"];

const SignUp = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isMobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [isEmailOtpVerified, setEmailOtpVerified] = useState(false);
  const [category, setCategory] = useState([]);
  const [isOtpVisible, setOtpVisible] = useState({
    mobile: false,
    email: false,
  });
  const [otpSent, setOtpSent] = useState({
    mobile: false,
    email: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    gender: "Male",
    dob: "",
    pan: "",
    mobileOtp: "",
    emailOtp: "",
    mobile: "",
    email: "",
    address: "",
    storeName: "",
    username: "",
    storeCategory: "",
    storeAddress: "",
    businessContact: "",
    aadharNumber: "",
    aadharFront: null,
    aadharBack: null,
    panFile: null,
    gstOrMsme: "",
    certificate: null,
  });
    const form = {
    ownerName: formData.name,
    gender: formData.gender,
    mobile: formData.mobile,
    email: formData.email,
    address: formData.address,
    storeName: formData.storeName,
    userName: formData.username,
    storeCategory: formData.storeCategory,
    storeAddress: formData.storeAddress,
    BusinessContact: formData.businessContact,
    aadharNumberFront: formData.aadharFront,
    aadharNumberBack: formData.aadharBack,
    aadharNumber: formData.aadharNumber,
    PANDocument: formData.panFile,
    DocumentProof: formData.certificate,
    PAN: formData.pan,
    documentType: formData.gstOrMsme,
  };
 

  const handleSubmit = async () => {
    console.log("owner name is");
    const emptyFields = [];

    // Check each field and add the field name to the list if empty
    if (form.ownerName === "") emptyFields.push("Owner Name");
    if (form.gender === "") emptyFields.push("Gender");
    if (form.mobile === "") emptyFields.push("Mobile");
    if (form.email === "") emptyFields.push("Email");
    if (form.address === "") emptyFields.push("Address");
    if (form.storeName === "") emptyFields.push("Store Name");
    if (form.userName === "") emptyFields.push("User Name");
    if (form.storeCategory === "") emptyFields.push("Store Category");
    if (form.storeAddress === "") emptyFields.push("Store Address");
    if (form.aadharNumber === "") emptyFields.push("Aadhar Number");
    if (form.PAN === "") emptyFields.push("PAN");
    if (form.documentType === "") emptyFields.push("Select Certificate");
    if (formData.dob === "") emptyFields.push("Date of Birth");

    // Validate File Uploads
    if (form.aadharNumberFront === null)
      emptyFields.push("Aadhar Number Front");
    if (form.aadharNumberBack === null) emptyFields.push("Aadhar Number Back");
    if (form.PANDocument === null) emptyFields.push("PAN Document");
    if (form.DocumentProof === null) emptyFields.push(" GST/M.S.M.E Document");

    // If there are empty fields, alert the user
    if (emptyFields.length > 0) {
      alert(`Please fill in the following fields:\n${emptyFields.join(", ")}`);
      return;
    }

    const formDataToSend = new FormData();

    // Add all fields to the FormData object
    formDataToSend.append("ownerName", form.ownerName);
    formDataToSend.append("gender", form.gender);
    formDataToSend.append("dob", format(new Date(formData.dob), "yyyy-MM-dd"));
    formDataToSend.append("mobile", form.mobile);
    formDataToSend.append("email", form.email);
    formDataToSend.append("address", form.address);
    formDataToSend.append("storeName", form.storeName);
    formDataToSend.append("userName", form.userName);
    formDataToSend.append("storeCategory", form.storeCategory);
    formDataToSend.append("storeAddress", form.storeAddress);
    formDataToSend.append("BusinessContact", form.BusinessContact);
    formDataToSend.append("aadharNumber", form.aadharNumber);
    formDataToSend.append("PAN", form.PAN);
    formDataToSend.append("documentType", form.documentType);

    // Add files if they exist
    if (form.aadharNumberFront) {
      formDataToSend.append("aadharNumberFront", form.aadharNumberFront);
    }
    if (form.aadharNumberBack) {
      formDataToSend.append("aadharNumberBack", form.aadharNumberBack);
    }
    if (form.PANDocument) {
      formDataToSend.append("PANDocument", form.PANDocument);
    }
    if (form.DocumentProof) {
      formDataToSend.append("DocumentProof", form.DocumentProof);
    }

    // Overwrite with formatted value
    try {
      console.log("signup data", formDataToSend);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}vendor/signup`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status === 200 || "success") {
        // Show success popup and navigate
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Sucessfully signed Up.
        </Alert>;
        alert(" Sucessfully signed Up.");
        navigate("/"); // Redirect to the login
      }
      console.log("response form", response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // Display the server error in an alert
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message); // Display a fallback message if "error" key is not found
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
      console.error("error in submit form", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  // Mobile otp send
  const handleMobileSendOtp = async (field) => {
    // Regular expression for validating a 10-digit mobile number
    const mobileRegex = /^[0-9]{10}$/;

    if (!formData[field] || !mobileRegex.test(formData[field])) {
      alert("Please enter a valid 10-digit mobile number.");
      return; // Exit if the mobile number is invalid
    }

    console.log(`Sending OTP to ${field}: ${formData[field]}`);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}vendor/otp/vendor/number`,
        { mobile_number: formData[field] },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response for mobile OTP:", response.data);

      // Show OTP field only after successful response
      setOtpVisible((prev) => ({ ...prev, [field]: true }));
      setOtpSent((prev) => ({ ...prev, [field]: true }));
    } catch (error) {
      console.error("Error in sending OTP to mobile:", error);
      alert("Failed to send OTP. Please try again later.");
    }
  };

  //Mobile Otp Verification
  const handleMobileVerifyOtp = async () => {
    console.log("verifyotp data", {
      mobile_number: formData.mobile,
      otp: formData.mobileOtp,
    });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}vendor/signup/verifyOTP`,
        {
          mobile_number: formData.mobile,
          otp: formData.mobileOtp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("mobile otp verification successful", response.data);
        setMobileOtpVerified(true); // Mark OTP as verified
      }
      console.log("mobile otp verification", response.data);
    } catch (error) {
      console.error("error in mobile otp verification", error);
    }
  };

  const handleEmailSendOtp = async (field) => {
    // Regular Expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData[field] || !emailRegex.test(formData[field])) {
      alert("Please enter a valid email address.");
      return; // Exit if email is not valid
    }

    console.log(`Sending OTP to ${field}: ${formData[field]}`);

    // Show OTP field only after success response
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}vendor/otp/vendor/email`,
        { email: formData[field] },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response for email OTP:", response.data);

      // If successful, make OTP field visible
      setOtpVisible((prev) => ({ ...prev, [field]: true }));
      setOtpSent((prev) => ({ ...prev, [field]: true }));
    } catch (error) {
      console.error("Error in sending OTP to email:", error);
      alert("Failed to send OTP. Please try again later.");
    }
  };

  const handleEmailVerifyOtp = async () => {
    console.log("verifyotp data", {
      email: formData.email,
      otp: formData.emailOtp,
    });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}vendor/signup/verifyOTP`,
        {
          email: formData.email,
          otp: formData.emailOtp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("mobile otp verification successful", response.data);
        setEmailOtpVerified(true); // Mark OTP as verified
      }
      console.log("mobile otp verification", response.data);
    } catch (error) {
      console.error("error in mobile otp verification", error);
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}admin/category`
      );
      console.log("response category", response.data.data);
      setCategory(response.data.data);
    } catch (error) {
      console.log("error in fetching category", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message); // Print the error message in an alert
      } else {
        alert("Duplicate Entry Of mobile number and email Please try again.");
      }
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const getDocumentLabel = () => {
    if (formData.gstOrMsme === "gstnumber") return "GST Document";
    if (formData.gstOrMsme === "msme") return "M.S.M.E Document";
    if (formData.gstOrMsme === "other") return "Other Certificate";
    return "GST/M.S.M.E Document";
  };

  const StepIcon = ({ active, completed, icon }) => {
    const colors = {
      active: purple[500],
      completed: purple[500],
      default: "#e0e0e0",
    };

    return (
      <Avatar
        sx={{
          bgcolor: completed ? colors.completed : active ? colors.active : colors.default,
          color: active || completed ? "#fff" : "#9e9e9e",
          width: 32,
          height: 32,
          fontSize: "1rem",
        }}
      >
        {completed ? <CheckIcon fontSize="small" /> : icon}
      </Avatar>
    );
  };

  const getStepIcon = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <FaUserTie />;
      case 1:
        return <FaStore />;
      case 2:
        return <FaIdCard />;
      default:
        return stepIndex + 1;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 1200,
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ display: "flex", height: "100%" }}>
          {/* Left Side - Image */}
          <Box
            sx={{
              width: "50%",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              bgcolor: purple[50],
              p: 4,
            }}
          >
            <img
              src={require("../images/SignUp.jpg")}
              alt="Sign Up"
              style={{
                maxWidth: "100%",
                maxHeight: "500px",
                borderRadius: 12,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Box>

          {/* Right Side - Form */}
          <Box sx={{ width: { xs: "100%", md: "50%" }, p: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: purple[700],
                textAlign: "center",
                mb: 4,
              }}
            >
              Seller Registration
            </Typography>

            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{ mb: 4 }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={(props) => (
                      <StepIcon {...props} icon={getStepIcon(index)} />
                    )}
                    sx={{
                      "& .MuiStepLabel-label": {
                        fontWeight: 600,
                        color: activeStep >= index ? purple[700] : "#9e9e9e",
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "background.paper",
                border: "1px solid #e0e0e0",
              }}
            >
              {activeStep === 0 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Personal Information
                  </Typography>
                  
                  <TextField
                    fullWidth
                    label="Owner Name (Same as PAN)"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    size="small"
                  />

                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Gender *</InputLabel>
                      <Select
                        name="gender"
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                        label="Gender *"
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      type="date"
                      name="dob"
                      required
                      value={formData.dob}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                    />
                  </Box>

                  {/* Mobile OTP Section */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <TextField
                        fullWidth
                        label="Mobile Number"
                        name="mobile"
                        required
                        value={formData.mobile}
                        onChange={handleInputChange}
                        disabled={otpSent.mobile}
                        inputMode="numeric"
                        size="small"
                        onInput={(e) => {
                          e.target.value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10);
                        }}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleMobileSendOtp("mobile")}
                        sx={{
                          bgcolor: otpSent.mobile ? purple[300] : purple[500],
                          "&:hover": {
                            bgcolor: otpSent.mobile ? purple[400] : purple[600],
                          },
                          minWidth: 100,
                        }}
                      >
                        {otpSent.mobile ? "Resend" : "Send OTP"}
                      </Button>
                    </Box>

                    {isOtpVisible.mobile && (
                      <Box sx={{ display: "flex", gap: 2, mt: 1, alignItems: "center" }}>
                        <TextField
                          fullWidth
                          label="Enter OTP"
                          name="mobileOtp"
                          required
                          value={formData.mobileOtp}
                          onChange={handleInputChange}
                          disabled={isMobileOtpVerified}
                          size="small"
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                          }}
                        />
                        {!isMobileOtpVerified ? (
                          <Button
                            variant="contained"
                            size="small"
                            onClick={handleMobileVerifyOtp}
                            sx={{
                              bgcolor: purple[500],
                              "&:hover": { bgcolor: purple[600] },
                              minWidth: 100,
                            }}
                          >
                            Verify
                          </Button>
                        ) : (
                          <FaCircleCheck style={{ color: "#4caf50", fontSize: 24 }} />
                        )}
                      </Box>
                    )}
                  </Box>

                  {/* Email OTP Section */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={otpSent.email}
                        size="small"
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleEmailSendOtp("email")}
                        sx={{
                          bgcolor: otpSent.email ? purple[300] : purple[500],
                          "&:hover": {
                            bgcolor: otpSent.email ? purple[400] : purple[600],
                          },
                          minWidth: 100,
                        }}
                      >
                        {otpSent.email ? "Resend" : "Send OTP"}
                      </Button>
                    </Box>

                    {isOtpVisible.email && (
                      <Box sx={{ display: "flex", gap: 2, mt: 1, alignItems: "center" }}>
                        <TextField
                          fullWidth
                          label="Enter OTP"
                          name="emailOtp"
                          required
                          value={formData.emailOtp}
                          onChange={handleInputChange}
                          disabled={isEmailOtpVerified}
                          size="small"
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                          }}
                        />
                        {!isEmailOtpVerified ? (
                          <Button
                            variant="contained"
                            size="small"
                            onClick={handleEmailVerifyOtp}
                            sx={{
                              bgcolor: purple[500],
                              "&:hover": { bgcolor: purple[600] },
                              minWidth: 100,
                            }}
                          >
                            Verify
                          </Button>
                        ) : (
                          <FaCircleCheck style={{ color: "#4caf50", fontSize: 24 }} />
                        )}
                      </Box>
                    )}
                  </Box>

                  <TextField
                    fullWidth
                    label="Address (Same as Aadhar Card)"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    size="small"
                    sx={{ mb: 2 }}
                    multiline
                    rows={2}
                  />

                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        bgcolor: purple[500],
                        "&:hover": { bgcolor: purple[600] },
                        px: 4,
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              )}

              {activeStep === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Store Information
                  </Typography>

                  <TextField
                    label="Store Name"
                    name="storeName"
                    fullWidth
                    onChange={handleInputChange}
                    value={formData.storeName}
                    required
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    label="Username"
                    name="username"
                    fullWidth
                    onChange={handleInputChange}
                    value={formData.username}
                    required
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Store Category</InputLabel>
                    <Select
                      name="storeCategory"
                      value={formData.storeCategory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          storeCategory: e.target.value,
                        })
                      }
                      label="Store Category"
                      required
                    >
                      {category.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.categorie_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Store Address"
                    name="storeAddress"
                    fullWidth
                    onChange={handleInputChange}
                    value={formData.storeAddress}
                    required
                    size="small"
                    sx={{ mb: 2 }}
                    multiline
                    rows={2}
                  />

                  <TextField
                    label="Business Contact No (Optional)"
                    name="businessContact"
                    fullWidth
                    onChange={handleInputChange}
                    value={formData.businessContact}
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                      sx={{ color: purple[500], borderColor: purple[500] }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        bgcolor: purple[500],
                        "&:hover": { bgcolor: purple[600] },
                        px: 4,
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              )}

              {activeStep === 2 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    KYC Verification
                  </Typography>

                  <TextField
                    label="Aadhar Number"
                    name="aadharNumber"
                    fullWidth
                    onChange={handleInputChange}
                    value={formData.aadharNumber}
                    required
                    size="small"
                    sx={{ mb: 2 }}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                  />

                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Aadhar Card Images
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <Box sx={{ flex: 1 }}>
                      <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        size="small"
                        startIcon={<FiUpload />}
                        sx={{ py: 1.5 }}
                      >
                        Front Side
                        <input
                          type="file"
                          name="aadharFront"
                          onChange={handleFileChange}
                          hidden
                          required
                        />
                      </Button>
                      {formData.aadharFront && (
                        <Typography variant="caption" color="text.secondary">
                          {formData.aadharFront.name}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        size="small"
                        startIcon={<FiUpload />}
                        sx={{ py: 1.5 }}
                      >
                        Back Side
                        <input
                          type="file"
                          name="aadharBack"
                          onChange={handleFileChange}
                          hidden
                          required
                        />
                      </Button>
                      {formData.aadharBack && (
                        <Typography variant="caption" color="text.secondary">
                          {formData.aadharBack.name}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <TextField
                    label="PAN Number"
                    name="pan"
                    fullWidth
                    onChange={handleInputChange}
                    value={formData.pan}
                    required
                    size="small"
                    sx={{ mb: 2 }}
                    onInput={(e) => {
                      e.target.value = e.target.value.slice(0, 10);
                    }}
                  />

                  <Box sx={{ mb: 3 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      size="small"
                      startIcon={<FiUpload />}
                      sx={{ py: 1.5 }}
                    >
                      PAN Document
                      <input
                        type="file"
                        name="panFile"
                        onChange={handleFileChange}
                        hidden
                        required
                      />
                    </Button>
                    {formData.panFile && (
                      <Typography variant="caption" color="text.secondary">
                        {formData.panFile.name}
                      </Typography>
                    )}
                  </Box>

                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Document Type</InputLabel>
                    <Select
                      name="gstOrMsme"
                      value={formData.gstOrMsme}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gstOrMsme: e.target.value,
                        })
                      }
                      label="Document Type"
                      required
                    >
                      <MenuItem value="gstnumber">GST Number</MenuItem>
                      <MenuItem value="msme">M.S.M.E</MenuItem>
                    </Select>
                  </FormControl>

                  <Box sx={{ mb: 3 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      size="small"
                      startIcon={<FiUpload />}
                      sx={{ py: 1.5 }}
                    >
                      {getDocumentLabel()}
                      <input
                        type="file"
                        name="certificate"
                        onChange={handleFileChange}
                        hidden
                      />
                    </Button>
                    {formData.certificate && (
                      <Typography variant="caption" color="text.secondary">
                        {formData.certificate.name}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                      sx={{ color: purple[500], borderColor: purple[500] }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{
                        bgcolor: purple[500],
                        "&:hover": { bgcolor: purple[600] },
                        px: 4,
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                <Button
                  onClick={() => navigate("/")}
                  sx={{
                    color: purple[500],
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Login here
                </Button>
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default SignUp;