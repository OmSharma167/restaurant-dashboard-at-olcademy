// import React, { useState } from "react";
// import axios from "axios";
// import { FiX } from "react-icons/fi";

// const AddCategoryForm = ({ isOpen, onClose, onCategoryAdded }) => {
//   const [categoryName, setCategoryName] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate input
//     if (!categoryName.trim()) {
//       setError("Category name is required");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(
//         "http://localhost:4040/api/categories",
//         {
//           name: categoryName.trim(),
//           subCount: 0,
//           itemCount: 0,
//           subcategories: [],
//         }
//       );

//       console.log("Category created:", response.data);

//       // Notify parent component that a new category was added
//       if (onCategoryAdded) {
//         onCategoryAdded(response.data.category);
//       }

//       // Reset form and close modal
//       setCategoryName("");
//       onClose();
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to create category");
//       console.error("Error creating category:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`bg-white rounded-lg shadow-lg w-full max-w-md p-6 ${
//         isOpen ? "block" : "hidden"
//       }`}
//     >
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">
//           Add New Category
//         </h2>
//         <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//           <FiX size={20} />
//         </button>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             htmlFor="categoryName"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Category Name
//           </label>
//           <input
//             type="text"
//             id="categoryName"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter category name"
//           />
//           {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
//         </div>

//         <div className="flex justify-end space-x-3 mt-6">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             disabled={loading}
//           >
//             {loading ? "Creating..." : "Create Category"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddCategoryForm;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiX, FiCheckCircle } from "react-icons/fi";

const AddCategoryForm = ({ isOpen, onClose, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset success message when form is closed
  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4040/api/categories",
        {
          name: categoryName.trim(),
          subCount: 0,
          itemCount: 0,
          subcategories: [],
        }
      );

      console.log("Category created:", response.data);

      // Show success message
      setShowSuccess(true);

      // Notify parent component that a new category was added
      if (onCategoryAdded) {
        onCategoryAdded(response.data.category);
      }

      // Reset form
      setCategoryName("");

      // Auto-close the form after success message (optional)
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create category");
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {/* Success Notification */}
      {showSuccess && (
        <div className="absolute top-0 left-0 right-0 bg-green-100 text-green-800 px-4 py-3 rounded-t-lg flex items-center">
          <FiCheckCircle className="mr-2" size={20} />
          <span>Category successfully created!</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Add New Category
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category name"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;