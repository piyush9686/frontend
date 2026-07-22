import { useEffect, useState } from "react";
import { getAllLostFound } from "../../api/lostFound.api";
import { Link } from "react-router-dom";

import LostFoundCard from "../../components/lostFound/LostFoundCard";
import LostFoundSearch from "../../components/lostFound/LostFoundSearch";
import LostFoundFilters from "../../components/lostFound/LostFoundFilters";

const LostFoundPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    type: "",
    category: "",
    status: "",
  });

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchItems = async () => {
    try {
      setLoading(true);

      const params = {
        page,
        limit: 9,
        search,
        ...filters,
      };

      const res = await getAllLostFound(params);

      setItems(res.data.data.items);
      setPagination(res.data.data.pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [
    page,
    search,
    filters.type,
    filters.category,
    filters.status,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    search,
    filters.type,
    filters.category,
    filters.status,
  ]);

  return (
    <div className="max-w-7xl mx-auto p-6">

     <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    Lost & Found
  </h1>

  <Link
    to="/lost-found/create"
    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
  >
    + Report Lost/Found
  </Link>
</div>

     





      <LostFoundSearch
        search={search}
        setSearch={setSearch}
      />

      <div className="mt-4">
        <LostFoundFilters
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      {loading ? (
        <div className="text-center py-10 text-lg">
          Loading...
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No Lost & Found items found.
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mt-8">
            {items.map((item) => (
              <LostFoundCard
                key={item._id}
                item={item}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <span className="font-medium">
              Page {pagination.currentPage || 1} of{" "}
              {pagination.totalPages || 1}
            </span>

            <button
              disabled={
                page === pagination.totalPages ||
                pagination.totalPages === 0
              }
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>

          </div>
        </>
      )}

    </div>
  );
};

export default LostFoundPage;