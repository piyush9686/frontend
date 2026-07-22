import { FaEdit, FaTrash } from "react-icons/fa";

function ProductCard({
    product,
    isOwner,
    onEdit,
    onDelete,
}) {

    return (

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">

            <img
                src={
                    product.image ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63?w=600"
                }
                alt={product.name}
                className="h-48 w-full object-cover"
            />

            <div className="p-4">

                <div className="flex items-start justify-between">

                    <h3 className="text-lg font-bold">
                        {product.name}
                    </h3>

                    <span className="font-semibold text-green-600">
                        ₹{product.price}
                    </span>

                </div>

                <p className="mt-2 text-sm text-slate-600">

                    {product.description}

                </p>

                {isOwner && (

                    <div className="mt-4 flex gap-3">

                        <button
                            onClick={onEdit}
                            className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-blue-700 hover:bg-blue-200"
                        >

                            <FaEdit />

                            Edit

                        </button>

                        <button
                            onClick={onDelete}
                            className="flex items-center gap-2 rounded-lg bg-red-100 px-3 py-2 text-red-700 hover:bg-red-200"
                        >

                            <FaTrash />

                            Delete

                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}

export default ProductCard;