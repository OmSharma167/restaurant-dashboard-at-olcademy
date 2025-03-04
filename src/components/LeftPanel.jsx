// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FiChevronDown,
//   FiLink,
//   FiLayers,
//   FiFolderPlus,
//   FiStar,
//   FiChevronRight,
//   FiFolder,
// } from "react-icons/fi";
// import { MdOutlineFiberManualRecord } from "react-icons/md";
// import AddItemForm from "./AddItemForm";
// import PopUp from "./PopUp";
// import MapExistingItem from "./MapExistingItem";
// import CreateComboForm from "./CreateComboForm";
// import AddSubcategoryForm from "./AddSubcategoryForm";
// import AddCategoryForm from "./AddCategoryForm";
// const LeftPanel = ({ categories = [], onProductSelect, dropdownOptions }) => {
//   const [openCategories, setOpenCategories] = useState({});
//   const [isPopUpOpen, setIsPopUpOpen] = useState(false);
//   const [popUpTitle, setPopUpTitle] = useState("");
//   const [showAddItemForm, setShowAddItemForm] = useState(false);
//   const [showMapExistingItem, setShowMapExistingItem] = useState(false);
//   const [showCreateComboForm, setShowCreateComboForm] = useState(false);
//   const [showAddSubcategoryForm, setShowAddSubcategoryForm] = useState(false);
//   const [showMoreItemsForm, setShowMoreItemsForm] = useState(false);
//   const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
//   const [categoryList, setCategoryList] = useState(categories);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setCategoryList(categories);
//   }, [categories]);

//   const toggleCategory = (categoryName) => {
//     setOpenCategories((prev) => ({
//       ...prev,
//       [categoryName]: !prev[categoryName],
//     }));
//   };
//   const handleActionClick = (action) => {
//     if (action === "Add Item") {
//       setShowAddItemForm(true);
//     } else if (action === "Map Existing Item") {
//       setShowMapExistingItem(true);
//     } else if (action === "Create Combo") {
//       setShowCreateComboForm(true);
//     } else if (action === "Add Subcategory") {
//       setShowAddSubcategoryForm(true);
//     } else if (action === "Add Category") {
//       setShowAddCategoryForm(true);
//     } else {
//       setPopUpTitle(action);
//       setIsPopUpOpen(true);
//     }
//   };
//   const handleSaveCategory = (newCategory) => {
//     // Add the new category to the existing categories
//     const updatedCategories = [...categoryList, newCategory];
//     setCategoryList(updatedCategories);

//     // Auto-open the newly created category
//     setOpenCategories((prev) => ({
//       ...prev,
//       [newCategory.name]: true,
//     }));

//     // You might want to persist this to localStorage or your backend
//     localStorage.setItem("categories", JSON.stringify(updatedCategories));
//   };

//   const handleCloseAddItem = () => {
//     setShowAddItemForm(false);
//   };

//   const handleCloseMapExistingItem = () => {
//     setShowMapExistingItem(false);
//   };

//   const handleCloseCreateCombo = () => {
//     setShowCreateComboForm(false);
//   };

//   const handleCloseAddSubcategory = () => {
//     setShowAddSubcategoryForm(false);
//   };

//   const handleCloseAddCategory = () => {
//     setShowAddCategoryForm(false);
//   };

//   const closePopUp = () => {
//     setIsPopUpOpen(false);
//     setPopUpTitle("");
//   };
//   return (
//     <div className="bg-gray-50 w-full border-r border-gray-200 flex flex-col justify-between overflow-hidden custom-scrollbar">
//       {/* Menu Listing */}
//       <div className="flex-1 overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-6 text-gray-700 px-4 pt-4">
//           Menu Listing
//         </h2>

//         {/* Regular Categories */}
//         {categoryList.map((category) => (
//           <div key={category.name} className="mb-4 px-4">
//             {/* Category Header */}
//             <div
//               onClick={() => toggleCategory(category.name)}
//               className="flex justify-between items-center cursor-pointer mb-2 py-2 px-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300 ease-in-out"
//             >
//               <h3 className="font-medium text-gray-700">
//                 {category.name} ({category.subCount || 0} sub,{" "}
//                 {category.itemCount || 0} items)
//               </h3>
//               <FiChevronDown
//                 className={`text-gray-500 transition-transform duration-300 ${
//                   openCategories[category.name] ? "rotate-180" : ""
//                 }`}
//               />
//             </div>

//             {/* Subcategories */}
//             <div
//               className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                 openCategories[category.name]
//                   ? "max-h-96 opacity-100"
//                   : "max-h-0 opacity-0"
//               }`}
//             >
//               {category.subcategories?.map((sub) => (
//                 <div key={sub.name} className="ml-4">
//                   <h4 className="text-gray-600 font-medium mb-2">{sub.name}</h4>
//                   {sub.items?.map((item) => (
//                     <div
//                       key={item.id}
//                       onClick={() => onProductSelect(item)}
//                       className="flex justify-between py-1 px-2 hover:bg-gray-100 cursor-pointer rounded-md transition-all duration-200 ease-in-out"
//                     >
//                       <div className="flex items-center gap-2">
//                         <MdOutlineFiberManualRecord
//                           className={
//                             item.type === "Veg"
//                               ? "text-green-500"
//                               : item.type === "Non-Veg"
//                               ? "text-red-500"
//                               : "text-yellow-500"
//                           }
//                         />
//                         <span>{item.name}</span>
//                       </div>
//                       <span className="text-sm">₹{item.pricing}</span>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Action Section */}
//       <div className="pt-4 border-t border-gray-200 px-4">
//         <div className="grid mb-28 grid-cols-2 gap-2">
//           {/* Add Category Form - NEW MODAL */}
//           {showAddCategoryForm && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <AddCategoryForm
//                 isOpen={showAddCategoryForm}
//                 onClose={handleCloseAddCategory}
//                 onSave={handleSaveCategory}
//               />
//             </div>
//           )}

//           {/* Add Category - NEW BUTTON */}
//           <button
//             onClick={() => handleActionClick("Add Category")}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
//           >
//             <FiFolder className="text-blue-600" />
//             <span className="text-gray-700 text-sm font-medium">
//               Add Category
//             </span>
//           </button>

//           {/* Add Subcategory */}
//           <button
//             onClick={() => handleActionClick("Add Subcategory")}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
//           >
//             <FiFolderPlus className="text-purple-500" />
//             <span className="text-gray-700 text-sm font-medium">
//               Add Subcategory
//             </span>
//           </button>

//           {/* Add Item */}
//           <button
//             onClick={() => handleActionClick("Add Item")}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
//           >
//             <FiFolderPlus className="text-black" />
//             Add Item
//           </button>

//           {/* Map Existing Item */}
//           <button
//             onClick={() => handleActionClick("Map Existing Item")}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
//           >
//             <FiLink className="text-green-500" />
//             <span className="text-gray-700 text-sm font-medium">
//               Add Existing Item
//             </span>
//           </button>

//           {/* Create Combo */}
//           <button
//             onClick={() => handleActionClick("Create Combo")}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
//           >
//             <FiLayers className="text-yellow-500" />
//             <span className="text-gray-700 text-sm font-medium">
//               Create Combo
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Add Item Form */}
//       {showAddItemForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <AddItemForm
//             isOpen={showAddItemForm}
//             onClose={handleCloseAddItem}
//             dropdownOptions={dropdownOptions}
//           />
//         </div>
//       )}

//       {/* Map Existing Item */}
//       {showMapExistingItem && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <MapExistingItem
//             onClose={handleCloseMapExistingItem}
//             isOpen={showMapExistingItem}
//           />
//         </div>
//       )}

//       {/* Create Combo Form */}
//       {showCreateComboForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <CreateComboForm
//             isOpen={showCreateComboForm}
//             onClose={handleCloseCreateCombo}
//             categories={categories}
//           />
//         </div>
//       )}

//       {/* Add Subcategory Form */}
//       {showAddSubcategoryForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <AddSubcategoryForm
//             isOpen={showAddSubcategoryForm}
//             onClose={handleCloseAddSubcategory}
//             categories={categories}
//           />
//         </div>
//       )}

//       {/* Pop-Up for other actions */}
//       {isPopUpOpen && (
//         <PopUp isOpen={isPopUpOpen} onClose={closePopUp} title={popUpTitle}>
//           <p className="text-gray-600">
//             This feature will be implemented soon.
//           </p>
//         </PopUp>
//       )}
//     </div>
//   );
// };
// export default LeftPanel;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiLink,
  FiLayers,
  FiFolderPlus,
  FiStar,
  FiChevronRight,
  FiFolder,
} from "react-icons/fi";
import { MdOutlineFiberManualRecord } from "react-icons/md";
import axios from "axios";
import AddItemForm from "./Dining_Takeaway_Menu_Management/AddItemForm";
import PopUp from "./PopUp";
import MapExistingItem from "./Dining_Takeaway_Menu_Management/MapExistingItem";
import CreateComboForm from "./Dining_Takeaway_Menu_Management/CreateComboForm";
import AddSubcategoryForm from "./Dining_Takeaway_Menu_Management/AddSubcategoryForm";
import AddCategoryForm from "./Dining_Takeaway_Menu_Management/AddCategoryForm";

const LeftPanel = ({ onProductSelect, dropdownOptions }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [openCategories, setOpenCategories] = useState({});
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showMapExistingItem, setShowMapExistingItem] = useState(false);
  const [showCreateComboForm, setShowCreateComboForm] = useState(false);
  const [showAddSubcategoryForm, setShowAddSubcategoryForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4040/api/items/all-items"
      );
      const items = response.data;

      const categoriesMap = {};
      items.forEach((item) => {
        const categoryName = item.categoryId?.name;
        const subcategoryName = item.subcategoryId?.name;

        if (!categoryName || !subcategoryName) return;

        if (!categoriesMap[categoryName]) {
          categoriesMap[categoryName] = {
            name: categoryName,
            subcategories: {},
            subCount: 0,
            itemCount: 0,
          };
        }

        if (!categoriesMap[categoryName].subcategories[subcategoryName]) {
          categoriesMap[categoryName].subcategories[subcategoryName] = {
            name: subcategoryName,
            items: [],
          };
          categoriesMap[categoryName].subCount++;
        }

        categoriesMap[categoryName].subcategories[subcategoryName].items.push(
          item
        );
        categoriesMap[categoryName].itemCount++;
      });

      setCategoryList(Object.values(categoriesMap));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const handleActionClick = (action) => {
    if (action === "Add Item") {
      setShowAddItemForm(true);
    } else if (action === "Map Existing Item") {
      setShowMapExistingItem(true);
    } else if (action === "Create Combo") {
      setShowCreateComboForm(true);
    } else if (action === "Add Subcategory") {
      setShowAddSubcategoryForm(true);
    } else if (action === "Add Category") {
      setShowAddCategoryForm(true);
    } else {
      setPopUpTitle(action);
      setIsPopUpOpen(true);
    }
  };

  const handleSaveCategory = (newCategory) => {
    // Add the new category to the existing categories
    const updatedCategories = [...categoryList, newCategory];
    setCategoryList(updatedCategories);

    // Auto-open the newly created category
    setOpenCategories((prev) => ({
      ...prev,
      [newCategory.name]: true,
    }));

    // You might want to persist this to localStorage or your backend
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  const handleCloseAddItem = () => {
    setShowAddItemForm(false);
  };

  const handleCloseMapExistingItem = () => {
    setShowMapExistingItem(false);
  };

  const handleCloseCreateCombo = () => {
    setShowCreateComboForm(false);
  };

  const handleCloseAddSubcategory = () => {
    setShowAddSubcategoryForm(false);
  };

  const handleCloseAddCategory = () => {
    setShowAddCategoryForm(false);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    setPopUpTitle("");
  };

  return (
    <div className="bg-gray-50 w-full border-r border-gray-200 flex flex-col justify-between overflow-hidden custom-scrollbar">
      {/* Menu Listing */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-6 text-gray-700 px-4 pt-4">
          Menu Listing
        </h2>

        {categoryList.map((category) => (
          <div key={category.name} className="mb-4 px-4">
            {/* Category Header */}
            <div
              onClick={() => toggleCategory(category.name)}
              className="flex justify-between items-center cursor-pointer mb-2 py-2 px-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <h3 className="font-medium text-gray-700">
                {category.name} ({category.subCount} sub, {category.itemCount}{" "}
                items)
              </h3>
              <FiChevronDown
                className={`text-gray-500 transition-transform duration-300 ${
                  openCategories[category.name] ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Subcategories */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openCategories[category.name]
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {Object.values(category.subcategories).map((sub) => (
                <div key={sub.name} className="ml-4">
                  <h4 className="text-gray-600 font-medium mb-2">{sub.name}</h4>
                  {sub.items.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => onProductSelect(item)}
                      className="flex justify-between py-1 px-2 hover:bg-gray-100 cursor-pointer rounded-md transition-all duration-200 ease-in-out"
                    >
                      <div className="flex items-center gap-2">
                        <MdOutlineFiberManualRecord
                          className={
                            item.type === "Veg"
                              ? "text-green-500"
                              : item.type === "Non-Veg"
                              ? "text-red-500"
                              : item.type === "Egg"
                              ? "text-yellow-500"
                              : "text-gray-500"
                          }
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="text-sm">
                        ₹
                        {typeof item.pricing === "number"
                          ? item.pricing.toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Section */}
      <div className="pt-4 border-t border-gray-200 px-4">
        <div className="grid mb-28 grid-cols-2 gap-2">
          {/* Add Category Form - NEW MODAL */}
          {showAddCategoryForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <AddCategoryForm
                isOpen={showAddCategoryForm}
                onClose={handleCloseAddCategory}
                onSave={handleSaveCategory}
              />
            </div>
          )}

          {/* Add Category - NEW BUTTON */}
          <button
            onClick={() => handleActionClick("Add Category")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
          >
            <FiFolder className="text-blue-600" />
            <span className="text-gray-700 text-sm font-medium">
              Add Category
            </span>
          </button>

          {/* Add Subcategory */}
          <button
            onClick={() => handleActionClick("Add Subcategory")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
          >
            <FiFolderPlus className="text-purple-500" />
            <span className="text-gray-700 text-sm font-medium">
              Add Subcategory
            </span>
          </button>

          {/* Add Item */}
          <button
            onClick={() => handleActionClick("Add Item")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
          >
            <FiFolderPlus className="text-black" />
            <span className="text-gray-700 text-sm font-medium">Add Item</span>
          </button>

          {/* Map Existing Item */}
          <button
            onClick={() => handleActionClick("Map Existing Item")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
          >
            <FiLink className="text-green-500" />
            <span className="text-gray-700 text-sm font-medium">
              Add Existing Item
            </span>
          </button>

          {/* Create Combo */}
          <button
            onClick={() => handleActionClick("Create Combo")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
          >
            <FiLayers className="text-yellow-500" />
            <span className="text-gray-700 text-sm font-medium">
              Create Combo
            </span>
          </button>
        </div>
      </div>

      {/* Add Item Form */}
      {showAddItemForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AddItemForm
            isOpen={showAddItemForm}
            onClose={handleCloseAddItem}
            dropdownOptions={dropdownOptions}
          />
        </div>
      )}

      {/* Map Existing Item */}
      {showMapExistingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <MapExistingItem
            onClose={handleCloseMapExistingItem}
            isOpen={showMapExistingItem}
          />
        </div>
      )}

      {/* Create Combo Form */}
      {showCreateComboForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CreateComboForm
            isOpen={showCreateComboForm}
            onClose={handleCloseCreateCombo}
            categories={categoryList}
          />
        </div>
      )}

      {/* Add Subcategory Form */}
      {showAddSubcategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AddSubcategoryForm
            isOpen={showAddSubcategoryForm}
            onClose={handleCloseAddSubcategory}
            categories={categoryList}
          />
        </div>
      )}

      {/* Pop-Up for other actions */}
      {isPopUpOpen && (
        <PopUp isOpen={isPopUpOpen} onClose={closePopUp} title={popUpTitle}>
          <p className="text-gray-600">
            This feature will be implemented soon.
          </p>
        </PopUp>
      )}
    </div>
  );
};

export default LeftPanel;
