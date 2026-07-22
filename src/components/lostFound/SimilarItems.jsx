import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getSimilarItems } from "../../api/lostFound.api";
import LostFoundCard from "./LostFoundCard";

const SimilarItems = ({ itemId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSimilarItems = async () => {
    try {
      const res = await getSimilarItems(itemId);

      setItems(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to load similar items"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (itemId) {
      fetchSimilarItems();
    }
  }, [itemId]);

  if (loading) {
    return (
      <div className="text-center py-8">
        Loading similar items...
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Similar Items
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <LostFoundCard
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarItems;