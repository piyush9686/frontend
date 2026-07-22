import { useState } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

import { bookmarkLostFound } from "../../api/lostFound.api";

const BookmarkButton = ({ item }) => {
  const [bookmarked, setBookmarked] = useState(item.isBookmarked || false);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    try {
      setLoading(true);

      await bookmarkLostFound(item._id);

      setBookmarked((prev) => !prev);

      toast.success(
        bookmarked
          ? "Bookmark removed"
          : "Added to bookmarks"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleBookmark}
      className="p-2 rounded-full hover:bg-gray-100"
    >
      <Heart
        size={22}
        className={
          bookmarked
            ? "fill-red-500 text-red-500"
            : "text-gray-500"
        }
      />
    </button>
  );
};

export default BookmarkButton;