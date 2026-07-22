import OfferCard from "./offerCard";

function OfferSection({

    business,

    isOwner,

    onAddOffer,

    onEditOffer,

    onDeleteOffer,

}) {

    return (

        <div className="mt-12">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold">

                    Offers 🔥

                </h2>

                {isOwner && (

                    <button
                        onClick={onAddOffer}
                        className="rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >

                        Add Offer

                    </button>

                )}

            </div>

            {business.offers?.length ? (

                <div className="space-y-4">

                    {business.offers.map(
                        (offer) => (

                            <OfferCard
                                key={offer._id}
                                offer={offer}
                                isOwner={isOwner}
                                onEdit={() =>
                                    onEditOffer(
                                        offer
                                    )
                                }
                                onDelete={() =>
                                    onDeleteOffer(
                                        offer._id
                                    )
                                }
                            />

                        )
                    )}

                </div>

            ) : (

                <div className="rounded-2xl border border-dashed p-8 text-center text-slate-500">

                    No active offers.

                </div>

            )}

        </div>

    );

}

export default OfferSection;