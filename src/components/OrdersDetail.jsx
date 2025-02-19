import axios from "axios";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

const OrdersDetail = () => {
  const { id } = useParams(); // Retrieve the orderId from the URL
  const [product, setProducts] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [productImage, setProductImage] = useState();
  const [priceProduct, setPriceProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store all products from the API
  const [configPrice, setConfigPrice] = useState([]);
  const token = localStorage.getItem("token");
  const vendorId = localStorage.getItem("vendorId");
  const location = useLocation();
  const orderData = location.state;

  const fetchProduct = async () => {
    try {
      const reponse = await axios.get(
        `${process.env.REACT_APP_BASE_LARAVEL}api/getSignleProduct/product_id_${orderData.product_id}`
      );

      const product = reponse.data.products[0];
      console.log("product in api", product);
      setProducts(product);
      const productPrice = product.prices.filter(
        (item) => item.color_name === orderData.color
      );
      setPriceProduct(productPrice[0]);
      console.log(productPrice[0].images[0].image_path);
      setProductImage(productPrice[0].images[0].image_path);

      const configPrice = productPrice[0].configurations.filter(
        (item) => item.size === orderData.size
      );
      console.log("found config", configPrice[0]);
      setConfigPrice(configPrice[0]);
      setFetchData(true);
      console.log("product ", product);
      console.log("product price ", productPrice[0]);
    } catch (errr) {
      console.log(errr);
    }
  };
  !fetchData && fetchProduct();

  // if (!order) {
  //   return <div>Order Detail Not Found</div>;
  // }

  return (
    <div className="flex gap-5">
      <div>
        <Sidebar />
      </div>
      <div className="w-full pt-4  pr-4">
        <p className=" flex justify-center lg:text-2xl sm:text-sm font-semibold">
          Order Details
        </p>
        <div className="mt-4">
          <div className=" flex justify-between border p-4">
            <div>
              <div>
                <p>
                  <strong>Order ID:</strong> {orderData?.id}
                </p>
                <div className="flex">
                  <p className="font-semibold">Date / Time: </p>
                  {/* <p>
                    {order.created_at.split("T")[0]}/
                    {order.created_at.split("T")[1].split(".")[0]}
                  </p> */}
                </div>
                <div className="flex">
                  <p className="font-semibold">Status:</p>
                  <p>{orderData.order_cart.status}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold"> Payment Status:</p>
                  <p>{orderData?.order_cart?.payment_type}</p>
                </div>
              </div>
            </div>
            <div>
              <div className=" text-lg font-semibold">Address Info</div>
              <div className="flex">
                <p className="font-semibold">Name:</p>
                <p>{orderData?.order_cart?.shipping_address?.full_name}</p>
              </div>

              <div className="flex">
                <p className=" font-semibold">Phone:</p>
                <p>{orderData?.order_cart?.shipping_address?.mobile_number}</p>
              </div>

              <div>
                <div className="flex">
                  <p className=" font-semibold">Address:</p>
                  <p>{orderData?.order_cart?.shipping_address?.full_address}</p>
                </div>
                <div className="flex">
                  <p className=" font-semibold"> NearBy Address:</p>
                  <p>{orderData?.order_cart?.shipping_address?.near_by_address}</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex">
                    <p className=" font-semibold">city:</p>
                    <p>{orderData?.order_cart?.shipping_address?.city}</p>
                  </div>
                  <div className="flex">
                    <p className=" font-semibold">State:</p>
                    <p>{orderData?.order_cart?.shipping_address?.state}</p>
                  </div>
                  <div className="flex">
                    <p className=" font-semibold">Pin Code:</p>
                    <p>{orderData?.order_cart?.shipping_address?.pin_code}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-center font-semibold lg:text-2xl sm:text-sm pt-5">
              Ordered Item
            </div>
            <div className="pt-3">
              <table className="min-w-full bg-white shadow-md border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="p-4  text-left">Product ID</th>
                    <th className=" text-left">Price</th>
                    <th className=" text-left">Product Name</th>
                    <th className=" text-left">Product Image</th>
                    <th className=" text-left">Color</th>
                    <th className=" text-left">Configuration</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="p-4 text-left text-blue-500 font-semibold">
                      {orderData.product_id}
                    </td>
                    <td className="p-4 text-left text-blue-500 font-semibold">
                      {configPrice.sale_price}
                    </td>
                    <td className=" text-left">{product?.name}</td>
                    <td className=" text-left">
                      <img
                        src={`${process.env.REACT_APP_BASE_LARAVEL}storage/app/public/${productImage}`}
                        alt="Product Image"
                        className="h-20 w-20 object-cover"
                      />
                    </td>
                    <td className=" text-left">{orderData?.color}</td>
                    <td className="text-left">{orderData?.size} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetail;
