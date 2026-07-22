import ProductCard from "./ProductCard";

function ProductSection({
    business,
    isOwner,
    onAddProduct,
    onEditProduct,
    onDeleteProduct,
}) {

    return (

        <div className="mt-10">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold">

                    Products 🛍️

                </h2>

                {isOwner && (

                    <button
                        onClick={onAddProduct}
                        className="rounded-xl bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
                    >

                        Add Product

                    </button>

                )}

            </div>

            {business.products?.length ? (

                <div className="grid gap-6 md:grid-cols-2">

                    {business.products.map(
                        (product) => (

                            <ProductCard
                                key={product._id}
                                product={product}
                                isOwner={isOwner}
                                onEdit={() =>
                                    onEditProduct(
                                        product
                                    )
                                }
                                onDelete={() =>
                                    onDeleteProduct(
                                        product._id
                                    )
                                }
                            />

                        )
                    )}

                </div>

            ) : (

                <div className="rounded-2xl border border-dashed p-8 text-center text-slate-500">

                    No products added yet.

                </div>

            )}

        </div>

    );

}

export default ProductSection;