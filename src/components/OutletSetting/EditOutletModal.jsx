// import React, { useState } from "react";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaSave } from "react-icons/fa";

// const EditOutletModal = ({ outlet, onClose, onEdit }) => {
//   const [editedOutlet, setEditedOutlet] = useState(outlet);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedOutlet((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (!editedOutlet.name || !editedOutlet.type || !editedOutlet.status) {
//       alert("Please fill in all required fields");
//       return;
//     }
//     onEdit(editedOutlet);
//   };

//   return (
//     <div className="fixed mt-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <div className="flex justify-between items-center border-b pb-2 mb-4">
//           <h2 className="text-xl font-semibold">Edit Outlet Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <AiOutlineClose size={24} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={editedOutlet.name}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Type</label>
//             <select
//               name="type"
//               value={editedOutlet.type}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//             >
//               <option value="">Select Outlet Type</option>
//               <option value="Dine-in">Dine-in</option>
//               <option value="Takeaway">Takeaway</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Status</label>
//             <select
//               name="status"
//               value={editedOutlet.status}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//             >
//               <option value="">Select Outlet Status</option>
//               <option value="Open">Open</option>
//               <option value="Closed">Closed</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Location</label>
//             <input
//               type="text"
//               name="location"
//               value={editedOutlet.location}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Manager</label>
//             <input
//               type="text"
//               name="manager"
//               value={editedOutlet.manager}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Contact</label>
//             <input
//               type="text"
//               name="contactInfo"
//               value={editedOutlet.contactInfo}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//             />
//           </div>
//         </div>

//         <div className="mt-6 flex justify-end space-x-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700"
//           >
//             <FaSave /> <span>Save Changes</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditOutletModal;



import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSave } from "react-icons/fa";

const EditOutletModal = ({ outlet, onClose, onEdit }) => {
  const [editedOutlet, setEditedOutlet] = useState(outlet);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOutlet((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!editedOutlet.name || !editedOutlet.type || !editedOutlet.status) {
      setError("Please fill in all required fields (Name, Type, Status)");
      return;
    }
    setError("");
    onEdit(editedOutlet);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Outlet Details
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
              value={editedOutlet.name}
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
              value={editedOutlet.type}
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
              value={editedOutlet.status}
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
              value={editedOutlet.location}
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
              value={editedOutlet.manager}
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
              value={editedOutlet.contactInfo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
          >
            <FaSave /> <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOutletModal;