import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar";

import "react-quill/dist/quill.snow.css";
import "./AddProduct.css";

const AddProduct = () => {
  const vendorId = localStorage.getItem("vendorId");
  const token = localStorage.getItem("token");
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [dimensionData, setDimensionData] = useState({
    length: "",
    breadth: "",
    height: "",
    actual_weight: "",
    units: "",
  });
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    quantity: totalQuantity,
    status: "",
    coin: "",
    category_id: "",
    sub_category_id: "",
    brand_name: "",
    prices: [
      {
        color_name: "",
        size_name: "",
        old_price: "",
        sale_price: "",
        specifications: [{ spec_key: "", spec_value: "" }],
        configuration: [{ size: "", old_price: "", sale_price: "", stock: "", pices:""}],
      },
    ],
  });
  const [featuredImage,setfeaturedImage]=useState('');
  const [images,setImages]=useState([]);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_LARAVEL}api/categories/getallcategory`
        );
        setCategories(response.data);
        console.log("categories", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    window.scrollTo(0, 0);
  }, []);

  // Fetch subcategories when a category is selected
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setProductData({ ...productData, category_id: categoryId });

    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_LARAVEL}api/getSubCatgoryBy/${categoryId}`
      );
      setSubCategories(response.data);
      console.log("subcategory listing ", response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // handle status of visibilty
  const handleStatusChange = (event) => {
    setProductData({ ...productData, status: event.target.value });
  };
  // Handle subcategory change
  const handleSubCategoryChange = (e) => {
    setProductData({ ...productData, sub_category_id: e.target.value });
  };

  // handle Dimensions
  const handleInputDimensions = (e) => {
    const { name, value } = e.target;
    const floatRegex = /^[0-9]*\.?[0-9]*$/;
    if (name == "actual_weight") {
      if (floatRegex.test(value)) {
        setDimensionData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setDimensionData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  // Handle form data input changes
  const handleInputChange = (e) => {
    console.log("nnnnnnnnnnnnnnnnnnnnnnnnn",e.target)
    const { name, value } = e.target;
    if (name === "quantity" || name == "coin") {
      // Allow only numbers (non-negative integers)
      if (/^\d*$/.test(value)) {
        setProductData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
      //  else {
      //   alert("Please enter a valid number.");
      // }
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle changes in price details
  const handlePriceChange = (index, e) => {
    const { name, value } = e.target;
    const prices = [...productData.prices];
    prices[index][name] = value;
    setProductData({ ...productData, prices });
  };

  // Handle specification changes
  const handleSpecificationChange = (priceIndex, specIndex, e) => {
    const { name, value } = e.target;
    const prices = [...productData.prices];
    prices[priceIndex].specifications[specIndex][name] = value;
    setProductData({ ...productData, prices });
  };

  // Handle configuration changes
  const handleConfigurationChange = (priceIndex, configIndex, e) => {
    const { name, value } = e.target;
    const prices = [...productData.prices];
    prices[priceIndex].configuration[configIndex][name] = value;
    setProductData({ ...productData, prices });
  };

  // Add a new price entry
  const handleAddPrice = () => {
    if (productData.prices.length < 5) {
      setProductData({
        ...productData,
        prices: [
          ...productData.prices,
          {
            color_name: "",
            size_name: "",
            old_price: "",
            sale_price: "",
            images: [],
            specifications: [{ spec_key: "", spec_value: "" }],
            configuration: [
              { size: "", old_price: "", sale_price: "", stock: "" ,pices:""},
            ],
          },
        ],
      });
    }
  };

  const handleInputChangeReact=(value)=>{
      setProductData((prevData) => ({
        ...prevData,
        "description": value,
      }));
  }
  // Remove a price entry
  const handleRemovePrice = (priceIndex) => {
    const prices = [...productData.prices];
    prices.splice(priceIndex, 1);
    setProductData({ ...productData, prices });
  };

  // Add a new specification to a price entry
  const handleAddSpecification = (index) => {
    const prices = [...productData.prices];
    prices[index].specifications.push({ spec_key: "", spec_value: "" });
    setProductData({ ...productData, prices });
  };

  // Add a new configuration to a price entry
  const handleAddConfiguration = (priceIndex) => {
    const prices = [...productData.prices];
    const currentConfigLength = prices[priceIndex].configuration.length;

    // Only allow adding a new configuration if there are fewer than 5
    if (currentConfigLength < 5) {
      prices[priceIndex].configuration.push({
        size: "",
        old_price: "",
        sale_price: "",
        stock: "",
        pices:""
      });
      setProductData({ ...productData, prices });
    }
  };

  // Remove a configuration from a price entry
  const handleRemoveConfiguration = (priceIndex, configIndex) => {
    const prices = [...productData.prices];
    prices[priceIndex].configuration.splice(configIndex, 1);
    setProductData({ ...productData, prices });
  };

  const calculateTotalStock = () => {
    const total = productData.prices.reduce((priceSum, price) => {
      const configSum = price.configuration.reduce((configSum, config) => {
        return configSum + (parseInt(config.stock, 10) || 0); // Parse stock and handle NaN
      }, 0);
      return priceSum + configSum;
    }, 0);
    setTotalQuantity(total);
  };
  // Add a new image to a price entry
  const handleAddImage = (priceIndex) => {
    const prices = [...productData.prices];
    prices[priceIndex].images.push(null); // Placeholder for the new image
    setProductData({ ...productData, prices });
  };

  // Handle image changes
  // const handleImageChange = (priceIndex, imgIndex, e) => {
  //   const file = e.target.files[0]; // Only handle the first file

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result; // This is the base64 encoded image string
  //       const prices = [...productData.prices];
  //       prices[priceIndex].images[imgIndex] = base64String; // Store base64 string instead of file
  //       setProductData({ ...productData, prices });
  //     };
  //     reader.readAsDataURL(file); // Convert file to base64
  //   }
  // };

 const handleMultipleImageChange = (priceIndex, e) => {
  const files = Array.from(e.target.files); // Convert FileList to Array
  const prices = [...productData.prices];
  
  // Add selected files to the specific price index
  // prices[priceIndex].images.push(...files);
  setProductData({ ...productData, prices });

  // Update the images state with actual files
  setImages((prevImages) => [...prevImages, ...files]);
};

  const handleRemoveImage = (priceIndex, imgIndex) => {
    const prices = [...productData.prices];
 
    setProductData({ ...productData, prices });
    setImages((prevImages) => prevImages.filter((_, index) => index !== imgIndex));
  };

  // Form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("The productData is:", productData);

  try {
    const formData = new FormData();

    // Append product data
    for (const key in productData) {
      if (key === "prices") {
        formData.append(key, JSON.stringify(productData[key])); // Convert array to JSON string
      } else {
        formData.append(key, productData[key]);
      }
    }

    // Append featured image (if available)
    if (featuredImage) {
      formData.append("featured_image", featuredImage);
    }

    // Append multiple images (if available)
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image); // Proper way to send multiple images
      });
    }
     console.log("product data ====================================>    ",productData)
    // Debugging: Check formData contents
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Send request to API
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL_NODE}api/vendor/product/${vendorId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
    setMessage("Product added successfully!");
    navigate("/products");

    toast.success("Product data submitted");
  } catch (error) {
    console.error("Error in adding product", error);
  }
};
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div
        className="max-w-3xl mx-auto p-4 border rounded-2xl my-4"
        style={{ border: "1px solid gray" }}
      >
        <h1 className="text-2xl font-bold mb-4">Add Products</h1>
        {message && <p className="text-green-500 mb-2">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            {productData.name.length >= 100 && (
              <p className="text-green-500 block mb-2">
                Size field text limit reached. Maximum 100 characters allowed.
              </p>
            )}
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={productData.name}
              onChange={handleInputChange}
              required
              maxLength={100} // Set the maximum character limit to 100
              className="w-full border border-gray-300 rounded p-2"
            />
            {/* Display character count */}
            <div className="absolute top-1 right-2 text-xs text-gray-500 z-10">
              {productData.name.length} / 100
            </div>
          </div>

          <div className="relative">
            {/* Alert */}
            {/* {productData.description.length >= 5000 && (
              <p className="text-green-500 block mb-2">
                You have reached the maximum character limit of 5000 for the
                description.
              </p>
            )} */}

           <ReactQuill
                 value={productData.description}
                 name="description"
                 onChange={handleInputChangeReact}
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike"], // Formatting buttons
                      [{ list: "ordered" }, { list: "bullet" }], // Lists
                      ["link", "image"], // Link and image options
                      [{ header: [1, 2, 3, false] }], // Header dropdown
                      [{ align: [] }], // Alignments
                      [{ color: [] }, { background: [] }],
                    ],
                  }}
                  placeholder={`Write your content for here...`}
                  className="w-full"
                  style={{
                    height: "400px",
                    overflowY: "auto",
                  }}
                />
            {/* Display character count */}
            
          </div>

          <div className="flex justify-between gap-y-2">
            {/* image input */}
            <Box
              border={2}
              borderColor="grey.300"
              borderRadius={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              my={2}
              sx={{
                width: "40%",
                height: "220px",
                justifyContent: "center",
                position: "relative",
                borderStyle: "dashed",
                cursor: "pointer", // To indicate that the box is clickable
              }}
              onClick={() => document.getElementById("file-input").click()} // Trigger file input when the box is clicked
            >
              {preview ? (
                <Box
                  component="img"
                  src={preview}
                  alt="Thumbnail Preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 2,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                />
              ) : (
                <>
                  <FaPlus
                    style={{
                      fontSize: "24px",
                      color: "gray",
                      marginRight: "4px",
                    }}
                  />
                  <span className="text-md">Upload Thumbnail Image</span>
                </>
              )}

              {/* Hidden file input for selecting file */}
              <input
                id="file-input" // Assign id to the input
                type="file"
                hidden
                name="featured_image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setfeaturedImage(file)
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                    
                      setPreview(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Box>

            <div className="w-[56%] flex flex-col gap-2">
              {/* visiblity  */}
              <div>
                <input
                  type="text"
                  name="coin"
                  placeholder="Coin"
                  value={productData.coin}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded p-2 mb-2"
                />
                <p className="pb-2 font-semibold">Visibility of the product</p>
                <div className="px-2 flex">
                  <label className="flex items-center mr-4 cursor-pointer">
                    {productData.status === "show" ? (
                      <FaCheckCircle className="text-blue-500 mr-2" />
                    ) : (
                      <MdOutlineRadioButtonUnchecked className="text-gray-500 mr-2" />
                    )}
                    <input
                      type="radio"
                      name="status"
                      value="show"
                      checked={productData.status === "show"}
                      onChange={handleStatusChange}
                      className="hidden"
                    />
                    Show Product
                  </label>
                  <label className="flex items-center cursor-pointer">
                    {productData.status === "hide" ? (
                      <FaCheckCircle className="text-blue-500 mr-2" />
                    ) : (
                      <MdOutlineRadioButtonUnchecked className="text-gray-500 mr-2" />
                    )}
                    <input
                      type="radio"
                      name="status"
                      value="hide"
                      checked={productData.status === "hide"}
                      onChange={handleStatusChange}
                      className="hidden"
                    />
                    Hide Product
                  </label>
                </div>
              </div>

              {/* Category's  */}
              <div className="flex justify-between items-center">
                <label>Category :</label>
                <select
                  name="category_id"
                  value={productData.category_id}
                  onChange={handleCategoryChange}
                  required
                  className="w-[200px] border border-gray-300 rounded p-2 "
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categorie_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between items-center">
                <label className="">Subcategory :</label>
                <select
                  name="sub_category_id"
                  value={productData.sub_category_id}
                  onChange={handleSubCategoryChange}
                  required
                  className="w-[200px] border border-gray-300 rounded p-2 "
                  disabled={isLoading || !subCategories.length}
                >
                  <option value="">Select Subcategory</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.sub_category_name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                name="brand_name"
                placeholder="Brand Name"
                value={productData.brand_name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Delivery Management Dimension
            </h2>
            <div className="flex gap-4 w-full">
              <input
                type="text"
                name="length"
                value={dimensionData.length}
                placeholder="Length"
                onChange={handleInputDimensions}
                className="p-2 mb-2 border rounded-md w-1/5"
              />
              <input
                type="text"
                name="breadth"
                value={dimensionData.breadth}
                placeholder="Width"
                onChange={handleInputDimensions}
                className="p-2 mb-2 border rounded-md w-1/5"
              />
              <input
                type="text"
                name="height"
                value={dimensionData.height}
                onChange={handleInputDimensions}
                placeholder="Height"
                className="p-2 mb-2 border rounded-md w-1/5"
              />
              <select
                name="units"
                value={dimensionData.units}
                onChange={handleInputDimensions}
                className="p-2 mb-2 rounded-md border w-1/2"
              >
                <option value="">Select Length Type</option>
                <option value="centimeter">cm</option>
                <option value="inches">inch</option>
                <option value="feet">feet</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="actual_weight"
                value={dimensionData.actual_weight}
                onChange={handleInputDimensions}
                placeholder="Actual Weight in KG"
                className="p-2 mb-2 border rounded-md w-full"
              />
            </div>
          </div>

          <hr />

          <h2 className="text-xl font-semibold mt-6">Prices</h2>
          {productData.prices.map((price, priceIndex) => (
            <div
              key={priceIndex}
              className="border border-gray-200 p-4 relative"
            >
              {/* Remove Price Option Button */}
              <button
                type="button"
                className={`absolute top-0 right-0 text-red-500 bg-red-100 p-1 text-lg ${
                  productData.prices.length === 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handleRemovePrice(priceIndex)}
                disabled={productData.prices.length === 1}
              >
                <RxCross2 />
              </button>

              <input
                type="text"
                name="color_name"
                placeholder="Color"
                value={price.color_name}
                onChange={(e) => handlePriceChange(priceIndex, e)}
                required
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />

              <h3 className="font-semibold mt-2">Images</h3>
              <div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleMultipleImageChange(priceIndex, e)}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {images?.map((img, imgIndex) => (
                  <div key={imgIndex} className="relative w-24 h-24">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Image ${imgIndex + 1}`}
                      className="w-full h-full object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(priceIndex, imgIndex)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold mt-4">Configurations</h3>
              {price.configuration.map((config, configIndex) => (
                <div
                  key={configIndex}
                  className="mb-2 border-black-800 border-b-2 relative"
                >
                  <button
                    type="button"
                    className={`absolute -top-7 -right-6 p-[2px] text-gray-800 bg-gray-100 ${
                      price.configuration.length === 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() =>
                      handleRemoveConfiguration(priceIndex, configIndex)
                    }
                    disabled={price.configuration.length === 1}
                  >
                    <RxCross2 />
                  </button>
                  <input
                    type="text"
                    name="size"
                    placeholder="Size:M,L,XL, ( 6+128 )"
                    value={config.size}
                    onChange={(e) =>
                      handleConfigurationChange(priceIndex, configIndex, e)
                    }
                    required
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                  <input
                    type="text"
                    name="old_price"
                    placeholder="MRP"
                    value={config.old_price}
                    onChange={(e) =>
                      handleConfigurationChange(priceIndex, configIndex, e)
                    }
                    required
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                  <input
                    type="text"
                    name="sale_price"
                    placeholder="Sell Price"
                    value={config.sale_price}
                    onChange={(e) =>
                      handleConfigurationChange(priceIndex, configIndex, e)
                    }
                    required
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                                    <input
                    type="text"
                    name="pices"
                    placeholder="pices"
                    value={config.pices}
                    onChange={(e) =>
                      handleConfigurationChange(priceIndex, configIndex, e)
                    }
                    required
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                  <input
                    type="text"
                    name="stock"
                    placeholder="Quantity"
                    value={config.stock}
                    onChange={(e) => {
                      handleConfigurationChange(priceIndex, configIndex, e);
                      calculateTotalStock();
                    }}
                    required
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddConfiguration(priceIndex)}
                className={`text-blue-500 bg-gray-100 py-1 px-2 border border-gray-300 rounded ${
                  price.configuration.length >= 5
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={price.configuration.length >= 5} // Disable the button when there are 5 configurations
              >
                {price.configuration.length >= 5
                  ? "Max Configurations Reached"
                  : "Add More Configurations"}
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPrice}
            className={`text-blue-600 bg-gray-100 py-1 px-2 border rounded ${
              productData.prices.length >= 5
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={productData.prices.length >= 5} // Disable the button when there are 5 price options
          >
            {productData.prices.length >= 5
              ? "Max Price Options Reached"
              : "Add More Price Options"}
          </button>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/3 bg-blue-500 text-white py-2 rounded mt-4"
            >
              Submit Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;
