
import { useEffect, useState } from "react";
import { FiLink, FiSearch, FiCheck, FiX, FiPlusCircle } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";

const MapExistingItem = ({
  isOpen,
  onClose,
  serviceType = "Dine-in",
  dropdownOptions = {},
}) => {
  // Navigation and location hooks
  const navigate = useNavigate();
  const location = useLocation();

  // State variables
  const [isMapped, setIsMapped] = useState(false); // Tracks if mapping is complete
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [selectedItems, setSelectedItems] = useState([]); // Items selected for current service type
  const [items, setItems] = useState([]); // List of fetched items
  const [loading, setLoading] = useState(true); // Loading state for API calls
  const [currentServiceType, setCurrentServiceType] = useState(serviceType); // Current service type view
  const [dualServiceItems, setDualServiceItems] = useState([]); // Items for both service types
  const [error, setError] = useState(null); // Error messages

  // Determine initial service type based on route if not provided via props
  useEffect(() => {
    if (!serviceType) {
      if (location.pathname.includes("dine-in")) {
        setCurrentServiceType("Dine-in");
      } else if (
        location.pathname.includes("delivery") ||
        location.pathname.includes("takeaway")
      ) {
        setCurrentServiceType("Takeaway");
      }
    }
  }, [location, serviceType]);

  // Fetch items when service type changes
  useEffect(() => {
    fetchItems();
  }, [currentServiceType]);

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:4040/api/items?serviceType=${currentServiceType}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();

      // Transform backend data to frontend format
      const transformedItems = data.map((item) => ({
        id: item._id,
        name: item.name,
        description: item.description,
        category: item.categoryId?.name || "Uncategorized",
        serviceType: item.serviceType || [],
        type: item.type || "",
      }));

      setItems(transformedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Failed to fetch items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Select or deselect an item for current service type
  const handleItemSelect = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Toggle an item for both service types
  const handleDualServiceToggle = (item) => {
    setDualServiceItems((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  // Filter items based on search term
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle between "Dine-in" and "Takeaway"
  const toggleServiceType = () => {
    const newServiceType =
      currentServiceType === "Dine-in" ? "Takeaway" : "Dine-in";
    setCurrentServiceType(newServiceType);
  };

  // Update service types and close the panel
  const closePopup = async () => {
    try {
      setLoading(true);
      setError(null);

      // Items for only the current service type
      const regularItems = selectedItems.filter(
        (item) => !dualServiceItems.some((d) => d.id === item.id)
      );

      // Update regular items
      if (regularItems.length > 0) {
        const response = await fetch(
          "http://localhost:4040/api/items/update-service-types",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: regularItems.map((item) => item.id),
              addServiceTypes: [currentServiceType],
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update regular items");
        }
      }

      // Update dual-service items
      // Update dual-service items
      if (dualServiceItems.length > 0) {
        const otherServiceType =
          currentServiceType === "Dine-in" ? "Takeaway" : "Dine-in";
        const response = await fetch(
          "http://localhost:4040/api/items/update-service-types",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: dualServiceItems.map((item) => item.id),
              addServiceTypes: [currentServiceType, otherServiceType],
            }),
          }
        );
      }
      setIsMapped(true); // Show success modal
    } catch (error) {
      console.error("Error updating items:", error);
      setError("Failed to update items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Loading state UI
  if (loading) {
    return (
      <div className="fixed inset-y-0 right-0 mt-16 w-3/5 bg-white shadow-lg border-l border-gray-200 overflow-y-auto z-10">
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading items...</p>
          </div>
        </div>
      </div>
    );
  }

  // Main UI
  return (
    <div className="fixed w-3/5 inset-y-0 right-0 mt-16 bg-white shadow-lg border-l border-gray-200 overflow-hidden z-10">
      {/* Header */}
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Map Existing Items
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
            aria-label="Close panel"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Search and filter controls */}
        <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 pl-10 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">
              Current View:
            </span>
            <button
              onClick={toggleServiceType}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-all font-medium flex items-center gap-2"
            >
              {currentServiceType} Items
              <span className="text-xs bg-blue-100 px-2 py-1 rounded-full">
                Switch to{" "}
                {currentServiceType === "Dine-in" ? "Takeaway" : "Dine-in"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md mb-4 mx-4">
          {error}
        </div>
      )}

      {/* Items list */}
      <div
        className="p-4 overflow-y-auto"
        style={{ height: "calc(100vh - 250px)" }}
      >
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm text-gray-500">
            {filteredItems.length} item(s) found • {selectedItems.length}{" "}
            selected
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
              {dualServiceItems.length} items selected for both services
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 border ${
                  selectedItems.includes(item)
                    ? "border-blue-300 bg-blue-50 shadow-sm"
                    : "border-gray-200 bg-white hover:bg-blue-50"
                }`}
              >
                <div
                  className="flex-1 pr-4 cursor-pointer"
                  onClick={() => handleItemSelect(item)}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-800 text-lg">
                      {item.name}
                    </h3>
                    {item.type && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          item.type === "Veg"
                            ? "bg-green-100 text-green-600"
                            : item.type === "Non-Veg"
                            ? "bg-red-100 text-red-600"
                            : item.type === "Egg"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.type}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {item.description || "No description available"}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {item.category}
                    </span>
                    {item.serviceType.map((type, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDualServiceToggle(item)}
                    className={`flex items-center justify-center p-2 rounded-md transition-all ${
                      dualServiceItems.some((i) => i.id === item.id)
                        ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                    title={
                      dualServiceItems.some((i) => i.id === item.id)
                        ? "Remove from both services"
                        : "Add to both Dine-in & Takeaway"
                    }
                  >
                    <FiPlusCircle size={18} />
                    <span className="text-xs ml-1">Both</span>
                  </button>
                  <div
                    onClick={() => handleItemSelect(item)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border cursor-pointer ${
                      selectedItems.includes(item)
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    } flex items-center justify-center`}
                  >
                    {selectedItems.includes(item) && (
                      <FiCheck className="text-white" size={14} />
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <FiSearch size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-600 text-center">
                No items found for{" "}
                <span className="font-medium">{currentServiceType}</span>{" "}
                service.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Try changing your search or switching service type
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer actions */}
      <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <p>
              <span className="font-medium">{selectedItems.length}</span> items
              selected for{" "}
              <span className="font-medium">{currentServiceType}</span>
            </p>
            {dualServiceItems.length > 0 && (
              <p className="text-purple-600">
                <span className="font-medium">{dualServiceItems.length}</span>{" "}
                items will be added to both services
              </p>
            )}
          </div>
          <div className="flex justify-end items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={closePopup}
              disabled={
                selectedItems.length === 0 && dualServiceItems.length === 0
              }
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md transition-all font-medium ${
                selectedItems.length > 0 || dualServiceItems.length > 0
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <FiLink size={18} />
              <span>Map Selected Items</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success modal */}
      {isMapped && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-fade-in">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <FiCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Items Mapped Successfully!
              </h3>
              <p className="text-gray-600 mt-1">
                {selectedItems.length + dualServiceItems.length} item
                {selectedItems.length + dualServiceItems.length !== 1
                  ? "s"
                  : ""}{" "}
                added to your menu
              </p>
            </div>
            <div className="max-h-60 overflow-y-auto mt-4 mb-6">
              <div className="space-y-2">
                {selectedItems
                  .filter(
                    (item) => !dualServiceItems.some((d) => d.id === item.id)
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center px-3 py-2 bg-gray-50 rounded border border-gray-100"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <div>
                        <p className="text-gray-800 font-medium">{item.name}</p>
                        <p className="text-xs text-blue-500">
                          {currentServiceType}
                        </p>
                      </div>
                    </div>
                  ))}
                {dualServiceItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center px-3 py-2 bg-purple-50 rounded border border-purple-100"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-gray-800 font-medium">{item.name}</p>
                      <p className="text-xs text-purple-600">
                        Dine-in & Takeaway
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                aria-label="Close panel"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapExistingItem;