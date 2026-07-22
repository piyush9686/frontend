import { FaTrash } from "react-icons/fa";

function DashboardGalleryCard({

    image,

    index,

    onDelete,

}) {

    return (

        <div className="overflow-hidden rounded-3xl bg-white shadow transition hover:-translate-y-1 hover:shadow-lg">

            <img
                src={image}
                alt={`Gallery ${index}`}
                className="h-60 w-full object-cover"
            />

            <div className="p-4">

                <button
                    onClick={() => onDelete(index)}
                    className="w-full rounded-xl bg-red-100 py-2 font-semibold text-red-700 hover:bg-red-200"
                >

                    <FaTrash className="mr-2 inline" />

                    Delete Image

                </button>

            </div>

        </div>

    );

}

export default DashboardGalleryCard;