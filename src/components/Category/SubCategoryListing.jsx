import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";

const SubCategoryListing = () => {
  const { id } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const subCategoriesPerPage = 5;
  const token = localStorage.getItem("token");

  // Fetch subcategories from API
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}admin/subategory/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("sub category list",response.data)
      setSubCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching subcategories", error);
    }
  };

  // Filter subcategories based on search term
  const filteredSubCategories = subCategories.filter((subCategory) =>
    subCategory.sub_category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastSubCategory = currentPage * subCategoriesPerPage;
  const indexOfFirstSubCategory = indexOfLastSubCategory - subCategoriesPerPage;
  const currentSubCategories = filteredSubCategories.slice(
    indexOfFirstSubCategory,
    indexOfLastSubCategory
  );
  const totalPages = Math.ceil(
    filteredSubCategories.length / subCategoriesPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page after search
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  return (
    <div className="flex">
      <div>
       
        <Sidebar/>
      </div>

      <div className="p-4 w-full mx-auto bg-white rounded-lg">
        <h1 className="text-center text-2xl text-gray-800 mb-3">
          Subcategory Management
        </h1>

        {/* Search Input */}
        <div className="flex justify-between">
          <div className="w-2/3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search subcategories"
              className="w-full pl-5 pb-2 pt-2 border border-gray-300 rounded-lg"
            />
          </div>
          {/* <Link to={`/addSubCategory/${id}`}>
            <div className="p-2 cursor-pointer text-white rounded-sm bg-blue-500">
              <h3>+ Add Subcategory</h3>
            </div>
          </Link> */}
        </div>

        {/* Subcategories Table */}
        <table className="table-auto w-full border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="p-4 border-b-2 border-gray-300 text-left">
                Subcategory Name
              </th>
              <th className="border-b-2 border-gray-300 text-left">Image</th>
            </tr>
          </thead>
          <tbody>
            {currentSubCategories.length > 0 ? (
              currentSubCategories.map((subCategory, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-200 p-2">
                    {subCategory.sub_category_name}
                  </td>
                  <td className="border-b border-gray-200 p-2">
                    <img
                  src={`${process.env.REACT_APP_BASE_URL_NODE}uploads/categories/subcategories/${subCategory.image}`}
                  alt={subCategory.sub_category_name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center border-b border-gray-200 p-2"
                >
                  No subcategories found
                </td>
              </tr>
            )}
          </tbody>
        </table>

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

export default SubCategoryListing;
