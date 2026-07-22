import { Link } from "react-router-dom";
import { MapPin, Clock, Eye } from "lucide-react";
import toast from "react-hot-toast";

import BookmarkButton from "./BookmarkButton";
import ContactOwnerButton from "./ContactOwnerButton";
import RewardBadge from "./RewardBadge";
import MarkAsFoundButton from "./MarkAsFoundButton";

import { deleteLostFound } from "../../api/lostFound.api";

const LostFoundCard = ({ item, isOwner = false }) => {

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLostFound(id);

      toast.success("Post deleted successfully");

      window.location.reload();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete post"
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      {/* Image */}
      <div className="relative h-56 w-full">

        <img
          src={
            item.images?.length > 0
              ? item.images[0].url
              : "https://placehold.co/600x400?text=No+Image"
          }
          alt={item.title}
          className="w-full h-full object-cover"
        />

        {/* Lost / Found Badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold text-white ${
            item.type === "lost"
              ? "bg-red-500"
              : "bg-green-600"
          }`}
        >
          {item.type.toUpperCase()}
        </span>

        {/* Reward */}
        {item.reward > 0 && (
          <div className="absolute top-3 right-3">
            <RewardBadge reward={item.reward} />
          </div>
        )}

      </div>

      {/* Body */}
      <div className="p-5">

        <h2 className="text-xl font-bold text-gray-800">
          {item.title}
        </h2>

        <p className="text-gray-600 mt-2 line-clamp-2">
          {item.description}
        </p>

        {/* Category */}
        <div className="mt-3">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
            {item.category}
          </span>
        </div>

        {/* Address */}
        <div className="flex items-center gap-2 mt-4 text-gray-500">
          <MapPin size={18} />
          <span>{item.address}</span>
        </div>

        {/* Owner */}
        <div className="flex items-center gap-3 mt-4">
          <img
            src={
              item.owner?.avatar ||
              "https://i.pravatar.cc/100"
            }
            alt={item.owner?.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <p className="font-medium">
              {item.owner?.fullName}
            </p>

            <div className="flex items-center text-sm text-gray-500">
              <Clock size={14} className="mr-1" />
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6">

          <BookmarkButton item={item} />

          {isOwner ? (
            <div className="flex gap-2">

              <Link
                to={`/lost-found/edit/${item._id}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Delete
              </button>

              {item.status !== "found" && (
                <MarkAsFoundButton itemId={item._id} />
              )}

            </div>
          ) : (
            <ContactOwnerButton item={item} />
          )}

        </div>
        {/* View Details */}
        <Link
          to={`/lost-found/${item._id}`}
          className="mt-5 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          <Eye size={18} />
          View Details
        </Link>

      </div>
    </div>
  );
};

export default LostFoundCard;