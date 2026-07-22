import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useBusinessStore } from "../../store/business.store";

function EditReviewModal({

    open,

    onClose,

    businessId,

    review,

}) {

    const updateReviewInBusiness =
        useBusinessStore(

            (state) =>

                state.updateReviewInBusiness

        );

    const [rating, setRating] =
        useState(5);

    const [comment, setComment] =
        useState("");

    useEffect(() => {

        if (review) {

            setRating(review.rating);

            setComment(review.comment);

        }

    }, [review]);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            await updateReviewInBusiness(

                businessId,

                {

                    rating,

                    comment,

                }

            );

            onClose();

        };

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

            <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">

                <h2 className="mb-6 text-3xl font-bold">

                    Edit Review ✏️

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div>

                        <p className="mb-3 font-semibold">

                            Rating

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

                    <textarea

                        rows={5}

                        value={comment}

                        onChange={(e)=>

                            setComment(
                                e.target.value
                            )
                        }

                        className="w-full rounded-xl border p-4"

                    />

                    <div className="flex justify-end gap-3">

                        <button

                            type="button"

                            onClick={onClose}

                            className="rounded-xl border px-6 py-3"

                        >

                            Cancel

                        </button>

                        <button

                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"

                        >

                            Update Review

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditReviewModal;