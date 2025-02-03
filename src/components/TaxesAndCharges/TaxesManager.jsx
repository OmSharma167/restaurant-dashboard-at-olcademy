import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const initialTaxes = [
  { _id: "1", name: "GST", rate: 5, isApplicable: true, isDefault: false },
  { _id: "2", name: "Service Tax", rate: 2.5, isApplicable: false, isDefault: false },
  { _id: "3", name: "Local Municipal Tax", rate: 1, isApplicable: false, isDefault: false },
];

function TaxesManager() {
  const [taxes, setTaxes] = useState(initialTaxes);
  const [newTax, setNewTax] = useState({ name: "", rate: 0 });
  const [editingTaxId, setEditingTaxId] = useState(null);
  const [error, setError] = useState(null);

  const handleAddTax = () => {
    if (!newTax.name || newTax.rate <= 0) {
      setError("Please enter a valid tax name and rate.");
      return;
    }
    const _id = Date.now().toString();
    setTaxes([...taxes, { _id, ...newTax, isApplicable: true, isDefault: false }]);
    setNewTax({ name: "", rate: 0 });
    setEditingTaxId(null);
    setError(null);
  };

  const handleEditTax = (_id) => {
    const taxToEdit = taxes.find((tax) => tax._id === _id);
    if (taxToEdit && !taxToEdit.isDefault) {
      setNewTax({ name: taxToEdit.name, rate: taxToEdit.rate });
      setEditingTaxId(_id);
      setError(null);
    } else {
      setError("Default taxes cannot be edited.");
    }
  };

  const handleUpdateTax = () => {
    if (editingTaxId) {
      setTaxes(
        taxes.map((tax) =>
          tax._id === editingTaxId ? { ...tax, name: newTax.name, rate: newTax.rate } : tax
        )
      );
      setEditingTaxId(null);
      setNewTax({ name: "", rate: 0 });
      setError(null);
    }
  };

  const handleDeleteTax = (_id) => {
    const taxToDelete = taxes.find((tax) => tax._id === _id);
    if (taxToDelete?.isDefault) {
      setError("Default taxes cannot be deleted.");
      return;
    }
    setTaxes(taxes.filter((tax) => tax._id !== _id));
  };

  const handleToggleTax = (_id) => {
    setTaxes(
      taxes.map((tax) =>
        tax._id === _id && !tax.isDefault ? { ...tax, isApplicable: !tax.isApplicable } : tax
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        {error && <p className="text-red-500">{error}</p>}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">{editingTaxId ? "Edit Tax" : "Add New Tax"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-medium">Tax Name</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newTax.name}
                onChange={(e) => setNewTax({ ...newTax, name: e.target.value })}
                placeholder="Enter tax name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Tax Rate (%)</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="number"
                value={newTax.rate}
                onChange={(e) => setNewTax({ ...newTax, rate: parseFloat(e.target.value) })}
                placeholder="Enter tax rate"
                required
              />
            </div>
          </div>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={editingTaxId ? handleUpdateTax : handleAddTax}
          >
            {editingTaxId ? "Update Tax" : "Add Tax"}
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Rate (%)</th>
              <th className="px-4 py-2 text-left font-medium">Applicable</th>
              <th className="px-4 py-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((tax) => (
              <tr key={tax._id} className="border-t border-gray-200">
                <td className="px-4 py-2">{tax.name}</td>
                <td className="px-4 py-2">{tax.rate}%</td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={tax.isApplicable}
                    onChange={() => handleToggleTax(tax._id)}
                    className="h-4 w-4 cursor-pointer"
                    disabled={tax.isDefault}
                  />
                </td>
                <td className="px-4 py-2 flex">
                  <button
                    className={`p-1 text-gray-600 hover:text-gray-900 mr-2 ${
                      tax.isDefault ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleEditTax(tax._id)}
                    disabled={tax.isDefault}
                  >
                    <FiEdit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    className={`p-1 text-gray-600 hover:text-gray-900 ${
                      tax.isDefault ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleDeleteTax(tax._id)}
                    disabled={tax.isDefault}
                  >
                    <FiTrash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaxesManager;
