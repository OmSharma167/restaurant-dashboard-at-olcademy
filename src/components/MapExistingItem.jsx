import { useState } from "react"
import { FiLink, FiSearch, FiCheck, FiX } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { X} from "lucide-react";

const MapExistingItem = ({ isOpen, onClose, dropdownOptions = {} }) => {
  const navigate = useNavigate()

  const [isMapped, setIsMapped] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItems, setSelectedItems] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const [items, setItems] = useState([
    { id: 1, name: "Margherita Pizza", description: "Classic cheese and tomato pizza", category: "Main Course" },
    { id: 2, name: "Caesar Salad", description: "Fresh romaine lettuce with Caesar dressing", category: "Appetizers" },
    {
      id: 3,
      name: "Chocolate Brownie",
      description: "Rich chocolate brownie with vanilla ice cream",
      category: "Desserts",
    },
    { id: 4, name: "Cappuccino", description: "Espresso with steamed milk and foam", category: "Beverages" },
    { id: 5, name: "Garlic Bread", description: "Toasted bread with garlic butter", category: "Appetizers" },
  ])

  const handleActionClick = () => {
    setIsPopupOpen(true)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleItemSelect = (item) => {
    setSelectedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const closePopup = () => {
    setIsPopupOpen(false)
    setIsMapped(true)
  }

  

  return (
    <div className="mt-20 w-3/4  p-6 bg-white shadow-md border-l border-gray-200 overflow-y-auto ml-[38%]">
      

      <div className="mb-6 p-4 flex items-center space-x-4">
  <div className="relative flex-1">
    <input
      type="text"
      placeholder="Search items..."
      value={searchTerm}
      onChange={handleSearch}
      className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-gray-100 border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
    <FiSearch className="absolute left-3 top-3 text-gray-400" />
  </div>
  <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
    <X size={24} />
  </button>
</div>


      <div className="mb-6 max-h-96 overflow-y-auto space-y-2">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemSelect(item)}
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all hover:bg-blue-50 ${
              selectedItems.includes(item) ? "bg-blue-100" : "bg-gray-50"
            }`}
          >
            <div>
              <h3 className="font-medium text-gray-800 text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <span className="text-xs text-gray-500">{item.category}</span>
            </div>
            {selectedItems.includes(item) && <FiCheck className="text-blue-500" size={20} />}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-10 mt-10">
  <p className="text-sm text-gray-600">{selectedItems.length} item(s) selected</p>
  {!isPopupOpen && !isMapped && (
    <div className="flex gap-4">
      <button
        onClick={handleActionClick}
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
      >
        <FiLink />
        <span>Add Selected Items</span>
      </button>
      <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
    </div>
  )}
</div>


      {isMapped && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-96">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-green-600">Items Mapped Successfully!</h3>
              <button onClick={() => setIsMapped(false)} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            <ul className="list-disc list-inside mb-6 space-y-2">
              {selectedItems.map((item) => (
                <li key={item.id} className="text-gray-700">
                  {item.name}
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <button
                onClick={handleBackToHome}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapExistingItem
