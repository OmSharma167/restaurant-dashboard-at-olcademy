import { useState } from "react"
import { FiX, FiPlus, FiMinus } from "react-icons/fi"

const CreateComboForm = ({ isOpen, onClose, categories }) => {
  const [comboName, setComboName] = useState("")
  const [comboPrice, setComboPrice] = useState("")
  const [selectedItems, setSelectedItems] = useState([])

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
  }

  const handleRemoveItem = (index) => {
    const newItems = [...selectedItems]
    newItems.splice(index, 1)
    setSelectedItems(newItems)
  }

  const handleQuantityChange = (index, change) => {
    const newItems = [...selectedItems]
    newItems[index].quantity = Math.max(1, newItems[index].quantity + change)
    setSelectedItems(newItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the combo data to your backend
    console.log("Combo created:", { name: comboName, price: comboPrice, items: selectedItems })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Create Combo</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="comboName" className="block text-sm font-medium text-gray-700">
            Combo Name
          </label>
          <input
            type="text"
            id="comboName"
            value={comboName}
            onChange={(e) => setComboName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="comboPrice" className="block text-sm font-medium text-gray-700">
            Combo Price
          </label>
          <input
            type="number"
            id="comboPrice"
            value={comboPrice}
            onChange={(e) => setComboPrice(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Select Items</h3>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <div key={category.name}>
                <h4 className="font-medium text-gray-600 mb-2">{category.name}</h4>
                {category.subcategories?.map((sub) => (
                  <div key={sub.name}>
                    {sub.items?.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleAddItem(item)}
                        className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Selected Items</h3>
          {selectedItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b">
              <span>{item.name}</span>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(index, -1)}
                  className="p-1 bg-gray-200 rounded-full mr-2"
                >
                  <FiMinus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(index, 1)}
                  className="p-1 bg-gray-200 rounded-full ml-2"
                >
                  <FiPlus size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          >
            Create Combo
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateComboForm

