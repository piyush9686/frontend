import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLostFoundById, updateLostFound } from "../../api/lostFound.api";
import LostFoundForm from "../../components/lostFound/LostFoundForm";
import toast from "react-hot-toast";

const EditLostFound = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchItem = async () => {
    try {
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

  const handleUpdate = async (formData) => {
    try {
      await updateLostFound(id, formData);

      toast.success("Post updated successfully");

      navigate(`/lost-found/${id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update post"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">

      <div className="bg-white shadow rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          Edit Lost & Found Post
        </h1>

        <LostFoundForm
          initialData={item}
          onSubmit={handleUpdate}
          isEdit
        />

      </div>

    </div>
  );
};

export default EditLostFound;