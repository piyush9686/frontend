import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { contactOwner } from "../../api/lostFound.api";

const ContactOwnerButton = ({ item }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleContactOwner = async () => {
    try {
      setLoading(true);

      const res = await contactOwner(item._id);

      const conversation = res.data.data;

      toast.success("Conversation ready!");

      navigate(`/chat/${conversation._id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to contact owner"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleContactOwner}
      disabled={loading}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
    >
      <MessageCircle size={18} />

      {loading ? "Opening..." : "Contact Owner"}
    </button>
  );
};

export default ContactOwnerButton;