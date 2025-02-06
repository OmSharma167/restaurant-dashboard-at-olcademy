import React, { useState } from "react";
import { FiEdit, FiTrash2, FiInfo } from "react-icons/fi";

const TAX_TYPES = {
  GST: "gst",
  STATE: "state",
  MUNICIPAL: "municipal",
  SERVICE: "service"
};

const APPLICABLE_FOR = {
  DINE_IN: "dineIn",
  DELIVERY: "delivery",
  TAKEAWAY: "takeaway",
  ALL: "all"
};

const initialTaxes = [
  {
    _id: "1",
    name: "GST - Regular",
    rate: 5,
    type: TAX_TYPES.GST,
    applicableFor: [APPLICABLE_FOR.ALL],
    isApplicable: true,
    isDefault: true,
    isCompulsory: true,
    calculationOrder: 1,
    effectiveFrom: "2024-01-01",
    effectiveTo: null,
    exemptions: []
  },
  {
    _id: "2",
    name: "GST - AC Dining",
    rate: 18,
    type: TAX_TYPES.GST,
    applicableFor: [APPLICABLE_FOR.DINE_IN],
    isApplicable: false,
    isDefault: true,
    isCompulsory: true,
    calculationOrder: 1,
    effectiveFrom: "2024-01-01",
    effectiveTo: null,
    exemptions: ["alcohol"]
  },
  {
    _id: "3",
    name: "Service Charge",
    rate: 10,
    type: TAX_TYPES.SERVICE,
    applicableFor: [APPLICABLE_FOR.DINE_IN],
    isApplicable: false,
    isDefault: false,
    isCompulsory: false,
    calculationOrder: 2,
    effectiveFrom: "2024-01-01",
    effectiveTo: null,
    exemptions: []
  },
  {
    _id: "4",
    name: "Municipal Tax",
    rate: 1,
    type: TAX_TYPES.MUNICIPAL,
    applicableFor: [APPLICABLE_FOR.ALL],
    isApplicable: false,
    isDefault: false,
    isCompulsory: false,
    calculationOrder: 3,
    effectiveFrom: "2024-01-01",
    effectiveTo: null,
    exemptions: []
  }
];

function TaxesManager() {
  const [taxes, setTaxes] = useState(initialTaxes);
  const [newTax, setNewTax] = useState({
    name: "",
    rate: 0,
    type: TAX_TYPES.GST,
    applicableFor: [APPLICABLE_FOR.ALL],
    effectiveFrom: new Date().toISOString().split('T')[0],
    effectiveTo: "",
    exemptions: []
  });
  const [editingTaxId, setEditingTaxId] = useState(null);
  const [error, setError] = useState(null);
  const [showExemptions, setShowExemptions] = useState(false);

  const handleAddTax = () => {
    if (!validateTaxInput()) return;

    const _id = Date.now().toString();
    const newTaxEntry = {
      _id,
      ...newTax,
      isApplicable: true,
      isDefault: false,
      isCompulsory: newTax.type === TAX_TYPES.GST,
      calculationOrder: getCalculationOrder(newTax.type)
    };

    setTaxes([...taxes, newTaxEntry]);
    resetForm();
  };

  const validateTaxInput = () => {
    if (!newTax.name || newTax.rate <= 0) {
      setError("Please enter a valid tax name and rate");
      return false;
    }
    if (!newTax.effectiveFrom) {
      setError("Please enter an effective from date");
      return false;
    }
    if (newTax.effectiveTo && new Date(newTax.effectiveFrom) > new Date(newTax.effectiveTo)) {
      setError("Effective from date must be before effective to date");
      return false;
    }
    return true;
  };

  const getCalculationOrder = (type) => {
    switch (type) {
      case TAX_TYPES.GST:
        return 1;
      case TAX_TYPES.SERVICE:
        return 2;
      case TAX_TYPES.STATE:
        return 3;
      case TAX_TYPES.MUNICIPAL:
        return 4;
      default:
        return 5;
    }
  };

  const handleEditTax = (_id) => {
    const taxToEdit = taxes.find((tax) => tax._id === _id);
    if (taxToEdit && !taxToEdit.isDefault) {
      setNewTax({
        name: taxToEdit.name,
        rate: taxToEdit.rate,
        type: taxToEdit.type,
        applicableFor: taxToEdit.applicableFor,
        effectiveFrom: taxToEdit.effectiveFrom,
        effectiveTo: taxToEdit.effectiveTo || "",
        exemptions: taxToEdit.exemptions
      });
      setEditingTaxId(_id);
      setError(null);
    } else {
      setError("Default taxes cannot be edited");
    }
  };

  const handleUpdateTax = () => {
    if (!validateTaxInput()) return;

    setTaxes(
      taxes.map((tax) =>
        tax._id === editingTaxId
          ? {
              ...tax,
              ...newTax,
              calculationOrder: getCalculationOrder(newTax.type)
            }
          : tax
      )
    );
    resetForm();
  };

  const resetForm = () => {
    setNewTax({
      name: "",
      rate: 0,
      type: TAX_TYPES.GST,
      applicableFor: [APPLICABLE_FOR.ALL],
      effectiveFrom: new Date().toISOString().split('T')[0],
      effectiveTo: "",
      exemptions: []
    });
    setEditingTaxId(null);
    setError(null);
  };

  const handleDeleteTax = (_id) => {
    const taxToDelete = taxes.find((tax) => tax._id === _id);
    if (taxToDelete?.isDefault) {
      setError("Default taxes cannot be deleted");
      return;
    }
    setTaxes(taxes.filter((tax) => tax._id !== _id));
  };

  const handleToggleTax = (_id) => {
    setTaxes(
      taxes.map((tax) =>
        tax._id === _id && !tax.isCompulsory
          ? { ...tax, isApplicable: !tax.isApplicable }
          : tax
      )
    );
  };

  const handleExemptionChange = (exemption) => {
    const updatedExemptions = newTax.exemptions.includes(exemption)
      ? newTax.exemptions.filter(e => e !== exemption)
      : [...newTax.exemptions, exemption];
    setNewTax({ ...newTax, exemptions: updatedExemptions });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingTaxId ? "Edit Tax" : "Add New Tax"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
            
            <div>
              <label className="block mb-2 font-medium">Tax Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newTax.type}
                onChange={(e) => setNewTax({ ...newTax, type: e.target.value })}
              >
                <option value={TAX_TYPES.GST}>GST</option>
                <option value={TAX_TYPES.STATE}>State Tax</option>
                <option value={TAX_TYPES.MUNICIPAL}>Municipal Tax</option>
                <option value={TAX_TYPES.SERVICE}>Service Charge</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Applicable For</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newTax.applicableFor[0]}
                onChange={(e) => setNewTax({ ...newTax, applicableFor: [e.target.value] })}
              >
                <option value={APPLICABLE_FOR.ALL}>All Orders</option>
                <option value={APPLICABLE_FOR.DINE_IN}>Dine In Only</option>
                <option value={APPLICABLE_FOR.DELIVERY}>Delivery Only</option>
                <option value={APPLICABLE_FOR.TAKEAWAY}>Takeaway Only</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Effective From</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newTax.effectiveFrom}
                onChange={(e) => setNewTax({ ...newTax, effectiveFrom: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Effective To (Optional)</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newTax.effectiveTo}
                onChange={(e) => setNewTax({ ...newTax, effectiveTo: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4">
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 flex items-center"
              onClick={() => setShowExemptions(!showExemptions)}
            >
              <FiInfo className="mr-1" />
              {showExemptions ? "Hide Exemptions" : "Show Exemptions"}
            </button>
            
            {showExemptions && (
              <div className="mt-2 space-y-2">
                <label className="block font-medium">Tax Exemptions</label>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={newTax.exemptions.includes("alcohol")}
                      onChange={() => handleExemptionChange("alcohol")}
                    />
                    <span className="ml-2">Alcohol</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={newTax.exemptions.includes("basicFood")}
                      onChange={() => handleExemptionChange("basicFood")}
                    />
                    <span className="ml-2">Basic Food Items</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-start space-x-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={editingTaxId ? handleUpdateTax : handleAddTax}
            >
              {editingTaxId ? "Update Tax" : "Add Tax"}
            </button>
            {editingTaxId && (
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Type</th>
              <th className="px-4 py-2 text-left font-medium">Rate (%)</th>
              <th className="px-4 py-2 text-left font-medium">Applicable For</th>
              <th className="px-4 py-2 text-left font-medium">Status</th>
              <th className="px-4 py-2 text-left font-medium">Effective Period</th>
              <th className="px-4 py-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((tax) => (
              <tr key={tax._id} className="border-t border-gray-200">
                <td className="px-4 py-2">{tax.name}</td>
                <td className="px-4 py-2 capitalize">{tax.type}</td>
                <td className="px-4 py-2">{tax.rate}%</td>
                <td className="px-4 py-2 capitalize">
                  {tax.applicableFor.join(", ").replace(/_/g, " ")}
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={tax.isApplicable}
                    onChange={() => handleToggleTax(tax._id)}
                    className="h-4 w-4 cursor-pointer"
                    disabled={tax.isCompulsory}
                  />
                </td>
                <td className="px-4 py-2">
                  {tax.effectiveFrom}
                  {tax.effectiveTo ? ` to ${tax.effectiveTo}` : ""}
                </td>
                <td className="px-4 py-2 flex">
                  <button
                    className={`p-1 text-gray-600 hover:text-gray-900 mr-2 ${
                      tax.isDefault ? "opacity-50 cursor-not-allowed" : ""
                    }` }
                    onClick={() => handleEditTax(tax._id)}
                    disabled={tax.isDefault}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className={`p-1 text-red-600 hover:text-red-800 ${
                      tax.isDefault ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleDeleteTax(tax._id)}
                    disabled={tax.isDefault}
                  >
                    <FiTrash2 />
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
