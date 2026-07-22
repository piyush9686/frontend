import {
    FaStar,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

function ReviewCard({

    review,

    currentUser,

    onEdit,

    onDelete,

}) {

    const isReviewOwner =
        review.user?._id === currentUser?._id;

    return (

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-4">

                    <img
                        src={
                            review.user?.avatar ||
                            `https://ui-avatars.com/api/?name=${review.user?.name}`
                        }
                        alt={review.user?.name}
                        className="h-12 w-12 rounded-full object-cover"
                    />

                    <div>

                        <h3 className="font-bold">

                            {review.user?.name}

                        </h3>

                        <p className="text-sm text-slate-500">

                            {new Date(
                                review.createdAt
                            ).toLocaleDateString("en-IN")}

                        </p>

                    </div>

                </div>

                {isReviewOwner && (

                    <div className="flex gap-2">

                        <button
                            onClick={() => onEdit(review)}
                            className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                        >

                            <FaEdit />

                        </button>

                        <button
                            onClick={() => onDelete(review)}
                            className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                        >

                            <FaTrash />

                        </button>

                    </div>

                )}

            </div>

            <div className="mt-4 flex gap-1">

                {[1, 2, 3, 4, 5].map((star) => (

                    <FaStar
                        key={star}
                        className={
                            star <= review.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                        }
                    />

                ))}

            </div>

            <p className="mt-4 text-slate-600">

                {review.comment}

            </p>

        </div>

    );

}

export default ReviewCard;