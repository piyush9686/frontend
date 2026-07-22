import { FaTrash } from "react-icons/fa";

function GalleryImageCard({
    image,
    isOwner,
    onDelete,
}) {

    return (

        <div className="group relative overflow-hidden rounded-2xl shadow-md">

            <img
                src={image}
                alt="Business gallery"
                className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
            />

            {isOwner && (

                <button
                    onClick={onDelete}
                    className="
                        absolute right-3 top-3
                        rounded-full bg-red-500 p-3
                        text-white shadow-lg
                        transition hover:bg-red-600
                    "
                >

                    <FaTrash />

                </button>

            )}

        </div>

    );

}

export default GalleryImageCard;