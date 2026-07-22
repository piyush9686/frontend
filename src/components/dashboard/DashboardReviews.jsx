import { useBusinessStore } from "../../store/business.store";

import DashboardReviewCard from "./DashboardReviewCard";

function DashboardReviews() {

    const business =
        useBusinessStore(
            (state) => state.selectedBusiness
        );

    const deleteReview =
        useBusinessStore(
            (state) => state.deleteReviewFromBusiness
        );

    return (

        <div>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Customer Reviews ⭐

                </h1>

                <p className="mt-2 text-slate-500">

                    See what your customers think about your business.

                </p>

            </div>

            {business?.reviews?.length ? (

                <div className="space-y-5">

                    {business.reviews.map((review) => (

                        <DashboardReviewCard

                            key={review._id}

                            review={review}

                            onDelete={() =>

                                deleteReview(

                                    business._id

                                )

                            }

                        />

                    ))}

                </div>

            ) : (

                <div className="rounded-3xl bg-white p-12 text-center shadow">

                    <h2 className="text-2xl font-bold">

                        No Reviews Yet

                    </h2>

                    <p className="mt-3 text-slate-500">

                        Customer reviews will appear here.

                    </p>

                </div>

            )}

        </div>

    );

}

export default DashboardReviews;