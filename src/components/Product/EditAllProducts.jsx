import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar";
import "./AddProduct.css";

const AddProduct = () => {
  const vendorId = localStorage.getItem("vendorId");
  const token = localStorage.getItem("token");
  const [preview, setPreview] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [prices, setPrices] = useState([]);
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
    featured_image: "",
    category_id: "",
    sub_category_id: "",
    brand_name: "",
    prices: [
      {
        color_name: "",
        size_name: "",
        config1:"",
        old_price: "",
        sale_price: "",
        images: [],
        specifications: [{ spec_key: "", spec_value: "" }],
        config: [{ config2: "", size:"",old_price: "", sale_price: "", stock: "", pices:"",discount:"" }],
      },
    ],
  });

  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [thumbnail, setthumbnail] = useState(false);
  const [subCategoriesId, setSubCategoriesId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [changeStatus,setChangeStatus]=useState(false);
    const [images,setImages]=useState([{ type: 'server', image_path: '' },
  { type: 'local', file:'' }]);
  const [featuredImage,setfeaturedImage]=useState('');
  // Fetch all categories when the component mounts
  useEffect(() => {
    console.log(id);
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_NODE}api/vendor/product/${id}`
        );
     
        const product=response?.data?.data[0]
        console.log("========================== ",product)
        const response1 = await axios.get(
          `${process.env.REACT_APP_BASE_URL}admin/subategory/category/${product?.category_id}`
        );
    
        setSubCategories(response1?.data?.data);
  
        setProductData(product);
        setPrices(product?.prices || []);
        console.log(product?.prices)
        const prices=product?.prices
        setfeaturedImage(product.featured_image)
        const storeImage=[];
        for(let i=0;i<prices.length;i++){
          const serverImage=prices[i]?.images
          const arrayImage=[];
          for(let i=0;i<serverImage.length;i++){
                  arrayImage.push({type:"server",image_path:serverImage[i]});
          }
          console.log("=================================================>      ",arrayImage);
          storeImage[i]=arrayImage;
        }
        console.log("storage Images done==================================================>      ",storeImage);
        setImages(storeImage)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchSingleProduct();
    console.log("prodcut  data", productData);
  }, [changeStatus]);

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
    const fetchSubCategories = async () => {
      console.log("jgjhdwv");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/admin/subcategory/${productData.sub_category_id}`
        );
        setSubCategoriesId(response.data.data);
        console.log(" sub  categories", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    fetchSubCategories();
    window.scrollTo(0, 0);
  }, []);

  
  // Fetch subcategories when a category is selected
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setProductData({ ...productData, category_id: categoryId });
    console.log(categoryId);

    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}admin/subategory/category/${categoryId}`
      );
      setSubCategories(response?.data?.data || []);
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

  const handleUpdateForm = async (e) => {
    try {
      
      e.preventDefault();
      console.log("product data ===================================",productData)
        const formData = new FormData();
      // const dataForm = {
      //   productName: productData.name,
      //   description: productData.description,
      //   quantity: productData.quantity,
      //   coin: productData.coin,
      //   status: productData.status,
      //   categoryId: productData.category_id,
      //   subCategoryId: productData.sub_category_id,
      //   brandName: productData.brand_name,
      //   prices: productData.prices,
      //   discount:productData.discount
      // };
 for (const key in productData) {
      if (key === "prices") {
        formData.append(key, JSON.stringify(productData[key])); // Convert array to JSON string
      } else if(key=="featured_image") {

      }else{
         console.log(key)
        formData.append(key, productData[key]);
      }
    }
    console.log("featured I",featuredImage)
    
     if (featuredImage) {
      formData.append("featured_image", featuredImage);
    }
      productData.prices.forEach((priceItem, index) => {
      // formData.append(`prices[${index`, priceItem.name);
      if (images[index]) {
        images[index].forEach((imgFile) => {
          formData.append(`${index}`, imgFile.type=="server"?"":imgFile?.image_path); // [] helps group them
        });
      }
    });
    
      // console.log("hello is product ", dataForm);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}vendor/product/${id}`,
        formData
      );
      console.log("product updated ", response);
      navigate("/products")
      toast.success("product successfully edit")
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Error updating product. Please try again later.");
    }
  };

  // Handle form data input changes
  const handleInputChange = (e) => {
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
      console.log(productData);
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle changes in price details
  const handlePriceChange = (index, e) => {
    const { name, value } = e.target;
    console.log("name====>  ",name);
    console.log("value===>  ",value);
    console.log("index===>  ",index);
    const prices = [...productData.prices];
    prices[index][name] = value;
    setPrices(prices);
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
    console.log(name,value);
    // console.log("========>         ",prices)
    // console.log("hight is ====>           ",prices[priceIndex]?.config)
    // const prices = [...productData.prices];
    
    prices[priceIndex].config[configIndex][name] = value;
    // prices[priceIndex].configuration[configIndex][name] = value;
    setProductData({ ...productData, prices });

  };

  // Add a new price entry
  const handleAddPrice = () => {
    console.log("prices ==>  ",productData?.prices)
    if (productData?.prices?.length < 5) {
      setPrices([...prices, {
        color_name: "",
        size_name: "",
        config1:"",
        old_price: "",
        sale_price: "",
        images: [],
        specifications: [{ spec_key: "", spec_value: "" }],
        config: [{ config2: "", size:"",old_price: "", sale_price: "", stock: "", pices:"",discount:"" }],
      }])
      setProductData({
        ...productData,
        prices: [
          ...productData.prices,
          {
            color_name: "",
            size_name: "",
            old_price: "",
            config1:"",
            sale_price: "",
            images: [],
            specifications: [{ spec_key: "", spec_value: "" }],
            config: [
              {config2: "", size: "", old_price: "", sale_price: "", stock: "",pices:"",discount:"" },
            ],
          },
        ],
      });
    }
  };

  // Remove a price entry
  const handleRemovePrice =async (priceIndex,priceId) => {
    console.log("price Index  ===============>   ",priceId)
    const prices = [...productData.prices];
    if(priceId){
      const response=await axios.delete(`${process.env.REACT_APP_BASE_URL}vendor/productPrice/${priceId}`)
      console.log(response)
    }
    prices.splice(priceIndex, 1);
    setPrices(prices)
    setProductData({ ...productData, prices });
    setChangeStatus(!changeStatus)
    toast.success("Price configuration deleted sucessfully")
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
    const currentConfigLength = prices[priceIndex]?.config?.length;

    // Only allow adding a new configuration if there are fewer than 5
    if (currentConfigLength < 5) {
      prices[priceIndex].config.push({
        size: "",
        old_price: "",
        sale_price: "",
        stock: "",
      });
      setProductData({ ...productData, prices });
    }
  };

  // Remove a configuration from a price entry
  const handleRemoveConfiguration = async(priceIndex, configIndex,configId) => {
    console.log("==========>       ",configId);
    if(configId){
      const response=await axios.delete(`${process.env.REACT_APP_BASE_URL}vendor/productConfig/${configId}`);
      console.log("=============>  ",response)
    }

    const prices = [...productData.prices];
    prices[priceIndex].config.splice(configIndex, 1);
    setProductData({ ...productData, prices });
    toast.success("config deleted sucessfully ")
  };

  const calculateTotalStock = () => {
    const total = productData.prices.reduce((priceSum, price) => {
      const configSum = price.config.reduce((configSum, config) => {
        return configSum + (parseInt(config.stock, 10) || 0); // Parse stock and handle NaN
      }, 0);
      return priceSum + configSum;
    }, 0);
    setTotalQuantity(total);
  };
  // Add a new image to a price entry

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
  const handleInputChangeReact=(value)=>{
      setProductData((prevData) => ({
        ...prevData,
        "description": value,
      }));
  }
  const handleMultipleImageChange = (priceIndex, e) => {
    const files = Array.from(e.target.files); 
    const prices = [...productData.prices];
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Resolve with base64 string
        reader.readAsDataURL(file); // Convert file to base64
      });
    });
  
    Promise.all(readers).then((base64Images) => {
      setProductData({ ...productData, prices });
    });
          const arrayImage=[];
          for(let i=0;i<files.length;i++){
           arrayImage.push({type:"local",image_path:files[i]});
          }
          console.log("priceIndex ===>   ",priceIndex);
          const oldArray=images[priceIndex]?[...images[priceIndex]]:[]
          images[priceIndex]=[...oldArray,...arrayImage];
          // console.log("",arrayImage);
          setImages(images);
        console.log("=============================>  ",images);
    // images[priceIndex].image_path=[...images[priceIndex]?.image_path,...files];
    // setImages(images);
  };

  const handleRemoveImage = async(priceIndex, imgIndex,id) => {
    const prices = [...productData.prices];

    if(id){
          const response=await axios.delete(`${process.env.REACT_APP_BASE_URL}vendor/productImage/${id}`);    
    }
    images[priceIndex]?.splice(imgIndex, 1); 
  
    setImages(images);
        setProductData({ ...productData, prices });
        toast.success("Image successfully deleted");
  };

  // Form submission
 

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div
        className="max-w-3xl mx-auto p-4 border rounded-2xl my-4"
        style={{ border: "1px solid gray" }}
      >
        <h1 className="text-2xl font-bold mb-4">Update Products</h1>
        {message && <p className="text-green-500 mb-2">{message}</p>}
        <form  className="space-y-4">
          <div className="relative">
            {productData?.name?.length >= 100 && (
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
              {productData?.name?.length} / 100
            </div>
          </div>

          <div className="relative">
            {/* Alert */}
            {productData?.description?.length >= 5000 && (
              <p className="text-green-500 block mb-2">
                You have reached the maximum character limit of 5000 for the
                description.
              </p>
            )}
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
                    whiteSpace:"pre-wrap"
                  }}
                />
            {/* Display character count */}
            <div className="absolute bottom-4 right-4 text-xs text-gray-500 z-10">
              {productData?.description?.length} / 5000
            </div>
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
              {productData.featured_image ? (
                <Box
                  component="img"
                  src={
                    thumbnail
                      ? URL.createObjectURL(featuredImage)
                      : `${process.env.REACT_APP_BASE_URL_NODE}uploads/product/${productData.featured_image}`
                  }
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
                  console.log("changes ", e.target.files[0].name);
                  const file = e.target.files[0];
                  setthumbnail(true);
                  setfeaturedImage(file);
                  console.log(featuredImage);
                  if (file) {
                    const reader = new FileReader();
           
                    reader.onloadend = () => {
                      setProductData({
                        ...productData,
                      
                      });
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
                    {productData.status === "hold" ? (
                      <FaCheckCircle className="text-blue-500 mr-2" />
                    ) : (
                      <MdOutlineRadioButtonUnchecked className="text-gray-500 mr-2" />
                    )}
                    <input
                      type="radio"
                      name="status"
                      value="hold"
                      checked={productData.status === "hold"}
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
                  {categories?.map((category) => (
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
                  disabled={isLoading || !subCategories?.length}
                >
                  <option value="">Select Subcategory</option>
                  {subCategories?.map((subCategory) => (
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
                value={dimensionData?.length}
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
          {prices.map((price, priceIndex) => (
            <div
              key={priceIndex}
              className="border border-gray-200 p-4 relative"
            >
              {/* Remove Price Option Button */}
              <button
                type="button"
                className={`absolute top-0 right-0 text-red-500 bg-red-100 p-1 text-lg ${
                 prices.length === 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handleRemovePrice(priceIndex,price?.id)}
                disabled={prices.length === 1}
              >
                <RxCross2 />
              </button>

             <input
                type="text"
                name="config1"
                placeholder="config price name"
                value={price.config1}
                onChange={(e) => handlePriceChange(priceIndex, e)}
                required
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
              <input
                type="text"
                name="color_name"
                placeholder="config price value"
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
                {images[priceIndex]?.map((imgGroup, groupIndex) =>
    <div key={`${groupIndex}-${groupIndex}`} className="relative w-24 h-24">
      <img
        src={
          imgGroup?.type === "server"
            ? `${process.env.REACT_APP_BASE_URL_NODE}uploads/product/${imgGroup?.image_path?.image_path}`
            : URL.createObjectURL(imgGroup?.image_path)
        }
        alt={`Image ${groupIndex + 1}`}
        className="w-full h-full object-cover rounded border"
      />
      <button
        type="button"
        onClick={() => handleRemoveImage(priceIndex, groupIndex,imgGroup?.image_path?.id)}
        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
      >
        ×
      </button>
    </div>
)}

              </div>

              <h3 className="font-semibold mt-4">Configurations</h3>

              {price?.config?.map((config, configIndex) => (
                <div
                  key={configIndex}
                  className="mb-2 border-black-800 border-b-2 relative"
                >
                  <button
                    type="button"
                    className={`absolute -top-7 -right-6 p-[2px] text-gray-800 bg-gray-100 ${
                      price.config.length === 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() =>
                      handleRemoveConfiguration(priceIndex, configIndex,config?.id)
                    }
                    disabled={price.config.length === 1}
                  >
                    <RxCross2 />
                  </button>
                 <input
                    type="text"
                    name="config2"
                    placeholder="config name"
                    value={config.config2}
                    onChange={(e) =>
                      handleConfigurationChange(priceIndex, configIndex, e)
                    }
                    required
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                  <input
                    type="text"
                    name="size"
                    placeholder="config value"
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
                   <input
                    type="text"
                    name="discount"
                    placeholder="discount"
                    value={config.discount}
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
                  price.config.length >= 5
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={price.config.length >= 5} // Disable the button when there are 5 configurations
              >
                {price.config.length >= 5
                  ? "Max Configurations Reached"
                  : "Add More Configurations"}
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPrice}
            className={`text-blue-600 bg-gray-100 py-1 px-2 border rounded ${
              productData?.prices?.length >= 5
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={productData?.prices?.length >= 5} // Disable the button when there are 5 price options
          >
            {productData?.prices?.length >= 5
              ? "Max Price Options Reached"
              : "Add More Price Options"}
          </button>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/3 bg-blue-500 text-white py-2 rounded mt-4"
              onClick={handleUpdateForm}
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;
