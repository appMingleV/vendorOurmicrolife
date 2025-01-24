import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const categoriesPerPage = 5;

  const token = localStorage.getItem("token");

  // Fetch categories from API
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}admin/category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.categorie_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page after search
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubCategory = (id) => {
    navigate(`/subcategory/${id}`);
  };
  const handleAddCategory = () => {
    console.log(" click");
  };

  return (
    <div className="flex ">
      <div>
        <Sidebar />
      </div>
      <div className="p-4 w-full mx-auto  bg-white rounded-lg ">
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-3">
          Category Management
        </h1>

        {/* Search Input */}
        <div className="flex justify-between">
          <div className="w-2/3 ">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search categories"
              className="w-full pl-5  pb-2 pt-2 border border-gray-300 rounded-lg"
            />
          </div>
          {/* <Link to="/addCategory">
            <div className="p-2 cursor-pointer text-white rounded-sm  bg-blue-500">
              <h3>+ Add Category</h3>
            </div>
          </Link> */}
        </div>

        {/* Categories Table */}
        <table className="table-auto w-full border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="  p-4 border-b-2 border-gray-300 p-2 text-left">
                Category Name
              </th>
              <th className=" border-b-2 border-gray-300 p-2 text-left">
                Image
              </th>
              <th className=" border-b-2  border-gray-300 p-2  text-left">
                Sub Category
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.length > 0 ? (
              currentCategories.map((category, index) => (
                <tr key={index}>
                  <td className=" border-b border-gray-200 p-2">
                    {category.categorie_name}
                  </td>
                  <td className="border-b border-gray-200 p-2">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL_NODE}uploads/categories/${category.image}`}
                      alt={category.categorie_name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border-b border-gray-200 p-2">
                    <GrView
                      className="cursor-pointer text-gray-500 hover:text-blue-500 transition duration-200"
                      onClick={() => handleSubCategory(category.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="text-center border-b border-gray-200 p-2"
                >
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Previous
          </button>

          <span className="text-center text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
