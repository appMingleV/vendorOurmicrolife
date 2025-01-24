import axios from "axios";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar";

const PreviewAllProducts = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Changed from array to a single product
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState([]);
  const [description, setDescription] = useState("");

  const sanitizedDescription = DOMPurify.sanitize(description);

  const vendorId = localStorage.getItem("vendorId");
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_LARAVEL}api/product/getpbyvendor/${vendorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const foundProduct = response.data.products.find((p) => p.id == id);
      setProduct(foundProduct);
      setPrices(foundProduct.prices);
      setDescription(foundProduct.description);

      console.log("product for config ", foundProduct);
      setLoading(false);
    } catch (error) {
      console.error("Error in fetching Products", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center text-red-600">Product not found.</div>;
  }

  return (
    <div className="flex justify-between">
      <div>
        <Sidebar />
      </div>
      <div className="max-w-4xl  bg-white p-8 rounded-lg shadow-md mt-10 relative">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Product Preview
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-6">
          {/* Product Image */}
          <div className=" right-10 top-20 w-full md:w-1/3 flex justify-center mb-6 md:mb-0 absolute">
            <img
              src={`${process.env.REACT_APP_BASE_LARAVEL}storage/app/public/${product.featured_image}`}
              // src={`https://uvfolderking.com/suresop/storage/app/public/${product.featured_image}`}
              alt="Product Preview"
              className="w-55 h-55 object-cover rounded-lg shadow-sm"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div>
                <label className="block text-gray-700 font-semibold">
                  Product Name
                </label>
                <p className="text-gray-600">{product.name}</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-semibold">
                  Category
                </label>
                <p className="text-gray-600">{product.category_id}</p>
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-gray-700 font-semibold">
                  Subcategory
                </label>
                <p className="text-gray-600">{product.sub_category_id}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Coin
                </label>
                <p className="text-gray-600">{product.coin}</p>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-gray-700 font-semibold">
                  Quantity
                </label>
                <p className="text-gray-600">{product.quantity}</p>
              </div>

              {/* Price */}
              {/* <div>
              <label className="block text-gray-700 font-semibold">Price</label>
              <p className="text-gray-600">{product.old_price}</p>
            </div>  */}

              {/* Sale Price */}
              {/* <div>
              <label className="block text-gray-700 font-semibold">
                Sale Price
              </label>
              <p className="text-gray-600">{product.sale_price}</p>
            </div>

           
            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold">
                Specifications
              </label>
              <ul className="text-gray-600">
                <li>Key: Value</li>
                <li>Key: Value</li>
              </ul>
            </div>

            
            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold">
                Configurations
              </label>
              <ul className="text-gray-600">
                <li>Name: Value</li>
                <li>Name: Value</li>
              </ul>
            </div> */}

              {/* Description */}
            </div>
          </div>
        </div>
        <div className="col-span-2 mt-5">
          <label className="block text-gray-700 font-semibold text-[20px]">
            Description
          </label>
          <p
            className="text-gray-500 mb-4"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          ></p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "60px",
            margin: "20px",
          }}
        >
          {prices.map((priceItem, index) => (
            <div
              key={index}
              style={{
                border: "1px solid gray", // Black border for the box
                borderRadius: "5px",
                padding: "16px",
                width: "360px",
                boxShadow: "0px 4px 6px rgba(15, 14, 14, 0.1)",
              }}
            >
              {/* Color Name */}
              <h3
                style={{
                  color: "#4caf50",
                  marginBottom: "10px",
                  textAlign: "center",

                  borderBottom: "1px solid black", // Black border under the header
                  paddingBottom: "8px",
                }}
              >
                Color: {priceItem.color_name}
              </h3>

              {/* Configurations */}
              {priceItem.configurations.map((config, configIndex) => (
                <div
                  key={configIndex}
                  style={{
                    borderRadius: "6px",
                    padding: "10px",
                    boxShadow: "0px 4px 6px rgba(4, 4, 4, 0.1)",
                    marginBottom: "16px",
                  }}
                >
                  <p>
                    <strong>Size:</strong> {config.size}
                  </p>
                  <p>
                    <strong>Sale Price:</strong> {config.sale_price}
                  </p>
                  <p>
                    <strong>Old Price:</strong>
                    <span
                      style={{ textDecoration: "line-through", color: "gray" }}
                    >
                      {config.old_price}
                    </span>
                  </p>
                  <p>
                    <strong>Stock:</strong> {config.stock}
                  </p>
                </div>
              ))}

              {/* Images */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "16px",
                  // Black border at the top of the images section
                  paddingTop: "10px",
                }}
              >
                {priceItem.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={`${process.env.REACT_APP_BASE_LARAVEL}storage/app/public/${image.image_path}`}
                    // src={`https://uvfolderking.com/suresop/storage/app/public/${image.image_path}`}
                    alt={`Product ${index} Image ${imgIndex}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      // objectFit: 'cover',
                      borderRadius: "4px",
                      // Black border for images
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Go Back Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Go Back
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default PreviewAllProducts;
