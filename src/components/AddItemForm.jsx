import React, { useState } from "react"
import { X } from "lucide-react"

const AddItemForm = ({ isOpen, onClose, dropdownOptions = {} }) => {
  const initialFormState = {
    name: "",
    type: "Veg",
    category: "",
    subCategory: "",
    offer: "No Offer",
    serviceType: [],
    pricing: "",
    taxes: "5% GST",
    charges: "No Extra Charge",
    description: "",
    dishDetails: {
      servingInfo: "",
      calorieCount: "",
      portionSize: "",
      preparationTime: "",
    },
  }

  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})

  // Destructure dropdownOptions with default values
  const {
    foodTypes = ["Veg", "Non-Veg", "Egg"],
    categories = [],
    subCategories = [],
    offers = ["No Offer"],
    serviceTypes = [],
  } = dropdownOptions

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleServiceTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: prev.serviceType.includes(type)
        ? prev.serviceType.filter((t) => t !== type)
        : [...prev.serviceType, type],
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.subCategory) newErrors.subCategory = "Subcategory is required"
    if (!formData.pricing) newErrors.pricing = "Price is required"
    if (formData.serviceType.length === 0) newErrors.serviceType = "Select at least one service type"
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length === 0) {
      // Handle form submission here
      console.log("Form submitted:", formData)
      onClose()
      setFormData(initialFormState)
    } else {
      setErrors(newErrors)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Add New Item</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Item name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  {foodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category and Subcategory */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Subcategory</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </select>
                {errors.subCategory && <p className="text-red-500 text-sm mt-1">{errors.subCategory}</p>}
              </div>
            </div>

            {/* Pricing and Offers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  name="pricing"
                  value={formData.pricing}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter price"
                />
                {errors.pricing && <p className="text-red-500 text-sm mt-1">{errors.pricing}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Offer</label>
                <select
                  name="offer"
                  value={formData.offer}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  {offers.map((offer) => (
                    <option key={offer} value={offer}>
                      {offer}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Service Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Types</label>
              <div className="flex gap-4">
                {serviceTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.serviceType.includes(type)}
                      onChange={() => handleServiceTypeChange(type)}
                      className="rounded border-gray-300 text-blue-600 mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
              {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Item description"
              />
            </div>

            {/* Dish Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Serving Info</label>
                <input
                  type="text"
                  name="dishDetails.servingInfo"
                  value={formData.dishDetails.servingInfo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="e.g., 2 Pieces"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Calorie Count</label>
                <input
                  type="text"
                  name="dishDetails.calorieCount"
                  value={formData.dishDetails.calorieCount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="e.g., 250 kcal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Portion Size</label>
                <input
                  type="text"
                  name="dishDetails.portionSize"
                  value={formData.dishDetails.portionSize}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="e.g., Medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Preparation Time</label>
                <input
                  type="text"
                  name="dishDetails.preparationTime"
                  value={formData.dishDetails.preparationTime}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="e.g., 15 mins"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddItemForm

