const LostFoundFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-6">

      {/* Type */}
      <select
        name="type"
        value={filters.type}
        onChange={handleChange}
        className="border rounded-lg px-4 py-3"
      >
        <option value="">All Types</option>
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>

      {/* Category */}
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="border rounded-lg px-4 py-3"
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Documents">Documents</option>
        <option value="Wallet">Wallet</option>
        <option value="Keys">Keys</option>
        <option value="Clothing">Clothing</option>
        <option value="Jewellery">Jewellery</option>
        <option value="Pets">Pets</option>
        <option value="Others">Others</option>
      </select>

      {/* Status */}
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="border rounded-lg px-4 py-3"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="found">Found</option>
      </select>

      {/* Reset */}
      <button
        onClick={() =>
          setFilters({
            type: "",
            category: "",
            status: "",
          })
        }
        className="bg-gray-700 hover:bg-gray-800 text-white rounded-lg px-4 py-3"
      >
        Clear Filters
      </button>

    </div>
  );
};

export default LostFoundFilters;