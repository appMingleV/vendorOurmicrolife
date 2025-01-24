import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";

const CouponList = () => {
  const [coupons, setCoupons] = useState([
    {
      code: "SUMMER20",
      name: "Summer Sale",
      discountType: "Percentage",
      value: "20%",
      startDate: "2024-06-01",
      endDate: "2024-06-30",
      usageCount: 35,
      status: "Active",
    },
    {
      code: "WINTER10",
      name: "Winter Discount",
      discountType: "Fixed Amount",
      value: "$10",
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      usageCount: 50,
      status: "Deactive",
    },
    // Additional coupons...
  ]);

  const toggleStatus = (index) => {
    // Toggle status between 'Active' and 'Deactive'
    const updatedCoupons = [...coupons];
    updatedCoupons[index].status =
      updatedCoupons[index].status === "Active" ? "Deactive" : "Active";
    setCoupons(updatedCoupons); // Update state to re-render
  };

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>

      <div className="max-w-7xl mx-auto p-5 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          Coupon Management
        </h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                Coupon Code
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                Coupon Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                Discount Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                Value
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                Start Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                End Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                Usage Count
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-center text-sm font-bold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coupons.map((coupon, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-sm text-gray-800">
                  {coupon.code}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {coupon.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {coupon.discountType}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {coupon.value}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {coupon.startDate}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {coupon.endDate}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {coupon.usageCount}
                </td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      coupon.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {coupon.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center text-sm text-gray-700 flex justify-center space-x-2">
                  <button
                    className={`${
                      coupon.status === "Active"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-500 text-white"
                    } px-3 py-1 rounded-lg text-sm hover:opacity-80`}
                    onClick={() => toggleStatus(index)}
                  >
                    {coupon.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                  <button className="text-blue-500 hover:text-blue-600">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-600">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-8">
          <Link
            to="/coupon-form"
            className=" text-white px-5 py-2 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out shadow-md"
            style={{ backgroundColor: "#172552" }}
          >
            Create New Coupon
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CouponList;
