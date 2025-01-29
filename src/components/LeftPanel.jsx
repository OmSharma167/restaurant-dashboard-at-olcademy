// src/components/LeftPanel.jsx
import React, { useState } from "react";
import {
  FiChevronDown,
  FiPlusCircle,
  FiLink,
  FiLayers,
  FiFolderPlus,
} from "react-icons/fi";
import { MdOutlineFiberManualRecord } from "react-icons/md";
import PopUp from "./PopUp";

const LeftPanel = ({ categories = [], onProductSelect }) => {
  const [openCategories, setOpenCategories] = useState({});
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("");

  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const handleActionClick = (action) => {
    setPopUpTitle(action);
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    setPopUpTitle("");
  };

  return (
    <div className="w-1/3 bg-gray-50 border-r border-gray-200 p-4 flex flex-col justify-between h-full overflow-y-auto custom-scrollbar">
      {/* Menu Listing */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Menu Listing
        </h2>
        {categories.map((category) => (
          <div key={category.name} className="mb-4">
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
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          {/* Add Item */}
          <button
            onClick={() => handleActionClick("Add Item")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
          >
            <FiPlusCircle className="text-blue-500" />
            <span className="text-gray-700 text-sm font-medium">Add Item</span>
          </button>

          {/* Map Existing Item */}
          <button
            onClick={() => handleActionClick("Map Existing Item")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
          >
            <FiLink className="text-green-500" />
            <span className="text-gray-700 text-sm font-medium">
              Map Existing Item
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
        </div>
      </div>

      {/* Pop-Up */}
      <PopUp isOpen={isPopUpOpen} onClose={closePopUp} title={popUpTitle}>
        <p className="text-gray-600">This feature will be implemented soon.</p>
      </PopUp>
    </div>
  );
};

export default LeftPanel;
