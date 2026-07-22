import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createLostFound } from "../../api/lostFound.api";

const LostFoundForm = ({
  initialData = {},
  onSubmit: customSubmit,
  isEdit = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      title: "",
      description: "",
      category: "",
      reward: "",
      contactMethod: "",
      phoneNumber: "",
      address: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const [locationLoading, setLocationLoading] =
    useState(false);

    const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        toast.success("Location fetched");

        setLocationLoading(false);
      },
      () => {
        toast.error("Unable to fetch location");
        setLocationLoading(false);
      }
    );
  };

  useEffect(() => {
    if (!isEdit) {
      getCurrentLocation();
    }
  }, []);
  useEffect(() => {
    if (isEdit && initialData) {
      reset({
        type: initialData.type || "",
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "",
        reward: initialData.reward || "",
        contactMethod:
          initialData.contactMethod || "",
        phoneNumber:
          initialData.phoneNumber || "",
        address: initialData.address || "",
      });

      if (initialData.location?.coordinates) {
        setLocation({
          latitude:
            initialData.location.coordinates[1],
          longitude:
            initialData.location.coordinates[0],
        });
      }
    }
  }, [initialData, isEdit, reset]);
  // Image Upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setImages(files);
  };

  // Submit Form
  const submitForm = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      images.forEach((image) => {
        formData.append("images", image);
      });

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      formData.append("latitude", location.latitude);
      formData.append("longitude", location.longitude);
     // formData.append("radius", 5);

      // Edit
      if (customSubmit) {
        await customSubmit(formData);

        toast.success("Post updated successfully");
        return;
      }

      // Create
      await createLostFound(formData);

      toast.success("Lost & Found post created successfully");

      reset();

      setImages([]);

      getCurrentLocation();
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
    <form
      onSubmit={handleSubmit(submitForm)}
      className="space-y-6"
    >
      {/* Images */}
      <div>
        <label className="block font-semibold mb-2">
          Upload Images
        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border rounded-lg p-3"
        />

        <p className="text-sm text-gray-500 mt-1">
          Maximum 5 images
        </p>

        {images.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt="preview"
                className="h-24 w-full object-cover rounded-lg border"
              />
            ))}
          </div>
        )}
      </div>

      {/* Type */}
      <div>
        <label className="block font-semibold mb-2">Type</label>

        <select
          {...register("type", { required: "Type is required" })}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Type</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        {errors.type && (
          <p className="text-red-500 text-sm mt-1">
            {errors.type.message}
          </p>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-2">Title</label>

        <input
          type="text"
          placeholder="Lost iPhone 15"
          {...register("title", {
            required: "Title is required",
          })}
          className="w-full border rounded-lg p-3"
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-2">
          Description
        </label>

        <textarea
          rows={5}
          placeholder="Describe the item..."
          {...register("description", {
            required: "Description is required",
          })}
          className="w-full border rounded-lg p-3"
        />

        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold mb-2">
          Category
        </label>

        <select
          {...register("category", {
            required: "Category is required",
          })}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Documents">Documents</option>
          <option value="Wallet">Wallet</option>
          <option value="Keys">Keys</option>
          <option value="Pets">Pets</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Accessories">Accessories</option>
          <option value="Others">Others</option>
        </select>

        {errors.category && (
          <p className="text-red-500 text-sm mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Reward */}
      <div>
        <label className="block font-semibold mb-2">
          Reward (Optional)
        </label>

        <input
          type="number"
          placeholder="5000"
          {...register("reward")}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Contact Method */}
      <div>
        <label className="block font-semibold mb-2">
          Contact Method
        </label>

        <select
          {...register("contactMethod", {
            required: "Contact method is required",
          })}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select</option>
          <option value="chat">Chat</option>
          <option value="phone">Phone</option>
          <option value="both">Both</option>
        </select>

        {errors.contactMethod && (
          <p className="text-red-500 text-sm mt-1">
            {errors.contactMethod.message}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block font-semibold mb-2">
          Phone Number
        </label>

        <input
          type="text"
          placeholder="+91 9876543210"
          {...register("phoneNumber")}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block font-semibold mb-2">
          Address
        </label>

        <textarea
          rows={3}
          placeholder="Enter address"
          {...register("address", {
            required: "Address is required",
          })}
          className="w-full border rounded-lg p-3"
        />

        {errors.address && (
          <p className="text-red-500 text-sm mt-1">
            {errors.address.message}
          </p>
        )}
      </div>

      {/* Current Location */}
      <div>
        <label className="block font-semibold mb-2">
          Current Location
        </label>

        <button
          type="button"
          onClick={getCurrentLocation}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
        >
          {locationLoading
            ? "Fetching Location..."
            : "Use Current Location"}
        </button>

        {location.latitude && (
          <p className="text-green-600 mt-2">
            ✓ Location Selected Successfully
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
      >
        {loading
          ? isEdit
            ? "Updating..."
            : "Creating..."
          : isEdit
          ? "Update Post"
          : "Create Lost & Found Post"}
      </button>
    </form>
  );
};

export default LostFoundForm;