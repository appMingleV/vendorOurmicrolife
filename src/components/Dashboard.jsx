import { useState, useEffect } from "react";
import { FaDollarSign, FaExchangeAlt, FaUser } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import SalesTrendChart from "./Chart/graph";
import SalesTrendChart1 from "./Chart/graph1";
import Sidebar from "./Sidebar";
import axios from "axios";
import CommonHeader from "./commonHeader/CommonHeader";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
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
      setProfileStatus(response?.data?.data?.vendorPersonalDetails?.status);
      console.log("The profile is ", response?.data?.data);
    } catch (error) {
      console.error("Error during fetch Vendor Api", error);
    }
  };
  useEffect(() => {
    fetchVendor();
  }, []);

  const purchaseData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Purchases",
        data: [100, 200, 150, 300, 250, 400, 350],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };
  const [value, setValue] = React.useState(new Date());
  return (
    <div className="flex bg-[#F9F6FF]">
      <div>
        <Sidebar />
      </div>
      <div className="w-full p-6 min-h-screen">
        <div className="p-6 bg-gray-100 min-h-screen">
          {/* Dashboard Header */}
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-md text-center shadow-md">
              <p className="text-sm text-gray-600">Total Products </p>
              <h3 className="text-2xl font-bold text-blue-600">120</h3>
            </div>
            <div className="bg-green-100 p-4 rounded-md text-center shadow-md">
              <p className="text-sm text-gray-600">Total Orders </p>
              <h3 className="text-2xl font-bold text-green-600">₹12,500</h3>
            </div>
            <div className="bg-yellow-100 p-4 rounded-md text-center shadow-md">
              <p className="text-sm text-gray-600">Total Sales </p>
              <h3 className="text-2xl font-bold text-yellow-600">1,260</h3>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-lg font-bold mb-4">Purchases Over Time</h3>
              <Line data={purchaseData} />
            </div>

            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-lg font-bold mb-4">Calendar</h3>
              <Calendar onChange={setValue} value={value} className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
