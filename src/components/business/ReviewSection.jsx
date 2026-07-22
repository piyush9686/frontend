import ReviewCard from "./ReviewCard";

function ReviewSection({

    business,

    currentUser,

    onAddReview,

    onEditReview,

    onDeleteReview,

}) {

    return (

        <div className="mt-12">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold">

                    Customer Reviews ⭐

                </h2>

                <button
                    onClick={onAddReview}
                    className="rounded-xl bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                >
                    Add Review
                </button>

            </div>

            {business.reviews?.length ? (

                <div className="space-y-4">

                    {business.reviews.map((review) => (

                        <ReviewCard
                            key={review._id}
                            review={review}
                            currentUser={currentUser}
                            onEdit={onEditReview}
                            onDelete={onDeleteReview}
                        />

                    ))}

                </div>

            ) : (

                <div className="rounded-2xl border border-dashed p-8 text-center text-slate-500">

                    No reviews yet.

                </div>

            )}

        </div>

    );

}

export default ReviewSection;