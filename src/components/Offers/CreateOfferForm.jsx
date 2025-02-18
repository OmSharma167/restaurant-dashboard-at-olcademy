// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// function CreateOfferForm({ onSave, categories, subCategories, items }) {
//   const [name, setName] = useState("");
//   const [code, setCode] = useState("");
//   const [offerType, setOfferType] = useState("percentage");
//   const [percentage, setPercentage] = useState("");
//   const [fixedAmount, setFixedAmount] = useState("");
//   const [buyX, setBuyX] = useState("");
//   const [getY, setGetY] = useState("");
//   const [bundlePrice, setBundlePrice] = useState("");
//   const [scope, setScope] = useState("item");
//   const [categoryName, setCategoryName] = useState("");
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [selectedItemIds, setSelectedItemIds] = useState([]);

//   // New state for offers dates
//   const [offersStartDate, setOffersStartDate] = useState("");
//   const [offersEndDate, setOffersEndDate] = useState("");

//   // New state for image upload
//   const [image, setImage] = useState(null);

//   // Automatically set scope to 'item' for bundle offers
//   useEffect(() => {
//     if (offerType === "bundle") {
//       setScope("item");
//     }
//   }, [offerType]);

//   const handleSave = () => {
//     // Basic validation
//     if (!name || !code) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const newOffer = {
//       id: Date.now().toString(),
//       name,
//       code,
//       offerType,
//       scope,
//       categoryName: scope === "category" ? categoryName : null,
//       subCategoryName: scope === "subcategory" ? subCategoryName : null,
//       itemIds: scope === "item" ? selectedItemIds : [],
//       active: true,
//       validUntil: "2024-12-31",
//       offersStartDate, // New field
//       offersEndDate, // New field
//       image, // New field for uploaded image
//       // Offer-type specific fields
//       ...(offerType === "percentage" && { percentage: parseFloat(percentage) }),
//       ...(offerType === "fixed" && { fixedAmount: parseFloat(fixedAmount) }),
//       ...(offerType === "buyXgetY" && {
//         buyX: parseInt(buyX, 10),
//         getY: parseInt(getY, 10),
//       }),
//       ...(offerType === "bundle" && {
//         bundlePrice: parseFloat(bundlePrice),
//         bundledItems: selectedItemIds,
//       }),
//     };

//     onSave(newOffer);

//     // Reset form
//     setName("");
//     setCode("");
//     setOfferType("percentage");
//     setPercentage("");
//     setFixedAmount("");
//     setBuyX("");
//     setGetY("");
//     setBundlePrice("");
//     setScope("item");
//     setCategoryName("");
//     setSubCategoryName("");
//     setSelectedItemIds([]);
//     setOffersStartDate(""); // Reset field
//     setOffersEndDate(""); // Reset field
//     setImage(null); // Reset image
//   };

//   const handleItemCheckbox = (e) => {
//     const val = parseInt(e.target.value, 10);
//     setSelectedItemIds((prev) =>
//       prev.includes(val) ? prev.filter((id) => id !== val) : [...prev, val]
//     );
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file)); // Create a URL for the image
//     }
//   };

//   return (
//     <motion.div
//       className="border p-4 rounded shadow-md bg-white"
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       <h2 className="text-xl font-bold mb-4 text-gray-800">
//         Create a New Offer
//       </h2>
//       <div className="space-y-3">
//         {/* Name and Code Inputs */}
//         <div>
//           <label className="block font-semibold text-gray-700">
//             Offer Name
//           </label>
//           <input
//             className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="e.g., Summer Special"
//           />
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700">
//             Offer Code
//           </label>
//           <input
//             className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             placeholder="e.g., SUMMER24"
//           />
//         </div>

//         {/* Image Upload Section */}
//         <div>
//           <label className="block font-semibold text-gray-700">
//             Upload Offer Image
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//             onChange={handleImageChange}
//           />
//           {image && (
//             <img
//               src={image}
//               alt="Offer Preview"
//               className="mt-2 h-32 w-32 object-cover"
//             />
//           )}
//         </div>

//         {/* Offer Type Dropdown */}
//         <div>
//           <label className="block font-semibold text-gray-700">
//             Offer Type
//           </label>
//           <select
//             className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//             value={offerType}
//             onChange={(e) => setOfferType(e.target.value)}
//           >
//             <option value="percentage">Percentage Discount</option>
//             <option value="fixed">Fixed Discount</option>
//             <option value="bogo">BOGO (Buy One Get One)</option>
//             <option value="buyXgetY">Buy X Get Y Free</option>
//             <option value="bundle">Bundled Offer</option>
//           </select>
//         </div>

//         {/* Percentage Discount */}
//         {offerType === "percentage" && (
//           <div>
//             <label className="block font-semibold text-gray-700">
//               Discount Percentage
//             </label>
//             <input
//               type="number"
//               className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//               value={percentage}
//               onChange={(e) => setPercentage(e.target.value)}
//               placeholder="e.g., 20"
//               min="0"
//               max="100"
//             />
//           </div>
//         )}

//         {/* Fixed Discount */}
//         {offerType === "fixed" && (
//           <div>
//             <label className="block font-semibold text-gray-700">
//               Fixed Amount ($)
//             </label>
//             <input
//               type="number"
//               className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//               value={fixedAmount}
//               onChange={(e) => setFixedAmount(e.target.value)}
//               placeholder="e.g., 5"
//               min="0"
//             />
//           </div>
//         )}

//         {/* Buy X Get Y Free */}
//         {offerType === "buyXgetY" && (
//           <div className="space-y-2">
//             <div>
//               <label className="block font-semibold text-gray-700">
//                 Buy Quantity (X)
//               </label>
//               <input
//                 type="number"
//                 className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//                 value={buyX}
//                 onChange={(e) => setBuyX(e.target.value)}
//                 placeholder="e.g., 2"
//                 min="1"
//               />
//             </div>
//             <div>
//               <label className="block font-semibold text-gray-700">
//                 Get Free Quantity (Y)
//               </label>
//               <input
//                 type="number"
//                 className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//                 value={getY}
//                 onChange={(e) => setGetY(e.target.value)}
//                 placeholder="e.g., 1"
//                 min="1"
//               />
//             </div>
//           </div>
//         )}

//         {/* Bundle Offer */}
//         {offerType === "bundle" && (
//           <div>
//             <label className="block font-semibold text-gray-700">
//               Bundle Price ($)
//             </label>
//             <input
//               type="number"
//               className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//               value={bundlePrice}
//               onChange={(e) => setBundlePrice(e.target.value)}
//               placeholder="e.g., 15"
//               min="0"
//             />
//           </div>
//         )}

//         {/* Scope Selection (hidden for bundles) */}
//         {offerType !== "bundle" && (
//           <div>
//             <label className="block font-semibold text-gray-700">Scope</label>
//             <select
//               className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//               value={scope}
//               onChange={(e) => setScope(e.target.value)}
//             >
//               <option value="item">Item</option>
//               <option value="subcategory">Subcategory</option>
//               <option value="category">Category</option>
//             </select>
//           </div>
//         )}

//         {/* Category/Subcategory/Item Selection */}
//         {scope === "category" && (
//           <div>
//             <label className="block font-semibold text-gray-700">
//               Select Category
//             </label>
//             <select
//               className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//               value={categoryName}
//               onChange={(e) => setCategoryName(e.target.value)}
//             >
//               <option value="">-- Select --</option>
//               {categories.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {scope === "subcategory" && (
//           <div>
//             <label className="block font-semibold text-gray-700">
//               Select Subcategory
//             </label>
//             <select
//               className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//               value={subCategoryName}
//               onChange={(e) => setSubCategoryName(e.target.value)}
//             >
//               <option value="">-- Select --</option>
//               {subCategories.map((sub) => (
//                 <option key={sub} value={sub}>
//                   {sub}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {(scope === "item" || offerType === "bundle") && (
//           <div>
//             <label className="block font-semibold text-gray-700">
//               {offerType === "bundle"
//                 ? "Select Items for Bundle"
//                 : "Select Items"}
//             </label>
//             <div className="max-h-32 overflow-auto border p-2 rounded">
//               {items.map((itm) => (
//                 <label key={itm.id} className="block text-gray-600">
//                   <input
//                     type="checkbox"
//                     value={itm.id}
//                     checked={selectedItemIds.includes(itm.id)}
//                     onChange={handleItemCheckbox}
//                   />
//                   <span className="ml-2">{itm.name}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Offers Start and End Date */}
//         <div>
//           <label className="block font-semibold text-gray-700">
//             Offers Start Date
//           </label>
//           <input
//             type="date"
//             className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//             value={offersStartDate}
//             onChange={(e) => setOffersStartDate(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700">
//             Offers End Date
//           </label>
//           <input
//             type="date"
//             className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
//             value={offersEndDate}
//             onChange={(e) => setOffersEndDate(e.target.value)}
//           />
//         </div>

//         <button
//           className="mt-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors"
//           onClick={handleSave}
//         >
//           Save Offer
//         </button>
//       </div>
//     </motion.div>
//   );
// }

// export default CreateOfferForm;










import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function CreateOfferForm({ onSave, categories, subCategories, items }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [offerType, setOfferType] = useState("percentage");
  const [percentage, setPercentage] = useState("");
  const [fixedAmount, setFixedAmount] = useState("");
  const [buyX, setBuyX] = useState("");
  const [getY, setGetY] = useState("");
  const [bundlePrice, setBundlePrice] = useState("");
  const [scope, setScope] = useState("item");
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  // New state for offers dates
  const [offersStartDate, setOffersStartDate] = useState("");
  const [offersEndDate, setOffersEndDate] = useState("");

  // New state for image upload
  const [image, setImage] = useState(null);

  // New state for offer applicability (Takeaway, Dining, Both)
  const [applicability, setApplicability] = useState("both");

  // Automatically set scope to 'item' for bundle offers
  useEffect(() => {
    if (offerType === "bundle") {
      setScope("item");
    }
  }, [offerType]);

  const handleSave = () => {
    // Basic validation
    if (!name || !code) {
      alert("Please fill in all required fields.");
      return;
    }

    const newOffer = {
      id: Date.now().toString(),
      name,
      code,
      offerType,
      scope,
      categoryName: scope === "category" ? categoryName : null,
      subCategoryName: scope === "subcategory" ? subCategoryName : null,
      itemIds: scope === "item" ? selectedItemIds : [],
      active: true,
      validUntil: "2024-12-31",
      offersStartDate, // New field
      offersEndDate, // New field
      image, // New field for uploaded image
      applicability, // New field for offer applicability
      // Offer-type specific fields
      ...(offerType === "percentage" && { percentage: parseFloat(percentage) }),
      ...(offerType === "fixed" && { fixedAmount: parseFloat(fixedAmount) }),
      ...(offerType === "buyXgetY" && {
        buyX: parseInt(buyX, 10),
        getY: parseInt(getY, 10),
      }),
      ...(offerType === "bundle" && {
        bundlePrice: parseFloat(bundlePrice),
        bundledItems: selectedItemIds,
      }),
    };

    onSave(newOffer);

    // Reset form
    setName("");
    setCode("");
    setOfferType("percentage");
    setPercentage("");
    setFixedAmount("");
    setBuyX("");
    setGetY("");
    setBundlePrice("");
    setScope("item");
    setCategoryName("");
    setSubCategoryName("");
    setSelectedItemIds([]);
    setOffersStartDate(""); // Reset field
    setOffersEndDate(""); // Reset field
    setImage(null); // Reset image
    setApplicability("both"); // Reset applicability
  };

  const handleItemCheckbox = (e) => {
    const val = parseInt(e.target.value, 10);
    setSelectedItemIds((prev) =>
      prev.includes(val) ? prev.filter((id) => id !== val) : [...prev, val]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create a URL for the image
    }
  };

  return (
    <motion.div
      className="border p-4 rounded shadow-md bg-white"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Create a New Offer
      </h2>
      <div className="space-y-3">
        {/* Name and Code Inputs */}
        <div>
          <label className="block font-semibold text-gray-700">
            Offer Name
          </label>
          <input
            className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Summer Special"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Offer Code
          </label>
          <input
            className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g., SUMMER24"
          />
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block font-semibold text-gray-700">
            Upload Offer Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
            onChange={handleImageChange}
          />
          {image && (
            <img
              src={image}
              alt="Offer Preview"
              className="mt-2 h-32 w-32 object-cover"
            />
          )}
        </div>

        {/* Offer Type Dropdown */}
        <div>
          <label className="block font-semibold text-gray-700">
            Offer Type
          </label>
          <select
            className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
            value={offerType}
            onChange={(e) => setOfferType(e.target.value)}
          >
            <option value="percentage">Percentage Discount</option>
            <option value="fixed">Fixed Discount</option>
            <option value="bogo">BOGO (Buy One Get One)</option>
            <option value="buyXgetY">Buy X Get Y Free</option>
            <option value="bundle">Bundled Offer</option>
          </select>
        </div>

        {/* Percentage Discount */}
        {offerType === "percentage" && (
          <div>
            <label className="block font-semibold text-gray-700">
              Discount Percentage
            </label>
            <input
              type="number"
              className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="e.g., 20"
              min="0"
              max="100"
            />
          </div>
        )}

        {/* Fixed Discount */}
        {offerType === "fixed" && (
          <div>
            <label className="block font-semibold text-gray-700">
              Fixed Amount ($)
            </label>
            <input
              type="number"
              className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
              value={fixedAmount}
              onChange={(e) => setFixedAmount(e.target.value)}
              placeholder="e.g., 5"
              min="0"
            />
          </div>
        )}

        {/* Buy X Get Y Free */}
        {offerType === "buyXgetY" && (
          <div className="space-y-2">
            <div>
              <label className="block font-semibold text-gray-700">
                Buy Quantity (X)
              </label>
              <input
                type="number"
                className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
                value={buyX}
                onChange={(e) => setBuyX(e.target.value)}
                placeholder="e.g., 2"
                min="1"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700">
                Get Free Quantity (Y)
              </label>
              <input
                type="number"
                className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
                value={getY}
                onChange={(e) => setGetY(e.target.value)}
                placeholder="e.g., 1"
                min="1"
              />
            </div>
          </div>
        )}

        {/* Bundle Offer */}
        {offerType === "bundle" && (
          <div>
            <label className="block font-semibold text-gray-700">
              Bundle Price ($)
            </label>
            <input
              type="number"
              className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
              value={bundlePrice}
              onChange={(e) => setBundlePrice(e.target.value)}
              placeholder="e.g., 15"
              min="0"
            />
          </div>
        )}

        {/* Scope Selection (hidden for bundles) */}
        {offerType !== "bundle" && (
          <div>
            <label className="block font-semibold text-gray-700">Scope</label>
            <select
              className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
            >
              <option value="item">Item</option>
              <option value="subcategory">Subcategory</option>
              <option value="category">Category</option>
            </select>
          </div>
        )}

        {/* Category/Subcategory/Item Selection */}
        {scope === "category" && (
          <div>
            <label className="block font-semibold text-gray-700">
              Select Category
            </label>
            <select
              className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            >
              <option value="">-- Select --</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        {scope === "subcategory" && (
          <div>
            <label className="block font-semibold text-gray-700">
              Select Subcategory
            </label>
            <select
              className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
            >
              <option value="">-- Select --</option>
              {subCategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        {(scope === "item" || offerType === "bundle") && (
          <div>
            <label className="block font-semibold text-gray-700">
              {offerType === "bundle"
                ? "Select Items for Bundle"
                : "Select Items"}
            </label>
            <div className="max-h-32 overflow-auto border p-2 rounded">
              {items.map((itm) => (
                <label key={itm.id} className="block text-gray-600">
                  <input
                    type="checkbox"
                    value={itm.id}
                    checked={selectedItemIds.includes(itm.id)}
                    onChange={handleItemCheckbox}
                  />
                  <span className="ml-2">{itm.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Offers Start and End Date */}
        <div>
          <label className="block font-semibold text-gray-700">
            Offers Start Date
          </label>
          <input
            type="date"
            className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
            value={offersStartDate}
            onChange={(e) => setOffersStartDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Offers End Date
          </label>
          <input
            type="date"
            className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
            value={offersEndDate}
            onChange={(e) => setOffersEndDate(e.target.value)}
          />
        </div>

        {/* Offer Applicability Section */}
        <div>
          <label className="block font-semibold text-gray-700">
            Offer Applicability
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="takeaway"
                checked={applicability === "takeaway"}
                onChange={(e) => setApplicability(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Takeaway</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="dining"
                checked={applicability === "dining"}
                onChange={(e) => setApplicability(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Dining</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="both"
                checked={applicability === "both"}
                onChange={(e) => setApplicability(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Both</span>
            </label>
          </div>
        </div>

        <button
          className="mt-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={handleSave}
        >
          Save Offer
        </button>
      </div>
    </motion.div>
  );
}

export default CreateOfferForm;
