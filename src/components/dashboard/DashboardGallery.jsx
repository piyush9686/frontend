import { useState } from "react";

import { useBusinessStore } from "../../store/business.store";

import DashboardGalleryCard from "./DashboardGalleryCard";

import AddGalleryModal from "../business/AddGalleryModal";

function DashboardGallery() {

    const business =
        useBusinessStore(
            (state) => state.selectedBusiness
        );

    const deleteGallery =
        useBusinessStore(
            (state) => state.deleteGalleryFromBusiness
        );

    const [showAdd, setShowAdd] =
        useState(false);

    return (

        <div>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Gallery Management 🖼️

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Showcase your business with beautiful photos.

                    </p>

                </div>

                <button
                    onClick={() => setShowAdd(true)}
                    className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
                >

                    + Add Image

                </button>

            </div>

            {business?.gallery?.length ? (

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {business.gallery.map((image, index) => (

                        <DashboardGalleryCard
                            key={index}
                            image={image}
                            index={index}
                            onDelete={(imageIndex) =>
                                deleteGallery(
                                    business._id,
                                    imageIndex
                                )
                            }
                        />

                    ))}

                </div>

            ) : (

                <div className="rounded-3xl bg-white p-12 text-center shadow">

                    <h2 className="text-2xl font-bold">

                        No Images

                    </h2>

                    <p className="mt-3 text-slate-500">

                        Upload your first business image.

                    </p>

                </div>

            )}

            <AddGalleryModal
                open={showAdd}
                onClose={() => setShowAdd(false)}
                businessId={business?._id}
            />

        </div>

    );

}

export default DashboardGallery;