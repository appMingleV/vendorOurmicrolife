// import axios from "axios";
// import React, { useState,useEffect } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import Sidebar from "./Sidebar";

// const OrdersDetail = () => {
//   const { id } = useParams(); // Retrieve the orderId from the URL
//   const [product, setProducts] = useState([]);
//   const [fetchData, setFetchData] = useState(false);
//   const [productImage, setProductImage] = useState();
//   const [priceProduct, setPriceProduct] = useState([]);
//   const [allProducts, setAllProducts] = useState([]); // Store all products from the API
//   const [configPrice, setConfigPrice] = useState([]);
//   const token = localStorage.getItem("token");
//   const vendorId = localStorage.getItem("vendorId");
//   const location = useLocation();
//   const orderData = location?.state;
//   console.log("location", location?.state)

//   const fetchProduct = async () => {
//     try {

//       console.log(orderData?.product_id);
//       const productid = location?.state;
   
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}vendor/orderSingle/${productid?.id}`
//       );
//       console.log(productid?.id);

//       const product = response?.data?.data[0];
//       console.log("product in api", product);
//       setProducts(product);

//     } catch (errr) {
//       console.log(errr);
//     }
//   };
//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   return (
//     <div className="flex gap-5">
//       <div>
//         <Sidebar />
//       </div>
//       <div className="w-full pt-4  pr-4">
//         <p className=" flex justify-center lg:text-2xl sm:text-sm font-semibold  ">
//           Order Details
//         </p>
//         <div className="mt-4">
//           <div className=" flex justify-between border p-4">
//             <div>
//               <div>
//                 <p>
//                   <strong>Order ID:</strong> {product?.id}
//                 </p>
//                 <div className="flex">
//                   <p className="font-semibold">Date / Time: </p>
//                   <p>
//                     {product?.created_at?.split("T")[0]}/
//                     {product?.created_at?.split("T")[1].split(".")[0]}
//                   </p>
//                 </div>
//                 <div className="flex">
//                   <p className="font-semibold">Status:</p>
//                   <p>{product?.status}</p>
//                 </div>
//                 <div className="flex">
//                   <p className="font-semibold"> Payment Status:</p>
//                   <p>{product?.paymentStatus}</p>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <div className=" text-lg font-semibold">Address Info</div>
//               <div className="flex">
//                 <p className="font-semibold">Name:</p>
//                 <p>{product?.addressDetails?.full_name}</p>
//               </div>

//               <div className="flex">
//                 <p className=" font-semibold">Phone:</p>
//                 <p>{product?.addressDetails?.mobile_number}</p>
//               </div>

//               <div>
//                 <div className="flex">
//                   <p className=" font-semibold">Address:</p>
//                   <p>{product?.addressDetails?.full_address}</p>
//                 </div>
//                 <div className="flex">
//                   <p className=" font-semibold"> NearBy Address:</p>
//                   <p>{product?.addressDetails?.near_by_address}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <div className="flex">
//                     <p className=" font-semibold">city:</p>
//                     <p>{product?.addressDetails?.city}</p>
//                   </div>
//                   <div className="flex">
//                     <p className=" font-semibold">State:</p>
//                     <p>{product?.addressDetails?.state}</p>
//                   </div>
//                   <div className="flex">
//                     <p className=" font-semibold">Pin Code:</p>
//                     <p>{product?.addressDetails?.pin_code}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div>
//             <div className="flex justify-center font-semibold lg:text-2xl sm:text-sm pt-5">
//               Ordered Item
//             </div>
//             <div className="pt-3">
//               <table className="min-w-full bg-white shadow-md border-collapse">
//                 <thead>
//                   <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                     <th className="p-4  text-left">Product ID</th>
//                     <th className=" text-left">Price</th>
//                     <th className=" text-left">Product Name</th>
//                     <th className=" text-left">Product Image</th>
//                     <th className=" text-left">Color</th>
//                     <th className=" text-left">Configuration</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-gray-600 text-sm font-light">
//                   <tr className="border-b border-gray-200 hover:bg-gray-100">
//                     <td className="p-4 text-left text-blue-500 font-semibold">
//                       {product?.product_id}
//                     </td>
//                     <td className="p-4 text-left text-blue-500 font-semibold">
//                       {product?.sales_price}
//                     </td>
//                     <td className=" text-left">{product?.productName}</td>
//                     <td className=" text-left">
//                       <img
//                         src={`${product?.product_image}`}
//                         alt="Product Image"
//                         className="h-20 w-20 object-cover"
//                       />
//                     </td>
//                     <td className=" text-left">{product?.color}</td>
//                     <td className="text-left">{product?.size} </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrdersDetail;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";


const OrderStatusTracker = ({ status }) => {
  const steps = ["Ordered", "Packed", "Shipped", "Delivered"];
  const currentIndex = steps.findIndex((s) => s.toLowerCase() === status?.toLowerCase());

  return (
    <div className="w-full py-6">
      <div className="flex justify-between items-center max-w-4xl mx-auto px-4 relative">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;

          return (
            <div key={step} className="relative flex-1 flex items-center justify-center">
              {/* Circle + Label */}
              <div className="flex flex-col items-center z-10">
                <div
                  className={`rounded-full h-10 w-10 flex items-center justify-center text-sm font-bold transition-all duration-300
                    ${isCompleted ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}
                >
                  {index + 1}
                </div>
                <span className="text-xs text-gray-700 mt-2 font-medium">{step}</span>
              </div>

              {/* Connecting Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 right-[-50%] h-1 transition-all duration-300
                    ${index < currentIndex ? "bg-blue-600" : "bg-gray-300"}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};


const OrdersDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const location = useLocation();
  const orderData = location?.state;

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}vendor/orderSingle/${orderData?.id}`
      );
      setProduct(response?.data?.data[0]);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen pt-4 md:pt-2 lg:pt-40">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-center text-3xl font-bold text-blue-700 mb-6">Order Details</h1>

        {/* Status Tracker */}
        <OrderStatusTracker status={product?.status} />

        {/* Order + Address Info */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Order Info */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Order Information</h2>
              <p><span className="font-semibold text-gray-600">Order ID:</span> {product?.id}</p>
              <p><span className="font-semibold text-gray-600">Date / Time:</span> {product?.created_at?.split("T")[0]} / {product?.created_at?.split("T")[1]?.split(".")[0]}</p>
              <p><span className="font-semibold text-gray-600">Status:</span> <span className="text-green-600">{product?.status}</span></p>
              <p><span className="font-semibold text-gray-600">Payment:</span> <span className="text-indigo-600">{product?.paymentStatus}</span></p>
            </div>

            {/* Address Info */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Shipping Address</h2>
              <p><span className="font-semibold text-gray-600">Name:</span> {product?.addressDetails?.full_name}</p>
              <p><span className="font-semibold text-gray-600">Phone:</span> {product?.addressDetails?.mobile_number}</p>
              <p><span className="font-semibold text-gray-600">Address:</span> {product?.addressDetails?.full_address}</p>
              <p><span className="font-semibold text-gray-600">Nearby:</span> {product?.addressDetails?.near_by_address}</p>
              <p><span className="font-semibold text-gray-600">City:</span> {product?.addressDetails?.city}</p>
              <p><span className="font-semibold text-gray-600">State:</span> {product?.addressDetails?.state}</p>
              <p><span className="font-semibold text-gray-600">Pin Code:</span> {product?.addressDetails?.pin_code}</p>
            </div>
          </div>
        </div>

        {/* Ordered Item Table */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Ordered Item</h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-50 text-blue-700 font-semibold uppercase">
                <tr>
                  <th className="p-4">Product ID</th>
                  <th>Price</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Color</th>
                  <th>Configuration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 border-t">
                  <td className="p-4 text-blue-600">{product?.product_id}</td>
                  <td className="text-blue-600 font-semibold">₹{product?.sales_price}</td>
                  <td>{product?.productName}</td>
                  <td>
                    <img
                      src={product?.product_image}
                      alt="Product"
                      className="h-16 w-16 object-cover rounded shadow"
                    />
                  </td>
                  <td>{product?.color}</td>
                  <td>{product?.size}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetail;
