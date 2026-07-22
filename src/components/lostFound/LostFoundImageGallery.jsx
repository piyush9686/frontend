import { useEffect, useState } from "react";

const LostFoundImageGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0].url);
    }
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
        <span className="text-gray-500 text-lg">
          No Images Available
        </span>
      </div>
    );
  }

  return (
    <div>

      {/* Main Image */}
      <div className="w-full h-[450px] rounded-xl overflow-hidden border shadow">
        <img
          src={selectedImage}
          alt="Lost & Found Item"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Image ${index + 1}`}
            onClick={() => setSelectedImage(image.url)}
            className={`w-24 h-24 rounded-lg cursor-pointer object-cover border-2 transition duration-200 hover:scale-105 ${
              selectedImage === image.url
                ? "border-blue-600"
                : "border-transparent"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default LostFoundImageGallery;