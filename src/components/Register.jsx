import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { FaCircleCheck } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";

import React, { useState } from "react";

const steps = ["Personal Details", "Store Details", "KYC"];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    pan: "",
    mobile: "",
    email: "",
    address: "",
    storeName: "",
    username: "",
    storeCategory: "",
    storeAddress: "",
    businessContact: "",
    aadharFront: null,
    aadharBack: null,
    panFile: null,
    gstOrMsme: "",
    certificate: null,
  });

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

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <>
      <div
        className="flex justify-center shadow-lg max-w-[1024px] rounded-2xl min-h-[512px]"
        style={{ margin: "52px auto" }}
      >
        {/* child img-section */}
        <div className="w-1/2 flex justify-center items-center">
          <img
            src={require("../images/signup.png")}
            alt="Login_Image"
            className="max-w-[480px]"
          />
        </div>

        {/* progress-bar main */}
        <div className="w-1/2 max-w-[512px] my-6 mr-2">
          {/* <h1 className="text-2xl font-bold text-center">SignUp</h1> */}

          <div className="flex flex-col items-center px-10 py-6">
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              className="w-full max-w-2xl"
            >
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <div className="w-full max-w-2xl mt-6">
              {activeStep === 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Personal Details
                  </h3>
                  <TextField
                    fullWidth
                    label="Owner Name (Same as PAN)"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mb-2"
                    sx={{
                      "& .MuiInputBase-input": {
                        paddingY: "7px",
                        paddingX: "14px",
                      },
                      py: ["7px"],
                    }}
                  />

                  <div className="flex items-center gap-4 mb-2">
                    <Select
                      fullWidth
                      displayEmpty
                      name="gender"
                      value={formData.gender}
                      sx={{
                        "& .MuiInputBase-input": {
                          paddingY: "7px",
                          paddingX: "14px",
                        },
                      }}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="">Select Gender</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                    <TextField
                      fullWidth
                      label="Date of Birth (Same as PAN)"
                      type="date"
                      name="dob"
                      value={formData.dob}
                      sx={{
                        "& .MuiInputBase-input": {
                          paddingY: "7px",
                          paddingX: "14px",
                        },
                      }}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>

                  <div className="flex gap-4">
                    <TextField
                      fullWidth
                      label="Mobile"
                      name="mobile"
                      type="text"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      inputMode="numeric" // Ensures that only numeric input is possible on mobile devices
                      pattern="\d{10}" // Restricts input to 10 digits
                      maxLength={10} // Restricts the maximum length to 10 characters
                      sx={{
                        "& .MuiInputBase-input": {
                          paddingY: "7px",
                          paddingX: "14px",
                          display: "flex",
                          alignItems: "center", // Centers the placeholder text vertically
                        },

                        py: ["7px"],
                      }}
                      onInput={(e) => {
                        // Ensure only numbers are entered
                        e.target.value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10); // Remove non-numeric characters and limit to 10 digits
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {/* Mobile Check Icon */}
                            {formData.mobile.length === 10 && (
                              <FaCircleCheck className="text-green-600 text-2xl" />
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                    <button
                      className="text-sm w-24 py-0 px-2 h-8 rounded-md hover:bg-green-400 hover:text-white"
                      style={{ marginTop: "9px", fontWeight: "500" }}
                    >
                      Send OTP
                    </button>
                  </div>
                  {/* OTP  */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      inputmode="numeric"
                      maxlength="4"
                      oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 4);"
                      placeholder="Enter 4 digits"
                      className="tracking-widest mt-0 w-40 p-2 text-md outline-none border"
                    />
                  </div>
                  {/* OTP End  */}
                  <div className="flex gap-4">
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      sx={{
                        "& .MuiInputBase-input": {
                          paddingY: "7px",
                          paddingX: "14px",
                        },
                        py: ["7px"],
                      }}
                      onChange={handleInputChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {formData.email.includes("@") &&
                              formData.email.includes(".") && (
                                <FaCircleCheck className="text-green-600 text-2xl" />
                              )}
                          </InputAdornment>
                        ),
                      }}
                    />
                    <button
                      className="text-sm w-24 py-0 px-2 h-8 rounded-md hover:bg-green-400 hover:text-white"
                      style={{ marginTop: "9px", fontWeight: "500" }}
                    >
                      Send OTP
                    </button>
                  </div>

                  {/* Email OTP  */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      inputmode="numeric"
                      maxlength="4"
                      oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 4);"
                      placeholder="Enter 4 digits"
                      className="tracking-widest mt-0 w-40 p-2 text-md outline-none border"
                    />
                  </div>
                  {/*Email OTP End  */}

                  <TextField
                    fullWidth
                    label="Address (Same as Aadhar Card)"
                    name="address"
                    value={formData.address}
                    sx={{
                      "& .MuiInputBase-input": {
                        paddingY: "7px",
                        paddingX: "14px",
                      },
                      py: ["7px"],
                    }}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                  <div className="flex justify-end">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="progress-bar-step-2 px-4">
                  <h3 className="text-xl font-semibold mb-2">Store Details</h3>
                  <form>
                    <div>
                      <div>
                        <TextField
                          label="Store Name"
                          variant="outlined"
                          sx={{
                            "& .MuiInputBase-input": {
                              paddingY: "7px",
                              paddingX: "14px",
                            },
                            py: ["7px"],
                          }}
                          fullWidth
                        />
                      </div>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Username"
                          variant="outlined"
                          sx={{
                            "& .MuiInputBase-input": {
                              paddingY: "7px",
                              paddingX: "14px",
                            },
                            py: ["7px"],
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Store Category</InputLabel>
                          <Select
                            defaultValue="gstnumber"
                            sx={{
                              "& .MuiInputBase-input": {
                                paddingY: "7px",
                                paddingX: "14px",
                              },
                            }}
                          >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="msme">cat 1</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Store Address"
                          variant="outlined"
                          sx={{
                            "& .MuiInputBase-input": {
                              paddingY: "7px",
                              paddingX: "14px",
                            },
                            py: ["7px"],
                          }}
                          fullWidth
                        />
                      </Grid>
                      <div>
                        <TextField
                          label="Business Contact No (Optional)"
                          variant="outlined"
                          sx={{
                            "& .MuiInputBase-input": {
                              paddingY: "7px",
                              paddingX: "14px",
                            },
                            py: ["7px"],
                          }}
                          fullWidth
                        />
                      </div>
                    </div>
                  </form>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className="ml-4"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="progress-bar-step-3 px-4">
                  <h3 className="text-xl font-semibold mb-4">KYC</h3>
                  <form>
                    <Grid container spacing={2}>
                      <div className="w-full">
                        <TextField
                          label="Aadhar Number"
                          variant="outlined"
                          sx={{
                            "& .MuiInputBase-input": {
                              paddingY: "7px",
                              paddingX: "14px",
                            },
                            py: ["7px"],
                          }}
                          fullWidth
                        />
                      </div>
                      <div className="front-back">
                        <div className="flex w-full gap-2 mb-2">
                          <div className="px-2 pb-2 border rounded-md">
                            <label className="text-xs font-semibold">
                              Front Image
                            </label>
                            <div className="flex items-center">
                              <input type="file" className="w-3/4 text-sm" />
                              <FiUpload className="z-10 w-1/4" />
                            </div>
                          </div>
                          <div className="px-2 pb-2 border rounded-md">
                            <label className="text-xs font-semibold">
                              Back Image
                            </label>
                            <div className="flex items-center">
                              <input type="file" className="w-3/4 text-sm" />
                              <FiUpload className="z-10 w-1/4" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mb-2">
                        <TextField
                          label="PAN Number"
                          variant="outlined"
                          inputProps={{
                            maxLength: 10, // Limit input to 10 characters
                            style: { textTransform: "uppercase" }, // Automatically display input as uppercase
                          }}
                          onInput={(e) => {
                            // Allow only uppercase letters (A-Z) and numbers (0-9)
                            e.target.value = e.target.value.slice(0, 10);
                          }}
                          sx={{
                            "& .MuiInputBase-input": {
                              paddingY: "7px",
                              paddingX: "14px",
                            },
                            py: ["7px"],
                          }}
                          fullWidth
                        />

                        <div className="flex items-center mb-4 w-full relative border p-2 rounded-md">
                          <input type="file" className="w-3/4 text-sm" />
                          <FiUpload className="z-10 w-1/4 absolute -right-6" />
                        </div>
                      </div>
                      <div className="w-full mb-2">
                        <FormControl fullWidth>
                          <InputLabel>GST/M.S.M.E</InputLabel>
                          <Select
                            defaultValue="gstnumber"
                            sx={{
                              "& .MuiInputBase-input": {
                                paddingY: "7px",
                                paddingX: "14px",
                              },
                            }}
                          >
                            <MenuItem value="" defaultChecked>
                              Select
                            </MenuItem>
                            <MenuItem value="gstnumber">GST Number</MenuItem>
                            <MenuItem value="msme">M.S.M.E</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="w-full px-1">
                        <label className="text-sm font-semibold">
                          Certificate
                        </label>
                        <div className="flex items-center w-full relative border p-2 rounded-md">
                          <input type="file" className="w-3/4 text-sm" />
                          <FiUpload className="z-10 w-1/4 absolute -right-8" />
                        </div>
                      </div>
                      {/* <div>
                        <TextField
                          label="Enter GST/M.S.M.E"
                          variant="outlined"
                          sx={{
                            "& .MuiInputBase-input": {
                              paddingY: "7px",
                              paddingX: "14px",
                            },
                            py: ["7px"],
                          }}
                        />
                      </div>*/}
                    </Grid>
                  </form>
                  <div className="flex justify-end my-4">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className="ml-4"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
