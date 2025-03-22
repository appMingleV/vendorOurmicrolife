// src/pages/Profile.js
import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./Profile.css";
import imagee from "../../images/profiledummy.png";
import Sidebar from "../Sidebar";

// Profile Upload Component
const ProfileUpload = () => {
  const [vendorDetail, setpersonalDetail] = useState([]);
  const [vendor, setVendor] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");
  const vendorId = localStorage.getItem("vendorId");

  const toggleModal = () => setShowModal(!showModal);

  // console.log("The profile is pic", typeof vendor.documents);

  const fetchVendor = async () => {
    console.log("hey");
    try {
      console.log("hey2");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}vendor/${vendorId}`
      );
      setVendor(response?.data?.data);
      setpersonalDetail(response?.data?.data?.vendorPersonalDetails);
      console.log("The profile is ", response?.data?.data);
    } catch (error) {
      console.error("Error during fetch Vendor Api", error);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log("Password changed successfully!");
    toggleModal();
  };

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const handleLogoChange = (e) => {
    setLogo(e?.target?.files[0]);
  };

  const handleLogoSubmit = async (e) => {
    e.preventDefault();
    if (!logo) return;

    const formData = new FormData();
    formData.append("logo", logo); // Assuming the backend expects "logo" as the key

    try {
      await axios.put(
        `https://uvfolderking.com/suresop/api/vendor/update-logo/${vendorId}`, // Endpoint to update logo
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Logo changed successfully!");
      closePopup();
      fetchVendor();
    } catch (error) {
      console.error("Error during logo update", error);
    }
  };

  const handleImageUpdate = (e) => {
    setImage(e?.target?.files[0]);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const updatedProfileData = {
      first_name: e?.target?.first_name?.value || vendor?.first_name,
      last_name: e?.target?.last_name?.value || vendor?.last_name,
      phone_number: e?.target?.phone_number?.value || vendor?.phone_number,
      email: e?.target?.email?.value || vendor?.email,
      gstin: e?.target?.gstin?.value || vendor?.gstin,
    };

    // Append the image separately if it's provided
    if (image) {
      updatedProfileData.documents = image; // Or change to 'profile_image' or the relevant key used in your API
    }

    console.log("Updated Profile Data: ", updatedProfileData);
    console.log("token ", token);
    try {
      const response = await axios.put(
        `https://uvfolderking.com/suresop/api/vendor/update/${vendorId}`,
        updatedProfileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile updated successfully!", response?.data);
      alert("Profile updated successfully!");
      fetchVendor(); // Refresh vendor data after updating
    } catch (error) {
      console.error("Error during profile update", error);
    }
  };
  useEffect(() => {
    fetchVendor();
  }, []);

  return (
    <div className="flex justify-between gap-10">
      <div>
        <Sidebar />
      </div>

      <div className="flex justify-center items-start space-x-6 lg:mr-[150px]">
        {/* Profile Section */}
        <div className="flex-col ">
          <div className="bg-white rounded-lg shadow-md border w-72 mt-12 ">
            <div className="flex justify-center py-4">
              <img
                src={imagee}
                // src={`https://uvfolderking.com/suresop/storage/app/public/${vendor.documents}`}
                alt={imagee}
                className="w-24 h-24 rounded-full"
              />
              {/* <div onClick={openPopup}>
                <FaUserEdit className="ml-[-30px] cursor-pointer text-4xl bg-orange-600 text-white h-6 w-6 flex align-middle justify-center rounded-full p-1" />
              </div> */}

              {/* Change logo form */}
              {isOpen && (
                <div className="popup-overlay">
                  <div className="popup-form">
                    <h2>Change Logo</h2>
                    <form onSubmit={handleLogoSubmit}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        required
                      />
                      <button type="submit" className="submit-btn">
                        Change Logo
                      </button>
                      <button
                        type="button"
                        onClick={closePopup}
                        className="close-btn"
                      >
                        Close
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
            <h2 className="text-lg font-bold mb-2 text-center">
            {vendorDetail?.ownerName}
            </h2>
            <div className="flex justify-center items-center">
  <p
    className={`text-sm text-center mb-4 ${
      vendorDetail?.status === "Accept"
        ? "bg-green-100 text-green-700"
        : vendorDetail?.status === "Pending"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-700"
    } py-2 px-4 rounded`}
  >
    {vendorDetail?.status === "Accept" 
      ? "Approved" 
      : vendorDetail?.status === "Pending" 
      ? "Pending" 
      : "Suspended"}
  </p>
</div>

           
          </div>
        </div>

        {/* Update Profile Form */}
        <div className="bg-white shadow-md border rounded-lg p-5 w-99 mt-12 ml-5">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Update Profile
          </h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="flex flex-wrap mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-gray-700">Owner Name</label>
                <input
                  type="text"
                  className="border border-gray-300 w-full p-2 rounded"
                  placeholder="First Name"
                  defaultValue={vendorDetail?.ownerName} // Pre-fill with current first name
                  name="first_name"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-gray-700">Gender</label>
                <input
                  type="text"
                  maxLength={15}
                  className="border border-gray-300 w-full p-2 rounded"
                  placeholder="Last Name"
                  defaultValue={vendorDetail?.gender} // Pre-fill with current last name
                  name="last_name"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-4">
              <div className="w-1/2 ">
                <label className="block text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  className="border border-gray-300 w-full p-2 rounded"
                  placeholder="Mobile Number"
                  defaultValue={vendorDetail?.mobile} // Pre-fill with current phone number
                  name="phone_number"
                  required
                />
              </div>

              <div className="w-1/2 pl-2">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="border border-gray-300 w-full p-2 rounded"
                  placeholder="Enter Email"
                  defaultValue={vendorDetail?.email}
                  // Pre-fill with current email
                  name="email"
                  required
                />
              </div>
            </div>
            {/* <div className=" mb-3">
              <label className="block text-gray-700">GST No</label>
              <input
                type="text"
                className="border border-gray-300 w-full p-2 rounded"
                placeholder="Enter Email"
                defaultValue={vendor.gstin} // Pre-fill with current email
                name="gstin"
              />
            </div> */}
            <div className="flex flex-col">
              {/* Image input for the document upload */}
              <label className="">Profile Image</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png" // Allows multiple image formats and PDF
                // onChange={handleImageUpdate}
                className="border border-gray-300 p-2 rounded-lg"
              />
            </div>
            {/* <div className="flex justify-center mt-4">
              <button className="bg-blue-500 text-white px-32 py-2 rounded hover:bg-green-600">
                Update
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpload;
