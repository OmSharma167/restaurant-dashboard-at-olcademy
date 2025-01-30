import { useState } from "react"
import { FiX } from "react-icons/fi"

const AddSubcategoryForm = ({ isOpen, onClose, categories }) => {
  const [subcategoryName, setSubcategoryName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the subcategory data to your backend
    console.log("Subcategory added:", { name: subcategoryName, category: selectedCategory })
    // Reset form
    setSubcategoryName("")
    setSelectedCategory("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Add Subcategory</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Select Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="subcategoryName" className="block text-sm font-medium text-gray-700">
            Subcategory Name
          </label>
          <input
            type="text"
            id="subcategoryName"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          >
            Add Subcategory
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddSubcategoryForm

