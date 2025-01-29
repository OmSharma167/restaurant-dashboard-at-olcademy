import React from "react";

const DishDetailsComponent = ({ isEditMode, details, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-600 text-sm mb-2">Dish Details</label>
    <div className="grid grid-cols-2 gap-4">
      {/* Serving Info */}
      <div>
        <label className="block text-sm mb-1">Serving Info</label>
        {isEditMode ? (
          <input
            type="text"
            value={details.servingInfo || ""}
            onChange={(e) =>
              onChange("dishDetails.servingInfo", e.target.value)
            }
            className="w-full border px-3 py-2 rounded-md"
          />
        ) : (
          <div className="bg-gray-100 px-3 py-2 rounded-md">
            {details.servingInfo || "N/A"}
          </div>
        )}
      </div>

      {/* Calorie Count */}
      <div>
        <label className="block text-sm mb-1">Calorie Count</label>
        {isEditMode ? (
          <input
            type="text"
            value={details.calorieCount || ""}
            onChange={(e) =>
              onChange("dishDetails.calorieCount", e.target.value)
            }
            className="w-full border px-3 py-2 rounded-md"
          />
        ) : (
          <div className="bg-gray-100 px-3 py-2 rounded-md">
            {details.calorieCount || "N/A"}
          </div>
        )}
      </div>

      {/* Portion Size */}
      <div>
        <label className="block text-sm mb-1">Portion Size</label>
        {isEditMode ? (
          <input
            type="text"
            value={details.portionSize || ""}
            onChange={(e) =>
              onChange("dishDetails.portionSize", e.target.value)
            }
            className="w-full border px-3 py-2 rounded-md"
          />
        ) : (
          <div className="bg-gray-100 px-3 py-2 rounded-md">
            {details.portionSize || "N/A"}
          </div>
        )}
      </div>

      {/* Preparation Time */}
      <div>
        <label className="block text-sm mb-1">Preparation Time</label>
        {isEditMode ? (
          <input
            type="text"
            value={details.preparationTime || ""}
            onChange={(e) =>
              onChange("dishDetails.preparationTime", e.target.value)
            }
            className="w-full border px-3 py-2 rounded-md"
          />
        ) : (
          <div className="bg-gray-100 px-3 py-2 rounded-md">
            {details.preparationTime || "N/A"}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default DishDetailsComponent;
