



import { useState } from "react"
import { Plus, Minus } from "lucide-react"

// Simulating the shadcn/ui components
const Button = ({ children, onClick, variant, size, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded ${
      variant === "outline"
        ? "border border-gray-300"
        : variant === "destructive"
        ? "bg-red-500 text-white"
        : "bg-blue-500 text-white"
    } ${size === "sm" ? "text-sm" : ""} ${className}`}
  >
    {children}
  </button>
)

const Input = ({ id, value, onChange, placeholder, type = "text", min, step }) => (
  <input
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    min={min}
    step={step}
    className="w-full px-3 py-2 border border-gray-300 rounded"
  />
)

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
)


const items = [
  {
    id: 1,
    name: "Paneer Tikka",
    category: "Starters",
    subCategory: "Veg Starters",
    type: "Veg",
    description: "Soft paneer marinated in spices and grilled to perfection.",
  },
  {
    id: 2,
    name: "Veg Spring Rolls",
    category: "Starters",
    subCategory: "Veg Starters",
    type: "Veg",
    description: "Crispy rolls stuffed with fresh vegetables.",
  },
  {
    id: 4,
    name: "Hara Bhara Kebab",
    category: "Appetizers",
    subCategory: "Veg Appetizers",
    type: "Veg",
    description: "Delicious kebabs made from spinach and peas.",
  },
  {
    id: 9,
    name: "Chicken Lollipop",
    category: "Appetizers",
    subCategory: "Non-Veg Appetizers",
    type: "Non-Veg",
    description: "Chicken wings shaped like a lollipop and fried crisp.",
  },
  {
    id: 10,
    name: "Mutton Seekh Kebab",
    category: "Appetizers",
    subCategory: "Non-Veg Appetizers",
    type: "Non-Veg",
    description: "Spicy ground mutton skewers cooked on a grill.",
  },
]


const CreateComboForm = ({ isOpen, onClose }) => {
  const [selectedItems, setSelectedItems] = useState([])
  const [comboName, setComboName] = useState("")
  const [comboPrice, setComboPrice] = useState("")
  const [error, setError] = useState("")

  const handleAddItem = (item) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const handleRemoveItem = (id) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== id))
  }

  const handleQuantityChange = (id, delta) => {
    setSelectedItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)))
  }

  const handleSubmit = () => {
    if (!comboName.trim()) {
      setError("Please enter a combo name")
      return
    }
    if (!comboPrice.trim() || isNaN(Number(comboPrice))) {
      setError("Please enter a valid combo price")
      return
    }
    if (selectedItems.length === 0) {
      setError("Please select at least one item for the combo")
      return
    }

    const combo = {
      name: comboName,
      price: Number(comboPrice),
      items: selectedItems,
    }

    console.log("Saved combo:", combo)
    // Reset form
    setComboName("")
    setComboPrice("")
    setSelectedItems([])
    setError("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 w-screen bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white   mt-20 p-6 rounded-lg w-full max-w-4xl">
        <div className="mb-4  mt-32 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Item</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Subcategory</th>
                <th className="border p-2">Food Type</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border">
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.category}</td>
                  <td className="border p-2">{item.subCategory}</td>
                  <td className="border p-2">{item.type}</td>
                  <td className="border p-2">{item.description}</td>
                  <td className="border p-2">
                    <Button variant="outline" size="sm" onClick={() => handleAddItem(item)}>
                      Add
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-xl font-bold mt-4">Creat Combo Items</h3>

        <div className="mb-4 space-y-2">
          <Label htmlFor="comboName">Combo Name</Label>
          <Input
            id="comboName"
            value={comboName}
            onChange={(e) => setComboName(e.target.value)}
            placeholder="Enter combo name"
          />
        </div>

        <div className="mb-4 space-y-2">
          <Label htmlFor="comboPrice">Combo Price</Label>
          <Input
            id="comboPrice"
            value={comboPrice}
            onChange={(e) => setComboPrice(e.target.value)}
            placeholder="Enter combo price"
            type="number"
            min="0"
            step="0.01"
          />
        </div>

        <h3 className="text-xl font-bold mt-4">Selected Combo Items</h3>
        {selectedItems.length > 0 ? (
          <div className="overflow-x-auto max-h-60 overflow-y-auto mt-2">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Item</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((item) => (
                  <tr key={item.id} className="border">
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2 flex items-center justify-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.id, -1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      {item.quantity}
                      <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.id, 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="border p-2">
                      <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(item.id)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-2">No items selected</p>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Combo</Button>
        </div>
      </div>
    </div>
  )
}

export default CreateComboForm
