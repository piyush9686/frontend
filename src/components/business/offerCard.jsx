import { FaEdit, FaTrash } from "react-icons/fa";

function OfferCard({
    offer,
    isOwner,
    onEdit,
    onDelete,
}) {

    return (

        <div className="rounded-2xl bg-green-50 p-5 shadow-sm">

            <div className="flex items-start justify-between">

                <div>

                    <h3 className="text-lg font-bold text-green-700">

                        {offer.title}

                    </h3>

                    <p className="mt-2 text-slate-600">

                        {offer.description}

                    </p>

                    {offer.validTill && (

                        <p className="mt-3 text-sm text-slate-500">

                            Valid till:
                            {" "}
                            {new Date(
                                offer.validTill
                            ).toLocaleDateString("en-IN")}

                        </p>

                    )}

                </div>

                {isOwner && (

                    <div className="flex gap-2">

                        <button
                            onClick={onEdit}
                            className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200"
                        >

                            <FaEdit />

                        </button>

                        <button
                            onClick={onDelete}
                            className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200"
                        >

                            <FaTrash />

                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}

export default OfferCard;