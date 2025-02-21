// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { FiChevronDown, FiLink, FiLayers, FiFolderPlus } from "react-icons/fi"
// import { MdOutlineFiberManualRecord } from "react-icons/md"
// import AddItemForm from "./AddItemForm"
// import PopUp from "./PopUp"
// import MapExistingItem from "./MapExistingItem"
// import CreateComboForm from "./CreateComboForm" // Import the new CreateComboForm component
// import AddSubcategoryForm from "./AddSubcategoryForm" // Add this import

// const LeftPanel = ({ categories = [], onProductSelect, dropdownOptions }) => {
//   const [openCategories, setOpenCategories] = useState({})
//   const [isPopUpOpen, setIsPopUpOpen] = useState(false)
//   const [popUpTitle, setPopUpTitle] = useState("")
//   const [showAddItemForm, setShowAddItemForm] = useState(false)
//   const [showMapExistingItem, setShowMapExistingItem] = useState(false)
//   const [showCreateComboForm, setShowCreateComboForm] = useState(false) // New state for CreateComboForm
//   const [showAddSubcategoryForm, setShowAddSubcategoryForm] = useState(false) // Add this state variable
//   const navigate = useNavigate()

//   const toggleCategory = (categoryName) => {
//     setOpenCategories((prev) => ({
//       ...prev,
//       [categoryName]: !prev[categoryName],
//     }))
//   }

//   const handleActionClick = (action) => {
//     if (action === "Add Item") {
//       setShowAddItemForm(true)
//     } else if (action === "Map Existing Item") {
//       setShowMapExistingItem(true)
//     } 
    
//     else if (action === "Create Combo") {
//       setShowCreateComboForm(true); // Show the CreateComboForm
//     } else if (action === "Show More") {
//       setShowCreateComboForm(true); // Show the CreateComboForm
//     } else if (action === "Add Subcategory") {
//       // Add this condition
//       setShowAddSubcategoryForm(true); // Show the AddSubcategoryForm
//     } else {
//       setPopUpTitle(action);
//       setIsPopUpOpen(true);
//     }
//   }

//   const handleCloseAddItem = () => {
//     setShowAddItemForm(false)
//   }

//   const handleCloseMapExistingItem = () => {
//     setShowMapExistingItem(false)
//   }

//   const handleCloseCreateCombo = () => {
//     setShowCreateComboForm(false)
//   }

//   const handleCloseAddSubcategory = () => {
//     // Add this function
//     setShowAddSubcategoryForm(false)
//   }

//   const closePopUp = () => {
//     setIsPopUpOpen(false)
//     setPopUpTitle("")
//   }

//   return (
//     <div className="bg-gray-50 border-r border-gray-200 flex flex-col justify-between     overflow-hidden custom-scrollbar">
//       {/* Menu Listing */}
//       <div className="flex-1 overflow-hidden">
//         <h2 className="text-xl font-semibold mb-6 text-gray-700">
//           Menu Listing
//         </h2>
//         {categories.map((category) => (
//           <div key={category.name} className="mb-4">
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
//       <div className="pt-4 border-t border-gray-200">
//         <div className="grid mb-28 grid-cols-2 gap-2">
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

//           {/* Show  More */}
//           <button
//             onClick={() => handleActionClick("Show More")}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
//           >
//             <FiLayers className="text-yellow-500" />
//             <span className="text-gray-700 text-sm font-medium">
//               Show More{" "}
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Add Item Form */}
//       {showAddItemForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <AddItemForm
//             isOpen={showAddItemForm}
//             onClose={handleCloseAddItem}
//             dropdownOptions={dropdownOptions}
//           />
//         </div>
//       )}

//       {/* Map Existing Item */}
//       {showMapExistingItem && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <MapExistingItem onClose={handleCloseMapExistingItem} />
//         </div>
//       )}

//       {/* Create Combo Form */}
//       {showCreateComboForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <CreateComboForm
//             isOpen={showCreateComboForm}
//             onClose={handleCloseCreateCombo}
//             categories={categories}
//           />
//         </div>
//       )}

//       {/* Add Subcategory Form */}
//       {showAddSubcategoryForm && ( // Add this conditional rendering
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
// }

// export default LeftPanel







import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiLink,
  FiLayers,
  FiFolderPlus,
  FiStar,
  FiChevronRight,
} from "react-icons/fi";
import { MdOutlineFiberManualRecord } from "react-icons/md";
import AddItemForm from "./AddItemForm";
import PopUp from "./PopUp";
import MapExistingItem from "./MapExistingItem";
import CreateComboForm from "./CreateComboForm";
import AddSubcategoryForm from "./AddSubcategoryForm";
import ShowMoreItemsForm from "./ShowMoreItemsForm";

const LeftPanel = ({ categories = [], onProductSelect, dropdownOptions }) => {
  const [openCategories, setOpenCategories] = useState({});
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showMapExistingItem, setShowMapExistingItem] = useState(false);
  const [showCreateComboForm, setShowCreateComboForm] = useState(false);
  const [showAddSubcategoryForm, setShowAddSubcategoryForm] = useState(false);
  const [showMoreItemsForm, setShowMoreItemsForm] = useState(false);
  const [featuredGroups, setFeaturedGroups] = useState([]);
  const [selectedFeaturedGroup, setSelectedFeaturedGroup] = useState(null);
  const [showFeaturedCollections, setShowFeaturedCollections] = useState(false);
  const navigate = useNavigate();

  // Load saved featured groups on component mount
  useEffect(() => {
    const storedGroups = localStorage.getItem("featuredItemsGroups");
    if (storedGroups) {
      setFeaturedGroups(JSON.parse(storedGroups));
    }
  }, []);

  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const toggleFeaturedCollections = () => {
    setShowFeaturedCollections(!showFeaturedCollections);
  };

  const selectFeaturedGroup = (groupId) => {
    setSelectedFeaturedGroup(
      groupId === selectedFeaturedGroup ? null : groupId
    );
  };

  const handleActionClick = (action) => {
    if (action === "Add Item") {
      setShowAddItemForm(true);
    } else if (action === "Map Existing Item") {
      setShowMapExistingItem(true);
    } else if (action === "Create Combo") {
      setShowCreateComboForm(true);
    } else if (action === "Show More") {
      setShowMoreItemsForm(true);
    } else if (action === "Add Subcategory") {
      setShowAddSubcategoryForm(true);
    } else {
      setPopUpTitle(action);
      setIsPopUpOpen(true);
    }
  };

  const handleSaveGroup = (newGroup) => {
    setFeaturedGroups((prev) => [...prev, newGroup]);
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

  const handleCloseShowMoreItems = () => {
    setShowMoreItemsForm(false);
    // Refresh featured groups from localStorage
    const storedGroups = localStorage.getItem("featuredItemsGroups");
    if (storedGroups) {
      setFeaturedGroups(JSON.parse(storedGroups));
    }
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    setPopUpTitle("");
  };

  // Calculate total items across all featured groups
  const totalFeaturedItems = featuredGroups.reduce(
    (total, group) => total + group.items.length,
    0
  );

  return (
    <div className="bg-gray-50 w-full border-r border-gray-200 flex flex-col justify-between overflow-hidden custom-scrollbar">
      {/* Menu Listing */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-6 text-gray-700 px-4 pt-4">
          Menu Listing
        </h2>

        {/* Featured Collections Dropdown */}
        {featuredGroups.length > 0 && (
          <div className="mb-6">
            <div
              onClick={toggleFeaturedCollections}
              className="flex justify-between items-center cursor-pointer py-2 px-4 bg-blue-50 hover:bg-blue-100 transition-all"
            >
              <div className="flex items-center">
                <FiStar className="text-yellow-500 mr-2" />
                <h4 className=" font-medium text-gray-700">
                  Featured Collections ({featuredGroups.length} groups,{" "}
                  {totalFeaturedItems} items)
                </h4>
              </div>
              <FiChevronDown
                className={`text-gray-500 transition-transform duration-300 ${
                  showFeaturedCollections ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Featured Groups Dropdown Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showFeaturedCollections
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {featuredGroups.map((group) => (
                <div key={group.id} className="ml-4 mt-2">
                  <div
                    onClick={() => selectFeaturedGroup(group.id)}
                    className="flex justify-between items-center cursor-pointer py-2 px-3 bg-white rounded-md hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-center">
                      <FiChevronRight
                        className={`text-gray-500 mr-2 transition-transform ${
                          selectedFeaturedGroup === group.id ? "rotate-90" : ""
                        }`}
                      />
                      <h4 className="font-medium text-gray-800">
                        {group.groupName}{" "}
                        <span className="text-sm text-gray-500">
                          ({group.items.length} items)
                        </span>
                      </h4>
                    </div>
                  </div>

                  {/* Group Items */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ml-6 ${
                      selectedFeaturedGroup === group.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-1 py-2">
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => onProductSelect(item)}
                          className="flex justify-between py-1 px-2 hover:bg-gray-100 cursor-pointer rounded-md transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <MdOutlineFiberManualRecord
                              className={
                                item.type === "Veg"
                                  ? "text-green-500"
                                  : item.type === "Non-Veg"
                                  ? "text-red-500"
                                  : "text-yellow-500"
                              }
                            />
                            <span>{item.name}</span>
                          </div>
                          <span className="text-sm">₹{item.pricing}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Categories */}
        {categories.map((category) => (
          <div key={category.name} className="mb-4 px-4">
            {/* Category Header */}
            <div
              onClick={() => toggleCategory(category.name)}
              className="flex justify-between items-center cursor-pointer mb-2 py-2 px-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <h3 className="font-medium text-gray-700">
                {category.name} ({category.subCount || 0} sub,{" "}
                {category.itemCount || 0} items)
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
              {category.subcategories?.map((sub) => (
                <div key={sub.name} className="ml-4">
                  <h4 className="text-gray-600 font-medium mb-2">{sub.name}</h4>
                  {sub.items?.map((item) => (
                    <div
                      key={item.id}
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
                              : "text-yellow-500"
                          }
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="text-sm">₹{item.pricing}</span>
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
          {/* Add Item */}
          <button
            onClick={() => handleActionClick("Add Item")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
          >
            <FiFolderPlus className="text-black" />
            Add Item
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

          {/* Feature Items (Show More) */}
          <button
            onClick={() => handleActionClick("Show More")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
          >
            <FiStar className="text-blue-500" />
            <span className="text-gray-700 text-sm font-medium">
              Feature Items
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
          <MapExistingItem onClose={handleCloseMapExistingItem} />
        </div>
      )}

      {/* Create Combo Form */}
      {showCreateComboForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CreateComboForm
            isOpen={showCreateComboForm}
            onClose={handleCloseCreateCombo}
            categories={categories}
          />
        </div>
      )}

      {/* Add Subcategory Form */}
      {showAddSubcategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AddSubcategoryForm
            isOpen={showAddSubcategoryForm}
            onClose={handleCloseAddSubcategory}
            categories={categories}
          />
        </div>
      )}

      {/* Show More Items Form */}
      {showMoreItemsForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ShowMoreItemsForm
            isOpen={showMoreItemsForm}
            onClose={handleCloseShowMoreItems}
            categories={categories}
            onSaveGroup={handleSaveGroup}
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