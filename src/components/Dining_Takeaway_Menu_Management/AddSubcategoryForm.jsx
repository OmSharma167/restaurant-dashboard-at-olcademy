// import { useState } from "react"
// import { FiX } from "react-icons/fi"
// import { X } from "lucide-react";

// const AddSubcategory = ({ isOpen, onClose, categories }) => {
//   const [subcategoryName, setSubcategoryName] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("")

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Here you would typically send the subcategory data to your backend
//     console.log("Subcategory added:", { name: subcategoryName, category: selectedCategory })
//     // Reset form
//     setSubcategoryName("")
//     setSelectedCategory("")
//     onClose()
//   }

//   if (!isOpen) return null

//   return (
//     <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Add Subcategory</h2>
//         <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//           <FiX size={24} />
//         </button>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//             Select Category
//           </label>
//           <select
//             id="category"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             required
//           >
//             <option value="">Select a category</option>
//             {categories.map((category) => (
//               <option key={category.name} value={category.name}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label htmlFor="subcategoryName" className="block text-sm font-medium text-gray-700">
//             Subcategory Name
//           </label>
//           <input
//             type="text"
//             id="subcategoryName"
//             value={subcategoryName}
//             onChange={(e) => setSubcategoryName(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             required
//           />
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={onClose}
//             className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
//           >
//             Add Subcategory
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default AddSubcategory





import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiChevronDown, FiX, FiRefreshCw } from "react-icons/fi";

const AddSubcategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch all top-level categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "http://localhost:4040/api/categories"
        );
        setCategories(response.data);
      } catch (err) {
        setError("Failed to load categories. Please try again.");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [refreshTrigger]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleOpenForm = () => {
    if (!selectedCategory) {
      setError("Please select a parent category first");
      return;
    }
    setIsFormOpen(true);
    setError("");
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSubcategoryName("");
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!subcategoryName.trim()) {
      setFormError("Subcategory name is required");
      return;
    }

    setFormLoading(true);
    setFormError("");

    try {
      const response = await axios.post(
        "http://localhost:4040/api/categories",
        {
          name: subcategoryName.trim(),
          parentCategoryId: selectedCategory._id,
        }
      );

      console.log("Subcategory created:", response.data);

      // Close form and reset
      handleCloseForm();

      // Refresh the categories list
      setRefreshTrigger((prev) => prev + 1);

      // Success message
      setError(""); // Clear any existing errors
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Failed to create subcategory"
      );
      console.error("Error creating subcategory:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const refreshCategories = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Category and Subcategory Management
      </h2>

      {/* Categories dropdown */}
      <div className="mb-6 relative">
        <label
          htmlFor="categorySelect"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Parent Category
        </label>

        <div className="relative">
          <button
            type="button"
            id="categorySelect"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            <span>
              {selectedCategory ? selectedCategory.name : "Select a category"}
            </span>
            <FiChevronDown size={18} />
          </button>

          <button
            onClick={refreshCategories}
            className="absolute right-12 top-2 text-gray-500 hover:text-gray-700"
            title="Refresh categories"
          >
            <FiRefreshCw size={18} />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
              {loading ? (
                <div className="p-3 text-center text-gray-500">Loading...</div>
              ) : categories.length > 0 ? (
                <ul>
                  {categories.map((category) => (
                    <li
                      key={category._id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category.name}
                      {category.subCount > 0 && (
                        <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
                          {category.subCount} subcategories
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-3 text-center text-gray-500">
                  No categories available
                </div>
              )}

              {error && <div className="p-2 text-sm text-red-600">{error}</div>}
            </div>
          )}
        </div>
      </div>

      {/* Add subcategory button */}
      <div className="mb-4">
        <button
          onClick={handleOpenForm}
          disabled={!selectedCategory}
          className={`flex items-center justify-center px-4 py-2 rounded-md w-full ${
            selectedCategory
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <FiPlus size={18} className="mr-2" />
          Add Subcategory
        </button>

        {error && !isFormOpen && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Subcategory form modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 m-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Add Subcategory to "{selectedCategory.name}"
              </h3>
              <button
                onClick={handleCloseForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="subcategoryName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subcategory Name
                </label>
                <input
                  type="text"
                  id="subcategoryName"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter subcategory name"
                />
                {formError && (
                  <p className="mt-1 text-sm text-red-600">{formError}</p>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={formLoading}
                >
                  {formLoading ? "Creating..." : "Create Subcategory"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Current category and subcategories display */}
      {selectedCategory && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">
            Category: {selectedCategory.name}
          </h3>

          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-1">
              Subcategories:
            </h4>
            {selectedCategory.subcategories &&
            selectedCategory.subcategories.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {selectedCategory.subcategories.map((sub) => (
                  <li key={sub._id} className="text-sm text-gray-600">
                    {sub.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No subcategories yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSubcategory;