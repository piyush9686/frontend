import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { markAsFound } from "../../api/lostFound.api";
import toast from "react-hot-toast";

const MarkAsFoundButton = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(item.status);

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Show button only to owner
  if (!user || user._id !== item.owner?._id) {
    return null;
  }

  // Already found
  if (status === "found") {
    return (
      <button
        disabled
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg cursor-not-allowed"
      >
        <CheckCircle size={18} />
        Found
      </button>
    );
  }

  const handleMarkAsFound = async () => {
    try {
      setLoading(true);

      const res = await markAsFound(item._id);

      setStatus("found");

      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to mark item as found"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleMarkAsFound}
      disabled={loading}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
    >
      <CheckCircle size={18} />
      {loading ? "Updating..." : "Mark as Found"}
    </button>
  );
};

export default MarkAsFoundButton;