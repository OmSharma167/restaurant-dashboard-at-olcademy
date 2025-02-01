import React, { useState, useEffect } from "react";
import HeaderComponent from "./RightPanel/HeaderComponent";
import CategoryComponent from "./RightPanel/CategoryComponent";
import FoodTypeComponent from "./RightPanel/FoodTypeComponent";
import ServiceTypeComponent from "./RightPanel/ServiceTypeComponent";
import PricingComponent from "./RightPanel/PricingComponent";
import DishDetailsComponent from "./RightPanel/DishDetailsComponent";
import ImagesComponent from "./RightPanel/ImagesComponent";
import ItemDescriptionComponent from "./RightPanel/ItemDescriptionComponent";
import ActionButtonsComponent from "./RightPanel/ActionButtonsComponent";
import dummyData from "../data/dummy";

const RightPanel = ({ selectedProduct, onDelete, onDuplicate }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState(selectedProduct || {});

  useEffect(() => {
    if (selectedProduct) {
      setData({ ...selectedProduct });
    }
  }, [selectedProduct]);

  const handleFieldChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saved data:", data);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setData({ ...selectedProduct });
    setIsEditMode(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      onDelete(data.id);
    }
  };

  const handleDuplicate = () => {
    const duplicatedItem = {
      ...data,
      id: Date.now(),
      name: `${data.name} (Copy)`,
    };
    onDuplicate(duplicatedItem);
    setData(duplicatedItem);
    setIsEditMode(true);
  };

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="w-2/3 p-6 bg-white shadow-md border-l border-gray-200">
        <p className="text-gray-500">
          No item selected. Please select an item from the left panel.
        </p>
      </div>
    );
  }

  return (
    <div className=" p-6 bg-white shadow-md border-l border-gray-200 overflow-y-auto">
      {/* Header */}
      <HeaderComponent
        title={data.name || "Untitled"}
        isEditMode={isEditMode}
        onEdit={() => setIsEditMode(true)}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
      />

      {/* Content */}
      <div className="flex gap-9">
        {/* Category Dropdowns */}
        <CategoryComponent
          isEditMode={isEditMode}
          data={data}
          categories={dummyData.dropdownOptions.categories}
          subCategories={dummyData.dropdownOptions.subCategories}
          offers={dummyData.dropdownOptions.offers}
          onChange={handleFieldChange}
        />

        {/* Pricing */}
        <PricingComponent
          isEditMode={isEditMode}
          pricing={data.pricing}
          taxes={data.taxes}
          charges={data.charges}
          onChange={handleFieldChange}
        />
      </div>

      {/* Other Components */}
      <FoodTypeComponent
        isEditMode={isEditMode}
        selectedType={data.type}
        onTypeChange={(type) => handleFieldChange("type", type)}
      />

      <ServiceTypeComponent serviceTypes={data.serviceType || []} />

      <DishDetailsComponent
        isEditMode={isEditMode}
        details={data.dishDetails || {}}
        onChange={(field, value) => {
          const [parentField, childField] = field.split(".");
          setData((prev) => ({
            ...prev,
            [parentField]: {
              ...prev[parentField],
              [childField]: value,
            },
          }));
        }}
      />

      <ItemDescriptionComponent
        isEditMode={isEditMode}
        description={data.description}
        onChange={handleFieldChange}
      />

      <ImagesComponent
        isEditMode={isEditMode}
        images={data.images || [null, null, null]}
        video={data.video || null}
        onImageChange={(index, file) => {
          setData((prev) => {
            const updatedImages = [...(prev.images || [null, null, null])];
            updatedImages[index] = file;
            return { ...prev, images: updatedImages };
          });
        }}
        onVideoChange={(file) => {
          setData((prev) => ({
            ...prev,
            video: file,
          }));
        }}
      />

      {/* Save/Cancel */}
      {isEditMode && (
        <ActionButtonsComponent onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default RightPanel;
