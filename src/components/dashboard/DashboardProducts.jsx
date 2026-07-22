import { useMemo, useState } from "react";

import { useBusinessStore } from "../../store/business.store";

import DashboardProductCard from "./DashboardProductCard";

import AddProductModal from "../business/AddProductModal";
import EditProductModal from "../business/EditProductModal";

function DashboardProducts() {

    const business =
        useBusinessStore(
            (state) => state.selectedBusiness
        );

    const deleteProduct =
        useBusinessStore(
            (state) => state.deleteProductFromBusiness
        );

    const [search, setSearch] =
        useState("");

    const [showAdd, setShowAdd] =
        useState(false);

    const [showEdit, setShowEdit] =
        useState(false);

    const [selectedProduct, setSelectedProduct] =
        useState(null);

    const products = useMemo(() => {

        return (
            business?.products?.filter((product) =>
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            ) || []
        );

    }, [business, search]);

    return (

        <div>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Product Management 📦

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Manage all your products.

                    </p>

                </div>

                <button
                    onClick={() => setShowAdd(true)}
                    className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
                >

                    + Add Product

                </button>

            </div>

            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                className="mb-8 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-violet-500"
            />

            {products.length ? (

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {products.map((product) => (

                        <DashboardProductCard
                            key={product._id}
                            product={product}
                            onEdit={() => {

                                setSelectedProduct(product);

                                setShowEdit(true);

                            }}
                            onDelete={() =>
                                deleteProduct(
                                    business._id,
                                    product._id
                                )
                            }
                        />

                    ))}

                </div>

            ) : (

                <div className="rounded-3xl bg-white p-12 text-center shadow">

                    <h2 className="text-2xl font-bold">

                        No Products Found

                    </h2>

                    <p className="mt-3 text-slate-500">

                        Start by adding your first product.

                    </p>

                </div>

            )}

            <AddProductModal
                open={showAdd}
                onClose={() => setShowAdd(false)}
                businessId={business?._id}
            />

            <EditProductModal
                open={showEdit}
                onClose={() => {

                    setShowEdit(false);

                    setSelectedProduct(null);

                }}
                businessId={business?._id}
                product={selectedProduct}
            />

        </div>

    );

}

export default DashboardProducts;