import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getLostFoundById,
  increaseViewCount,
} from "../../api/lostFound.api";

import BookmarkButton from "../../components/lostFound/BookmarkButton";
import ContactOwnerButton from "../../components/lostFound/ContactOwnerButton";
import RewardBadge from "../../components/lostFound/RewardBadge";
import SimilarItems from "../../components/lostFound/SimilarItems";
import NearbyItems from "../../components/lostFound/NearbyItems";

const LostFoundDetails = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchItem = async () => {
    try {
      await increaseViewCount(id);

      const res = await getLostFoundById(id);

      setItem(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch item"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center py-10">
        Item not found
      </div>
    );
  }

  return (
  <div className="max-w-6xl mx-auto py-8 px-4">
    <div className="grid md:grid-cols-2 gap-8">

      {/* Images */}
      <div>
        <img
          src={
            item.images?.length > 0
              ? item.images[0].url
              : "https://placehold.co/600x400?text=No+Image"
          }
          alt={item.title}
          className="w-full h-96 object-cover rounded-xl shadow"
        />

        {item.images?.length > 1 && (
          <div className="grid grid-cols-4 gap-3 mt-4">
            {item.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Image ${index + 1}`}
                className="h-24 w-full object-cover rounded-lg border cursor-pointer hover:opacity-80"
              />
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div>

        <div className="flex justify-between items-start">
          <span
            className={`px-4 py-2 rounded-full text-white font-semibold ${
              item.type === "lost"
                ? "bg-red-500"
                : "bg-green-600"
            }`}
          >
            {item.type.toUpperCase()}
          </span>

          <BookmarkButton item={item} />
        </div>

        <h1 className="text-4xl font-bold mt-6">
          {item.title}
        </h1>

        {item.reward > 0 && (
          <div className="mt-4">
            <RewardBadge reward={item.reward} />
          </div>
        )}

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Description
          </h2>

          <p className="text-gray-700 leading-7">
            {item.description}
          </p>
        </div>

        {/* Address */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Location
          </h2>

          <p className="text-gray-700">
            {item.address}
          </p>
        </div>

        {/* Owner */}
        <div className="mt-6 flex items-center gap-4">
          <img
            src={
              item.owner?.avatar ||
              "https://i.pravatar.cc/100"
            }
            alt={item.owner?.fullName}
            className="w-16 h-16 rounded-full object-cover"
          />

          <div>
            <h3 className="text-lg font-semibold">
              {item.owner?.fullName}
            </h3>

            <p className="text-gray-500">
              @{item.owner?.username}
            </p>

            <p className="text-sm text-gray-500">
              Trust Score: {item.owner?.trustScore ?? 0}
            </p>
          </div>
        </div>

        {/* Posted On */}
        <div className="mt-6">
          <p className="text-gray-500">
            Posted on{" "}
            {new Date(item.createdAt).toLocaleDateString()}
          </p>

          <p className="text-gray-500 mt-1">
            Views: {item.views}
          </p>
        </div>

        {/* Contact Owner */}
        <div className="mt-8">
          <ContactOwnerButton item={item} />
        </div>

      </div>

    </div>

    {/* Similar Items */}
    <div className="mt-12">
      <SimilarItems itemId={item._id} />
    </div>

    {/* Nearby Items */}
    <div className="mt-12">
      <NearbyItems
        latitude={item.location?.coordinates?.[1]}
        longitude={item.location?.coordinates?.[0]}
      />
    </div>

  </div>
)};

export default LostFoundDetails;