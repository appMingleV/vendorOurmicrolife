import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const vendorId = localStorage.getItem("vendorId");
  const token = localStorage.getItem("token");

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData and append fields
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_LARAVEL}api/categories/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Category Added Successfully", response.data);

      // Reset form after successful submission
      setCategoryName("");
      setImage(null);
      navigate("/category");
    } catch (error) {
      console.error("Error in Add Category", error);
    }
  };

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="container mx-auto mt-5 p-10">
        <h2 className="text-2xl font-bold mb-4 ml-9">Add New Category</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg mx-10 px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="categoryName"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={categoryName}
              onChange={handleInputChange}
              required
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter category name"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="imageUpload"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="imageUpload"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Category
            </button>
            <button
              type="button"
              onClick={() => navigate("/category")}
              className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
