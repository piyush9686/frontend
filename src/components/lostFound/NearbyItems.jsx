import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getNearbyItems } from "../../api/lostFound.api";
import LostFoundCard from "./LostFoundCard";

const NearbyItems = ({ latitude, longitude }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNearbyItems = async () => {
    try {
      const res = await getNearbyItems({
        latitude,
        longitude,
      });

      setItems(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch nearby items"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchNearbyItems();
    }
  }, [latitude, longitude]);

  if (loading) {
    return (
      <div className="text-center py-8">
        Loading nearby items...
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">
        Nearby Lost & Found Items
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

export default NearbyItems;