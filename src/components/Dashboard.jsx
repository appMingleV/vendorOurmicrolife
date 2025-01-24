import { useState, useEffect } from "react";
import { FaDollarSign, FaExchangeAlt, FaUser } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import SalesTrendChart from "./Chart/graph";
import SalesTrendChart1 from "./Chart/graph1";
import Sidebar from "./Sidebar";
import axios from "axios";
import CommonHeader from "./commonHeader/CommonHeader";

const Dashboard = () => {
  const orders = [
    {
      id: "12345",
      paymentMethod: "Credit Card",
      orderDateTime: "2024-10-21 10:30 AM",
      deliveryDate: "2024-10-23",
      status: "Processing",
      amount: 50,
    },

    // More orders...
  ];

  const vendorId = localStorage.getItem("vendorId");
  const [closeButton, setCloseButton] = useState(false);
  const [statusProfile, setProfileStatus] = useState("Accept");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const fetchVendor = async () => {
    console.log("hey");
    try {
      console.log("hey2");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_NODE}api/vendor/${vendorId}`
      );
      setProfileStatus(response.data.data.vendorPersonalDetails.status);
      console.log("The profile is ", response.data.data);
    } catch (error) {
      console.error("Error during fetch Vendor Api", error);
    }
  };
  useEffect(() => {
    fetchVendor();
  }, []);

  const handleCloseButton = () => {
    setProfileStatus("Accept"); // Reset to "Accept" when closing the message
  };
  return (
    <div className="flex bg-[#F9F6FF]">
      <div>
        <Sidebar />
      </div>
      <div className="w-full p-6 min-h-screen"></div>
    </div>
  );
};

export default Dashboard;
