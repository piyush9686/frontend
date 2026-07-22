import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getBookmarks } from "../../api/lostFound.api";
import LostFoundCard from "../../components/lostFound/LostFoundCard";

const BookmarkedLostFound = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const res = await getBookmarks();

      setItems(res.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login to view your bookmarks.");
      } else {
        toast.error(
          error.response?.data?.message ||
          "Failed to fetch bookmarks"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading bookmarks...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-8">
        My Bookmarked Items
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold text-gray-700">
            No Bookmarked Items
          </h2>

          <p className="text-gray-500 mt-2">
            Bookmark Lost & Found posts to view them here.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <LostFoundCard
              key={item._id}
              item={item}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default BookmarkedLostFound;