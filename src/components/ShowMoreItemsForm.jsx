import { useState, useEffect } from "react";
import { FiX, FiSearch, FiEye, FiEdit } from "react-icons/fi";

const ShowMoreItemsForm = ({ isOpen, onClose, categories, onSaveGroup }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupName, setGroupName] = useState("");
  const [savedGroups, setSavedGroups] = useState([]);
  const [viewMode, setViewMode] = useState("create"); // 'create' or 'view'

  // Flatten all items from all categories and subcategories for easier search
  const allItems = categories.flatMap(
    (category) =>
      category.subcategories?.flatMap(
        (sub) =>
          sub.items?.map((item) => ({
            ...item,
            categoryName: category.name,
            subcategoryName: sub.name,
          })) || []
      ) || []
  );

  // Load saved groups on component mount
  useEffect(() => {
    const storedGroups = localStorage.getItem("featuredItemsGroups");
    if (storedGroups) {
      setSavedGroups(JSON.parse(storedGroups));
    }
  }, []);

  // Filter items based on search term
  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemSelect = (item) => {
    // Check if item is already selected
    if (selectedItems.some((selected) => selected.id === item.id)) {
      // Remove it if already selected
      setSelectedItems(
        selectedItems.filter((selected) => selected.id !== item.id)
      );
    } else {
      // Add it if not already selected
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the featured items group
    const featuredItemsGroup = {
      id: Date.now().toString(), // Simple unique ID
      groupName,
      items: selectedItems,
      createdAt: new Date().toISOString(),
    };

    // Add to saved groups
    const updatedGroups = [...savedGroups, featuredItemsGroup];
    setSavedGroups(updatedGroups);

    // Save to localStorage (this would be replaced with API call in production)
    localStorage.setItem("featuredItemsGroups", JSON.stringify(updatedGroups));

    // Call the parent callback if provided
    if (onSaveGroup) {
      onSaveGroup(featuredItemsGroup);
    }

    // Reset form
    setGroupName("");
    setSelectedItems([]);

    // Switch to view mode to see the saved group
    setViewMode("view");
  };

  const deleteGroup = (groupId) => {
    const updatedGroups = savedGroups.filter((group) => group.id !== groupId);
    setSavedGroups(updatedGroups);
    localStorage.setItem("featuredItemsGroups", JSON.stringify(updatedGroups));
  };

  const editGroup = (group) => {
    setGroupName(group.groupName);
    setSelectedItems(group.items);
    setViewMode("create");
    // Remove the old group
    deleteGroup(group.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 flex justify-between items-center border-b">
        <h3 className="text-lg font-medium text-gray-800">
          {viewMode === "create" ? "Feature Items" : "Featured Item Groups"}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() =>
              setViewMode(viewMode === "create" ? "view" : "create")
            }
            className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
          >
            {viewMode === "create" ? "View Saved Groups" : "Create New Group"}
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <FiX className="text-gray-600" />
          </button>
        </div>
      </div>

      {viewMode === "create" ? (
        <form onSubmit={handleSubmit} className="p-6">
          {/* Group Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Group Name
            </label>
            <input
              type="text"
              placeholder="e.g., Staff Picks, Most Popular Items"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>

          {/* Available Items */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Available Items</h4>
            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemSelect(item)}
                    className={`p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                      selectedItems.some((selected) => selected.id === item.id)
                        ? "bg-blue-50"
                        : ""
                    }`}
                  >
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <p className="text-sm text-gray-500">
                        {item.categoryName} &gt; {item.subcategoryName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">₹{item.pricing}</span>
                      <input
                        type="checkbox"
                        checked={selectedItems.some(
                          (selected) => selected.id === item.id
                        )}
                        onChange={() => {}}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-4 text-gray-500 text-center">
                  {searchTerm
                    ? "No items found"
                    : "Search for items to display"}
                </p>
              )}
            </div>
          </div>

          {/* Selected Items Preview */}
          {selectedItems.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">
                Selected Items ({selectedItems.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-blue-50 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <span>{item.name}</span>
                    <button
                      type="button"
                      onClick={() => handleItemSelect(item)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedItems.length === 0 || !groupName}
              className={`px-4 py-2 text-white rounded-md ${
                selectedItems.length === 0 || !groupName
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } transition-colors`}
            >
              Save Featured Items
            </button>
          </div>
        </form>
      ) : (
        <div className="p-6">
          {savedGroups.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No featured item groups created yet
              </p>
              <button
                onClick={() => setViewMode("create")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Create Your First Group
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {savedGroups.map((group) => (
                <div
                  key={group.id}
                  className="border rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Group Header */}
                  <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                    <div>
                      <h4 className="font-medium text-lg">{group.groupName}</h4>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editGroup(group)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        title="Edit Group"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => deleteGroup(group.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        title="Delete Group"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Group Items */}
                  <div className="p-4">
                    <h5 className="text-sm font-medium text-gray-500 mb-3">
                      Featured Items ({group.items.length})
                    </h5>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 border rounded-md bg-white hover:bg-gray-50"
                        >
                          <div className="font-medium text-sm mb-1 truncate">
                            {item.name}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              {item.subcategoryName}
                            </span>
                            <span className="text-sm font-medium">
                              ₹{item.pricing}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowMoreItemsForm;
