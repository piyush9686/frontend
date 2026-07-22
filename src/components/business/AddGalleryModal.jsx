import { useState } from "react";
import { useBusinessStore } from "../../store/business.store";

function AddGalleryModal({
    open,
    onClose,
    businessId,
}) {

    const addGalleryToBusiness =
        useBusinessStore(
            (state) =>
                state.addGalleryToBusiness
        );

    const [imageUrl, setImageUrl] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!imageUrl.trim()) return;

        try {

            setLoading(true);

            await addGalleryToBusiness(
                businessId,
                imageUrl
            );

            setImageUrl("");

            onClose();

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">

                <h2 className="mb-6 text-2xl font-bold">

                    Add Gallery Photo 📸

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="url"
                        placeholder="Image URL"
                        className="w-full rounded-xl border p-3"
                        value={imageUrl}
                        onChange={(e) =>
                            setImageUrl(
                                e.target.value
                            )
                        }
                        required
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border px-5 py-3"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading
                                ? "Uploading..."
                                : "Add Photo"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddGalleryModal;