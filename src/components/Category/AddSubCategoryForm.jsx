import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";

const AddSubCategoryForm = () => {
  const { id } = useParams();
  const [subCategoryName, setSubCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleInputChange = (event) => {
    setSubCategoryName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData and append fields
    const formData = new FormData();
    formData.append("name", subCategoryName);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_LARAVEL}api/sub-categories/${id}/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Subcategory Added Successfully", response.data);

      // Reset form after successful submission
      setSubCategoryName("");
      setImage(null);
      navigate(`/subcategory/${id}`);
    } catch (error) {
      console.error("Error in Add Subcategory", error);
    }
  };

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="container mx-auto mt-5 p-10">
        <h2 className="text-2xl font-bold mb-4 ml-9">Add New Subcategory</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg mx-10 px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subCategoryName"
            >
              Subcategory Name
            </label>
            <input
              type="text"
              id="subCategoryName"
              name="subCategoryName"
              value={subCategoryName}
              onChange={handleInputChange}
              required
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter subcategory name"
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
              Add Subcategory
            </button>
            <button
              type="button"
              onClick={() => navigate(`/subcategory/${id}`)}
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

export default AddSubCategoryForm;
