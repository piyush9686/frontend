import {
    FaEdit,
    FaTrash,
    FaRupeeSign,
    FaBoxOpen,
} from "react-icons/fa";

function DashboardProductCard({

    product,

    onEdit,

    onDelete,

}) {

    return (

        <div className="overflow-hidden rounded-3xl bg-white shadow transition hover:-translate-y-1 hover:shadow-lg">

            <img
                src={
                    product.image ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63?w=600"
                }
                alt={product.name}
                className="h-48 w-full object-cover"
            />

            <div className="space-y-4 p-5">

                <div className="flex items-start justify-between">

                    <div>

                        <h3 className="text-xl font-bold">

                            {product.name}

                        </h3>

                        <p className="mt-1 text-sm text-slate-500">

                            {product.description}

                        </p>

                    </div>

                    <div className="rounded-xl bg-green-100 px-3 py-2 font-bold text-green-700">

                        <FaRupeeSign className="inline" />

                        {product.price}

                    </div>

                </div>

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">

                        <FaBoxOpen />

                        <span>

                            Stock:

                            {" "}

                            {product.stock || 0}

                        </span>

                    </div>

                    <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            product.stock > 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >

                        {product.stock > 0
                            ? "In Stock"
                            : "Out of Stock"}

                    </span>

                </div>

                <div className="flex gap-3">

                    <button
                        onClick={onEdit}
                        className="flex-1 rounded-xl bg-blue-100 py-2 font-semibold text-blue-700 transition hover:bg-blue-200"
                    >

                        <FaEdit className="mr-2 inline" />

                        Edit

                    </button>

                    <button
                        onClick={onDelete}
                        className="flex-1 rounded-xl bg-red-100 py-2 font-semibold text-red-700 transition hover:bg-red-200"
                    >

                        <FaTrash className="mr-2 inline" />

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DashboardProductCard;