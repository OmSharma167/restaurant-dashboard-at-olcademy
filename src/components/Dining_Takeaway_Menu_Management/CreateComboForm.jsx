
// import { useState, useEffect } from "react";
// import { Plus, Minus } from "lucide-react"
// import { X } from "lucide-react";

// // Simulating the shadcn/ui components
// const Button = ({ children, onClick, variant, size, className = "" }) => (
//   <button
//     onClick={onClick}
//     className={`px-4 py-2 rounded ${
//       variant === "outline"
//         ? "border border-gray-300"
//         : variant === "destructive"
//         ? "bg-red-500 text-white"
//         : "bg-blue-500 text-white"
//     } ${size === "sm" ? "text-sm" : ""} ${className}`}
//   >
//     {children}
//   </button>
// )

// const Input = ({ id, value, onChange, placeholder, type = "text", min, step }) => (
//   <input
//     id={id}
//     value={value}
//     onChange={onChange}
//     placeholder={placeholder}
//     type={type}
//     min={min}
//     step={step}
//     className="w-full px-3 py-2 border border-gray-300 rounded"
//   />
// )

// const Label = ({ htmlFor, children }) => (
//   <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
//     {children}
//   </label>
// )


// const items = [
//   {
//     id: 1,
//     name: "Paneer Tikka",
//     category: "Starters",
//     subCategory: "Veg Starters",
//     type: "Veg",
//     description: "Soft paneer marinated in spices and grilled to perfection.",
//   },
//   {
//     id: 2,
//     name: "Veg Spring Rolls",
//     category: "Starters",
//     subCategory: "Veg Starters",
//     type: "Veg",
//     description: "Crispy rolls stuffed with fresh vegetables.",
//   },
//   {
//     id: 4,
//     name: "Hara Bhara Kebab",
//     category: "Appetizers",
//     subCategory: "Veg Appetizers",
//     type: "Veg",
//     description: "Delicious kebabs made from spinach and peas.",
//   },
//   {
//     id: 9,
//     name: "Chicken Lollipop",
//     category: "Appetizers",
//     subCategory: "Non-Veg Appetizers",
//     type: "Non-Veg",
//     description: "Chicken wings shaped like a lollipop and fried crisp.",
//   },
//   {
//     id: 10,
//     name: "Mutton Seekh Kebab",
//     category: "Appetizers",
//     subCategory: "Non-Veg Appetizers",
//     type: "Non-Veg",
//     description: "Spicy ground mutton skewers cooked on a grill.",
//   },
// ]


// const CreateComboForm = ({ isOpen, onClose }) => {
//   const [selectedItems, setSelectedItems] = useState([])
//   const [comboName, setComboName] = useState("")
//   const [comboPrice, setComboPrice] = useState("")
//   const [error, setError] = useState("")

//   const handleAddItem = (item) => {
//     setSelectedItems((prev) => {
//       const existingItem = prev.find((i) => i.id === item.id)
//       if (existingItem) {
//         return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
//       }
//       return [...prev, { ...item, quantity: 1 }]
//     })
//   }

//   const handleRemoveItem = (id) => {
//     setSelectedItems((prev) => prev.filter((i) => i.id !== id))
//   }

//   const handleQuantityChange = (id, delta) => {
//     setSelectedItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)))
//   }

//   const handleSubmit = () => {
//     if (!comboName.trim()) {
//       setError("Please enter a combo name")
//       return
//     }
//     if (!comboPrice.trim() || isNaN(Number(comboPrice))) {
//       setError("Please enter a valid combo price")
//       return
//     }
//     if (selectedItems.length === 0) {
//       setError("Please select at least one item for the combo")
//       return
//     }



//     const combo = {
//       name: comboName,
//       price: Number(comboPrice),
//       items: selectedItems,
//     }

//     console.log("Saved combo:", combo)
//     // Reset form
//     setComboName("")
//     setComboPrice("")
//     setSelectedItems([])
//     setError("")
//     onClose()
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-opacity-50  items-center justify-center p-4 overflow-auto w-3/4  bg-white shadow-md border-l border-gray-200 overflow-y-auto ml-[38%]">
//       <div className="bg-white   p-6 rounded-lg w-full max-w-4xl">
//         <div className="mb-4  mt-8 overflow-x-auto">
//           {/* <h3 className="text-xl font-bold mt-4">Creat Combo Items</h3> */}
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800">Creat Combo Items</h2>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//               <X size={24} />
//             </button>
//           </div>


//         <div className="mb-4 space-y-2">
//           <Label htmlFor="comboName">Combo Name</Label>
//           <Input
//             id="comboName"
//             value={comboName}
//             onChange={(e) => setComboName(e.target.value)}
//             placeholder="Enter combo name"
//           />
//         </div>

//         <div className="mb-4 space-y-2">
//           <Label htmlFor="comboPrice">Combo Price</Label>
//           <Input
//             id="comboPrice"
//             value={comboPrice}
//             onChange={(e) => setComboPrice(e.target.value)}
//             placeholder="Enter combo price"
//             type="number"
//             min="0"
//             step="0.01"
//           />
//         </div>
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">ID</th>
//                 <th className="border p-2">Item</th>
//                 <th className="border p-2">Category</th>
//                 <th className="border p-2">Subcategory</th>
//                 <th className="border p-2">Food Type</th>
//                 <th className="border p-2">Description</th>
//                 <th className="border p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item) => (
//                 <tr key={item.id} className="border">
//                   <td className="border p-2">{item.id}</td>
//                   <td className="border p-2">{item.name}</td>
//                   <td className="border p-2">{item.category}</td>
//                   <td className="border p-2">{item.subCategory}</td>
//                   <td className="border p-2">{item.type}</td>
//                   <td className="border p-2">{item.description}</td>
//                   <td className="border p-2">
//                     <Button variant="outline" size="sm" onClick={() => handleAddItem(item)}>
//                       Add
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
        

//         <h3 className="text-xl font-bold mt-4">Selected Combo Items</h3>
//         {selectedItems.length > 0 ? (
//           <div className="overflow-x-auto max-h-60 overflow-y-auto mt-2">
//             <table className="w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border p-2">Item</th>
//                   <th className="border p-2">Quantity</th>
//                   <th className="border p-2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedItems.map((item) => (
//                   <tr key={item.id} className="border">
//                     <td className="border p-2">{item.name}</td>
//                     <td className="border p-2 flex items-center justify-center gap-2">
//                       <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.id, -1)}>
//                         <Minus className="h-4 w-4" />
//                       </Button>
//                       {item.quantity}
//                       <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.id, 1)}>
//                         <Plus className="h-4 w-4" />
//                       </Button>
//                     </td>
//                     <td className="border p-2">
//                       <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(item.id)}>
//                         Remove
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="mt-2">No items selected</p>
//         )}

//         {error && <p className="text-red-500 mt-2">{error}</p>}

//         <div className="mt-4 flex justify-end space-x-2">
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit}>Save Combo</Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CreateComboForm



import { useState, useEffect } from "react";
import { Plus, Minus, X } from "lucide-react";

// Simulated shadcn/ui components
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
);

const Input = ({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  step,
}) => (
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
);

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);

const CreateComboForm = ({ isOpen, onClose }) => {
  const [allItems, setAllItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [comboName, setComboName] = useState("");
  const [comboPrice, setComboPrice] = useState("");
  const [error, setError] = useState("");

  // Fetch items from the backend when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:4040/api/items");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setAllItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
        setError("Failed to load items. Please try again.");
      }
    };
    fetchItems();
  }, []);

  // Add an item to the selected items list
  const handleAddItem = (item) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find((i) => i._id === item._id);
      if (existingItem) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Remove an item from the selected items list
  const handleRemoveItem = (id) => {
    setSelectedItems((prev) => prev.filter((i) => i._id !== id));
  };

  // Adjust the quantity of a selected item
  const handleQuantityChange = (id, delta) => {
    setSelectedItems((prev) =>
      prev.map((i) =>
        i._id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
      )
    );
  };

  // Submit the combo to the backend
  const handleSubmit = async () => {
    if (!comboName.trim()) {
      setError("Please enter a combo name");
      return;
    }
    if (!comboPrice.trim() || isNaN(Number(comboPrice))) {
      setError("Please enter a valid combo price");
      return;
    }
    if (selectedItems.length === 0) {
      setError("Please select at least one item for the combo");
      return; 
    }

    const combo = {
      name: comboName,
      price: Number(comboPrice),
      items: selectedItems.map((item) => ({
        itemId: item._id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch("http://localhost:4040/api/combos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combo),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Combo created:", data);
        setComboName("");
        setComboPrice("");
        setSelectedItems([]);
        setError("");
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create combo");
      }
    } catch (error) {
      console.error("Error creating combo:", error);
      setError("Failed to create combo. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed mt-14 inset-0 bg-opacity-50  items-center justify-center p-4 overflow-auto  bg-white shadow-md border-l border-gray-200 overflow-y-auto ml-[38%]">
      <div className="bg-white   p-6 rounded-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Combo Items
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

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

        <table className="w-full border-collapse border border-gray-300 mb-6">
          <thead>
            <tr className="bg-gray-200">
              {/* <th className="border p-2">ID</th> */}
              <th className="border p-2">Item</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Subcategory</th>
              <th className="border p-2">Food Type</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item) => (
              <tr key={item._id} className="border">
                {/* <td className="border p-2">{item._id}</td> */}
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.categoryId?.name || "N/A"}</td>
                <td className="border p-2">
                  {item.subcategoryId?.name || "N/A"}
                </td>
                <td className="border p-2">{item.type}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddItem(item)}
                  >
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-xl font-bold mb-2">Selected Combo Items</h3>
        {selectedItems.length > 0 ? (
          <div className="overflow-x-auto max-h-60 overflow-y-auto mb-4">
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
                  <tr key={item._id} className="border">
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item._id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item._id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="border p-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mb-4 text-gray-600">No items selected</p>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Combo</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComboForm;