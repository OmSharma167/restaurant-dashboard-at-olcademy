// import React, { useState } from "react";
// import { AiOutlineClose } from "react-icons/ai";

// const AddOutletModal = ({ onClose, onAdd }) => {
//   const [newOutlet, setNewOutlet] = useState({
//     name: "",
//     type: "",
//     status: "",
//     location: "",
//     manager: "",
//     contactInfo: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewOutlet((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (!newOutlet.name || !newOutlet.type || !newOutlet.status) {
//       alert("Please fill in all required fields");
//       return;
//     }
//     onAdd(newOutlet);
//   };

//   return (
//     <div className="fixed mt-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Add New Outlet</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <AiOutlineClose size={20} />
//           </button>
//         </div>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={newOutlet.name}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Type</label>
//             <select
//               name="type"
//               value={newOutlet.type}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Outlet Type</option>
//               <option value="Dine-in">Dine-in</option>
//               <option value="Takeaway">Takeaway</option>
//               <option value="Takeaway">Both</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-gray-700">Status</label>
//             <select
//               name="status"
//               value={newOutlet.status}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Outlet Status</option>
//               <option value="Open">Open</option>
//               <option value="Closed">Closed</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-gray-700">Location</label>
//             <input
//               type="text"
//               name="location"
//               value={newOutlet.location}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Manager</label>
//             <input
//               type="text"
//               name="manager"
//               value={newOutlet.manager}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Contact Info</label>
//             <input
//               type="text"
//               name="contactInfo"
//               value={newOutlet.contactInfo}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//         </div>
//         <div className="flex justify-end gap-2 mt-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Add Outlet
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddOutletModal;




import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AddOutletModal = ({ onClose, onAdd }) => {
  const [newOutlet, setNewOutlet] = useState({
    name: "",
    type: "",
    status: "",
    location: "",
    manager: "",
    contactInfo: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOutlet((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!newOutlet.name || !newOutlet.type || !newOutlet.status) {
      setError("Please fill in all required fields (Name, Type, Status)");
      return;
    }
    setError("");
    onAdd(newOutlet);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Outlet
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={newOutlet.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={newOutlet.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Outlet Type</option>
              <option value="Dine-in">Dine-in</option>
              <option value="Takeaway">Takeaway</option>
              <option value="Both">Both</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={newOutlet.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Outlet Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={newOutlet.location}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Manager
            </label>
            <input
              type="text"
              name="manager"
              value={newOutlet.manager}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Info
            </label>
            <input
              type="text"
              name="contactInfo"
              value={newOutlet.contactInfo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Outlet
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOutletModal;