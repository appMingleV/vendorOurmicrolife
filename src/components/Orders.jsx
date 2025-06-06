// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FaExternalLinkAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar.jsx";

// // const orders = [
// //   {
// //     id: "121 091",
// //     created: "Aug 1, 2019",
// //     customer: "Harriet Santiago",
// //     fulfillment: "Unfulfilled",
// //     total: "$604.50",
// //     status: "Authorized",
// //     updated: "Today",
// //   },
// //   {
// //     id: "121 090",
// //     created: "Jul 21, 2019",
// //     customer: "Sara Graham",
// //     fulfillment: "Pending Receipt",
// //     total: "$1,175.50",
// //     status: "Paid",
// //     updated: "Today",
// //   },
// //   // Add more orders here for testing...
// // ];

// const Orders = () => {
//   const navigate = useNavigate();
//   const ordersPerPage = 5; // Define how many orders you want to show per page
//   const [currentPage, setCurrentPage] = useState(1);
//   const [order, setOrder] = useState([]);

//   const token = localStorage?.getItem("token");
//   const vendorId = localStorage?.getItem("vendorId");

//   const fetchOrder = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}vendor/order/${vendorId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
     
//       setOrder(response?.data?.data.reverse());
//       console.log("the orders are ", response?.data?.data);
//     } catch (error) {
//       console.error("Error in fetching Orders");
//     }
//   };

//   useEffect(() => {
//     fetchOrder();
//   }, [vendorId]);
//   console.log("order", order);
//   // Pagination logic (now using 'order' state instead of static 'orders')
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = order.slice(indexOfFirstOrder, indexOfLastOrder); // Paginate the fetched orders
//   const totalPages = Math?.ceil(order?.length / ordersPerPage);

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleOrderDetail = (orderId) => {
//     const foundOrder = order?.find((element) => orderId == element?.id);
//     navigate(`/orderDetail/${orderId}`, { state: foundOrder });
//   };
//   return (
//     <div className="flex gap-5 ">
//       <div>
//         <Sidebar />
//       </div>
//       <div className="w-full pr-4">
//         <p className=" flex justify-center text-2xl font-semibold font-medium mb-4 pt-4">
//           Orders
//         </p>
//         {/* Order Overview Cards */}
//         <section className="grid grid-cols-4 gap-4 mt-6">
//           <div className="bg-white p-6 rounded-lg shadow-sm text-center">
//             <h2 className="text-gray-500">Active Orders</h2>
//             <p className="text-2xl font-bold"></p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-sm text-center">
//             <h2 className="text-gray-500">Unfulfilled</h2>
//             <p className="text-2xl font-bold"></p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-sm text-center">
//             <h2 className="text-gray-500">Pending Receipt</h2>
//             <p className="text-2xl font-bold"></p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-sm text-center">
//             <h2 className="text-gray-500">Fulfilled</h2>
//             <p className="text-2xl font-bold"></p>
//           </div>
//         </section>

//         {/* Orders Table */}
//         <section className="mt-6">
//           <table className="min-w-full bg-white shadow-md border-collapse">
//             <thead className="bg-gray-50">
//               <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                 <th className="p-4">ORDER ID</th>
//                 <th>CREATED</th>
//                 <th>CUSTOMER</th>
//                 <th>PAYMENT STATUS</th>
//                 <th>TOTAL</th>
//                 <th>STATUS</th>
//                 <th>ORDER DETAILS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {order.map((order) => (
//                 <tr key={order.id} className="border-b">
//                   <td className="p-4 text-blue-500 font-semibold">
//                     {order.id}
//                   </td>
//                   <td>
//                     {order?.created_at?.split("T")[0]}/
//                     {order?.created_at?.split("T")[1].split(".")[0]}
//                   </td>
//                   <td>
//                     {order?.addressDetails?.full_address || ""}{" "}
//                     {order?.addressDetails?.full_name || "not found"}
//                   </td>
//                   <td>
//                     <span
//                       className={`px-2 py-1 rounded-full text-sm ${
//                         order?.payment_type === "upi"
//                           ? "bg-green-100 text-green-700"
//                           : order?.fulfillment === "cod"
//                           ? "bg-purple-100 text-purple-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {order?.paymentStatus}
//                     </span>
//                   </td>
//                   <td>{order?.total_price}</td>
//                   <td>
//                     <span
//                       className={`px-2 py-1 rounded-full text-sm ${
//                         order?.status === "Delivered"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {order?.status}
//                     </span>
//                   </td>
//                   <td
//                     onClick={() => handleOrderDetail(order.id)}
//                     className="text-blue-500 cursor-pointer"
//                   >
//                     <p className="flex justify-center">
//                       <FaExternalLinkAlt />
//                     </p>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>

//         {/* Pagination Controls */}
//         <div className="flex justify-between mt-3">
//           <button
//             onClick={prevPage}
//             className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50"
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           <span className="text-sm text-gray-600">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={nextPage}
//             className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50"
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const Orders = () => {
  const navigate = useNavigate();
  const ordersPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState([]);

  const token = localStorage?.getItem("token");
  const vendorId = localStorage?.getItem("vendorId");

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}vendor/order/${vendorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrder(response?.data?.data.reverse());
    } catch (error) {
      console.error("Error in fetching Orders");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [vendorId]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = order.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math?.ceil(order?.length / ordersPerPage);

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

  const handleOrderDetail = (orderId) => {
    const foundOrder = order?.find((element) => orderId === element?.id);
    navigate(`/orderDetail/${orderId}`, { state: foundOrder });
  };

  return (
    <div className="flex gap-5 bg-gray-50 min-h-screen p-4">
      <Sidebar />
      <div className="w-full">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6 pt-4">Vendor Orders</h2>

        {/* Order Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { title: "Active Orders", value: order.length },
            { title: "Unfulfilled", value: order.filter(o => o.status === "Ordered").length },
            { title: "Pending Receipt", value: order.filter(o => o.status === "Shipped").length },
            { title: "Fulfilled", value: order.filter(o => o.status === "Delivered").length }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-all duration-200">
              <h3 className="text-gray-500 text-sm mb-1">{item.title}</h3>
              <p className="text-2xl font-semibold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100">
              <tr>
                <th className="p-4">Order ID</th>
                <th>Created</th>
                <th>Customer</th>
                <th>Payment Status</th>
                <th>Total</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 text-blue-600 font-semibold">{order.id}</td>
                  <td>{order?.created_at?.split("T")[0]}</td>
                  <td>{order?.addressDetails?.full_name || "N/A"}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order?.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order?.paymentStatus || "N/A"}
                    </span>
                  </td>
                  <td>{order?.total_price}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order?.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order?.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order?.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleOrderDetail(order.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaExternalLinkAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={prevPage}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-600 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;