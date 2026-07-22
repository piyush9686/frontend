import { FaTrash } from "react-icons/fa";

function GallerySection({
    business,
    isOwner,
    onAddGallery,
    onDeleteGallery,
}) {

    return (

        <section>

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-3xl font-bold">
                    Gallery 🖼️
                </h2>

                {isOwner && (

                    <button
                        onClick={onAddGallery}
                        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        Add Photo 📸
                    </button>

                )}

            </div>

            {business.gallery &&
            business.gallery.length > 0 ? (

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

                    {business.gallery.map(
                        (image, index) => (

                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl shadow"
                            >

                                <img
                                    src={image}
                                    alt={`Gallery ${index}`}
                                    className="h-60 w-full object-cover transition duration-300 group-hover:scale-105"
                                />

                                {isOwner && (

                                    <button
                                        onClick={() =>
                                            onDeleteGallery(index)
                                        }
                                        className="absolute right-3 top-3 rounded-full bg-red-600 p-3 text-white opacity-0 transition group-hover:opacity-100"
                                    >
                                        <FaTrash />
                                    </button>

                                )}

                            </div>

                        )
                    )}

                </div>

            ) : (

                <div className="rounded-2xl border border-dashed p-10 text-center">

                    <p className="text-slate-500">

                        No gallery images yet.

                    </p>

                    {isOwner && (

                        <button
                            onClick={onAddGallery}
                            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-white"
                        >
                            Upload First Photo 📸
                        </button>

                    )}

                </div>

            )}

        </section>

    );

}

export default GallerySection;