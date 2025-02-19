import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const vendorId = localStorage.getItem("vendorId");
  const token = localStorage.getItem("token");

  //----------------------------------------------------------------------
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [brandName, setBrandName] = useState("");
  const [coin, setCoin] = useState("");
  //   const [vendorId, setVendorId] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [prices, setPrices] = useState([
    {
      product_id: "",
      color_name: "",
      images: [
        {
         
          product_price_id: "",
          image_path: "",
        },
      ],
      configurations: [
        {
         
          products: "",
          size: "",
          old_price: "",
          sale_price: "",
          stock: "",
          pivot: {
            product_price_id: "",
            product_configuration_id: "",
          },
        },
      ],
    },
  ]);
  const [specifications, setSpecifications] = useState([]);

  //   ----------------------------------------------------------------------

  const [productData, setProductData] = useState({});

  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [singleProduct, setSingleProduct] = useState([]);

  const { id } = useParams();
  console.log(id);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_BASE_LARAVEL}api/getSignleProduct/product_id_${id}`
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       setSingleProduct(response?.data?.products[0]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [id]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_LARAVEL}api/getSignleProduct/product_id_${id}`
      )
      .then((response) => {
        console.log("API Response:", response.data);
        const singleProduct = response?.data?.products[0];

        if (singleProduct) {
          const mappedProductData = {
            name: singleProduct?.name || "",
            description: singleProduct?.description || "",
            quantity: singleProduct?.quantity || "",
            status: singleProduct?.status || "",
            featured_image: singleProduct?.featured_image
              ? [...singleProduct.featured_image]
              : [],
            category_id: singleProduct?.category_id || "",
            sub_category_id: singleProduct?.sub_category_id || "",
            brand_name: singleProduct?.brand_name || "",
            prices:
              singleProduct?.prices?.map((price) => ({
                color_name: price?.color_name || "",
                size_name: price?.size_name || "",
                old_price: price?.old_price || "",
                sale_price: price?.sale_price || "",
                images: price?.images?.map((img) => img.image_path) || [],
                specifications: [],
                configuration:
                  price?.configurations?.map((config) => ({
                    size: config?.size || "",
                    old_price: config?.old_price || "",
                    sale_price: config?.sale_price || "",
                    stock: config?.stock || "",
                  })) || [],
              })) || [],
          };

          console.log("Mapped Product Data:", mappedProductData);
          setProductData(mappedProductData);
          // setFeactureImage(singleProduct.featured_image);
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  // bhu
  const handleDescriptionChange = (value) => {
    setProductData({ ...productData, description: value }); // Update product data
  };

  //bhu
  // Remove image by index
  // Handle multiple image uploads
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    const images = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(images).then((base64Images) => {
      setProductData({
        ...productData,
        featured_image: [...productData.featured_image, ...base64Images],
      });
    });
  };

  // Remove image by index
  const handleRemoveImage = (index) => {
    const updatedImages = productData.featured_image.filter(
      (_, i) => i !== index
    );
    setProductData({ ...productData, featured_image: updatedImages });
  };

  // multiple images
  const handleAddPriceImage = (priceIndex, e) => {
    const file = e.target.files[0]; // Only handle one file at a time
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedPrices = [...productData.prices];
        updatedPrices[priceIndex].images.push(reader.result); // Push the base64 image
        setProductData({ ...productData, prices: updatedPrices });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemovePriceImage = (priceIndex, imgIndex) => {
    const updatedPrices = [...productData.prices];
    updatedPrices[priceIndex].images = updatedPrices[priceIndex].images.filter(
      (_, index) => index !== imgIndex
    );
    setProductData({ ...productData, prices: updatedPrices });
  };

  // const handleAddImage = (priceIndex) => {
  //   const updatedPrices = [...productData.prices];
  //   updatedPrices[priceIndex].images.push(""); // Push an empty string to show a new input
  //   setProductData({ ...productData, prices: updatedPrices });
  // };

  // Fetch all categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://uvfolderking.com/suresop/api/categories/getallcategory`
        );
        setCategories(response.data);
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
        `https://uvfolderking.com/suresop/api/getSubCatgoryBy/${categoryId}`
      );
      setSubCategories(response.data);
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

  // Handle form data input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
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
            { size: "", old_price: "", sale_price: "", stock: "" },
          ],
        },
      ],
    });
  };

  // Add a new specification to a price entry
  const handleAddSpecification = (index) => {
    const prices = [...productData.prices];
    prices[index].specifications.push({ spec_key: "", spec_value: "" });
    setProductData({ ...productData, prices });
  };

  // Add a new configuration to a price entry
  const handleAddConfiguration = (index) => {
    const prices = [...productData.prices];
    prices[index].configuration.push({
      size: "",
      old_price: "",
      sale_price: "",
      stock: "",
    });
    setProductData({ ...productData, prices });
  };

  // Add a new image to a price entry
  const handleAddImage = (priceIndex) => {
    const prices = [...productData.prices];
    prices[priceIndex].images.push(null); // Placeholder for the new image
    setProductData({ ...productData, prices });
  };

  // Handle image changes
  const handleImageChange = (priceIndex, imgIndex, e) => {
    const file = e.target.files[0]; // Only handle the first file

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result; // This is the base64 encoded image string
        const prices = [...productData.prices];
        prices[priceIndex].images[imgIndex] = base64String; // Store base64 string instead of file
        setProductData({ ...productData, prices });
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("the productData is ", productData);
    // Add product to API
    try {
      const formData = new FormData();
      for (const key in productData) {
        if (key === "prices") {
          formData.append(key, JSON.stringify(productData[key]));
        } else {
          formData.append(key, productData[key]);
        }
      }

      const response = await axios.post(
        `https://uvfolderking.com/suresop/api/vendor/product/${vendorId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setMessage("Product added successfully!");
    } catch (error) {
      console.error("Error in adding product", error);
    }

    alert("Product data submitted");
  };

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl text-center font-bold mb-4">
          Edit Add Products
        </h1>
        {message && <p className="text-green-500 mb-2">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          />

          {/* <textarea
            name="description"
            placeholder="Product Description"
            value={productData.description}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          /> */}

          {/* description quill wala */}

          <ReactQuill
            value={productData.description}
            onChange={handleDescriptionChange}
            placeholder="Product Description"
            className="w-full border rounded p-2"
          />
          {/* end description quill */}

          <input
            type="text"
            name="quantity"
            placeholder=" Total Product Quantity"
            value={productData.quantity}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded  p-2"
          />
          <div>
            <p className="pb-2">Visibility of the product</p>
            <div className="w-full border border-gray-300 rounded p-2">
              <label className="mr-4">
                <input
                  type="radio"
                  name="status"
                  value="show"
                  checked={productData.status === "show"}
                  onChange={handleStatusChange}
                  className="mr-2"
                />
                Show Product
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="hide"
                  checked={productData.status === "hide"}
                  onChange={handleStatusChange}
                  className="mr-2"
                />
                Hide Product
              </label>
            </div>
          </div>

          {/* Multiple Image Input */}
          {/* Multiple Image Input */}
          <input
            type="file"
            name="featured_image"
            multiple
            onChange={handleImagesChange}
            className="w-full border border-gray-300 rounded p-2"
          />

          {/* Show Selected Images */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="relative w-32 h-32">
              <img
                src={featuredImage}
                alt={`Preview`}
                className="w-full h-full object-cover rounded"
              />

              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                &times;
              </button>
            </div>
          </div>

          {/* end images */}

          <label>Category:</label>
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
                {category.name}
              </option>
            ))}
          </select>

          {/* Subcategory Dropdown */}
          <label className="lg:pl-5">Subcategory:</label>
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
                {subCategory.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="brand_name"
            placeholder="Brand Name"
            value={productData.brand_name}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          />

          <h2 className="text-xl font-semibold mt-6">Prices</h2>

          <button
            type="button"
            onClick={handleAddPrice}
            className="text-blue-500"
          >
            Add More Price Options
          </button>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded mt-4"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
