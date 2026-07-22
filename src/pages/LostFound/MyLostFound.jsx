import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getMyLostFound } from "../../api/lostFound.api";
import LostFoundCard from "../../components/lostFound/LostFoundCard";

const MyLostFound = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyItems = async () => {
    try {
      const res = await getMyLostFound();
      setItems(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch your posts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-8">
        My Lost & Found
      </h1>

      {items.length === 0 ? (
        <div className="text-center text-gray-500">
          You haven't posted any Lost & Found items yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <LostFoundCard
              key={item._id}
              item={item}
              isOwner={true}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default MyLostFound;