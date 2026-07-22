import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useBusinessStore } from "../../store/business.store";



function AddReviewModal({
    open,
    onClose,
    businessId,
}) {

    const addReviewToBusiness =
        useBusinessStore(
            (state) =>
                state.addReviewToBusiness
        );

    const [rating, setRating] =
        useState(5);

    const [comment, setComment] =
        useState("");

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            await addReviewToBusiness(
                businessId,
                {
                    rating,
                    comment,
                }
            );

            setRating(5);
            setComment("");

            onClose();

        };

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

            <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">

                <h2 className="mb-6 text-3xl font-bold">

                    Write a Review ⭐

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Rating */}

                    <div>

                        <p className="mb-3 font-semibold">

                            Your Rating

                        </p>

                        <div className="flex gap-3">

                            {[1,2,3,4,5].map((star)=>(

                                <FaStar

                                    key={star}

                                    size={32}

                                    onClick={()=>

                                        setRating(star)

                                    }

                                    className={`cursor-pointer transition ${
                                        star <= rating
                                            ? "text-yellow-500"
                                            : "text-gray-300"
                                    }`}

                                />

                            ))}

                        </div>

                    </div>

                    {/* Comment */}

                    <div>

                        <p className="mb-3 font-semibold">

                            Review

                        </p>

                        <textarea

                            rows={5}

                            value={comment}

                            onChange={(e)=>

                                setComment(
                                    e.target.value
                                )
                            }

                            placeholder="Tell others about your experience..."

                            className="w-full rounded-xl border p-4 focus:border-violet-500 focus:outline-none"

                        />

                    </div>

                    <div className="flex justify-end gap-3">

                        <button

                            type="button"

                            onClick={onClose}

                            className="rounded-xl border px-6 py-3"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-white hover:bg-yellow-600"

                        >

                            Submit Review

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddReviewModal;