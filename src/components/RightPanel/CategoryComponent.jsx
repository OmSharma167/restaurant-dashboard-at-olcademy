import React from "react";

const CategoryComponent = ({
  isEditMode,
  data,
  onChange,
  categories,
  subCategories,
  offers,
}) => (
  <>
    {/* Category */}
    <div className="mb-4">
      <label className="block text-gray-600 text-sm mb-1">Category</label>
      {isEditMode ? (
        <select
          value={data.category}
          onChange={(e) => onChange("category", e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <div className="bg-gray-100 px-3 py-2 rounded-md">
          {data.category || "N/A"}
        </div>
      )}
    </div>

    {/* Sub-Category */}
    <div className="mb-4">
      <label className="block text-gray-600 text-sm mb-1">Sub-category</label>
      {isEditMode ? (
        <select
          value={data.subCategory}
          onChange={(e) => onChange("subCategory", e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        >
          {subCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <div className="bg-gray-100 px-3 py-2 rounded-md">
          {data.subCategory || "N/A"}
        </div>
      )}
    </div>

    {/* Offers */}
    <div className="mb-4">
      <label className="block text-gray-600 text-sm mb-1">Offers</label>
      {isEditMode ? (
        <select
          value={data.offer}
          onChange={(e) => onChange("offer", e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        >
          {offers.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <div className="bg-gray-100 px-3 py-2 rounded-md">
          {data.offer || "N/A"}
        </div>
      )}
    </div>
  </>
);

export default CategoryComponent;
