import { Search } from "lucide-react";

const LostFoundSearch = ({ search, setSearch }) => {
  return (
    <div className="relative w-full">
      <Search
        className="absolute left-3 top-3 text-gray-400"
        size={20}
      />

      <input
        type="text"
        placeholder="Search lost or found items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default LostFoundSearch;