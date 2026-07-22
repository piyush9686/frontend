
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useBusinessStore } from "../store/business.store";
import { useAuthStore } from "../store/auth.store";

import BusinessHero from "../components/business/BusinessHero";
import BusinessInfoCard from "../components/business/BusinessInfoCard";

import ProductSection from "../components/business/ProductSection";
import OfferSection from "../components/business/offerSection";
import GallerySection from "../components/business/GallerySection";
import ReviewSection from "../components/business/ReviewSection";

import AddProductModal from "../components/business/AddProductModal";
import AddOfferModal from "../components/business/AddOfferModal";
import AddGalleryModal from "../components/business/AddGalleryModal";
import AddReviewModal from "../components/business/AddReviewModal";

import EditReviewModal from "../components/business/EditReviewModal";


import EditProductModal from "../components/business/EditProductModal";
import EditOfferModal from "../components/business/EditOfferModal";
function BusinessDetails() {

    const { id } = useParams();

    const user = useAuthStore(
        (state) => state.user
    );

    const {
        selectedBusiness,
        fetchBusinessById,
        recordBusinessView,
        deleteProductFromBusiness,
        deleteOfferFromBusiness,
        deleteGalleryFromBusiness,
        isLoading,
        
    } = useBusinessStore();

    const [showAddProduct, setShowAddProduct] =
        useState(false);

    const [showAddOffer, setShowAddOffer] =
        useState(false);

    const [showAddGallery, setShowAddGallery] =
        useState(false);

    const [showAddReview, setShowAddReview] =
        useState(false);


    const [selectedReview, setSelectedReview] =
    useState(null);

const [showEditReview, setShowEditReview] =
    useState(false);

   const [showEditProduct, setShowEditProduct] =
    useState(false);

const [selectedProduct, setSelectedProduct] =
    useState(null); 

 const [showEditOffer, setShowEditOffer] =
    useState(false);

const [selectedOffer, setSelectedOffer] =
    useState(null);   


   useEffect(() => {

    if (!id) return;

    fetchBusinessById(id);

    recordBusinessView(id);

}, [id]);

    if (isLoading) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <h2 className="text-2xl font-bold">

                    Loading business...

                </h2>

            </div>

        );

    }

    if (!selectedBusiness) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <h2 className="text-2xl font-bold">

                    Business not found

                </h2>

            </div>

        );

    }

    const business = selectedBusiness;

    const isOwner =
        business.owner?._id === user?._id;

    return (

        <div className="mx-auto max-w-7xl px-4 py-8">

            <BusinessHero
                business={business}
            />

            <div className="mt-8 grid gap-8 lg:grid-cols-3">

                {/* Left Side */}
                <div className="space-y-12 lg:col-span-2">

                  <ProductSection
    business={business}
    isOwner={false}
    onAddProduct={() =>
        setShowAddProduct(true)
    }

    onEditProduct={(product) => {

        setSelectedProduct(product);

        setShowEditProduct(true);

    }}

    onDeleteProduct={(productId) =>
        deleteProductFromBusiness(
            id,
            productId
        )
    }
/>
                   <OfferSection
    business={business}
    isOwner={false}

    onAddOffer={() =>
        setShowAddOffer(true)
    }

    onEditOffer={(offer) => {

        setSelectedOffer(offer);

        setShowEditOffer(true);

    }}

    onDeleteOffer={(offerId) =>
        deleteOfferFromBusiness(
            id,
            offerId
        )
    }
/>

                    <GallerySection
                        business={business}
                        isOwner={false}
                        onAddGallery={() =>
                            setShowAddGallery(true)
                        }
                        onDeleteGallery={(index) =>
                            deleteGalleryFromBusiness(
                                id,
                                index
                            )
                        }
                    />

                    {/* <ReviewSection
                        business={business}
                        onAddReview={() =>
                            setShowAddReview(true)
                        }
                    /> */}

                    <ReviewSection
    business={business}
    currentUser={user}
    onAddReview={() => setShowAddReview(true)}
    onEditReview={(review) => {

        setSelectedReview(review);

        setShowEditReview(true);

    }}
    onDeleteReview={async () => {

    if (
        window.confirm(
            "Delete your review?"
        )
    ) {

        await deleteReviewFromBusiness(id);

    }

}}
/>

                </div>

                {/* Right Side */}
                <div>

                    <BusinessInfoCard
                        business={business}
                    />

                </div>
 
            </div>

            {/* Modals */}
{/* 
            <AddProductModal
                open={showAddProduct}
                onClose={() =>
                    setShowAddProduct(false)
                }
                businessId={id}
            /> */}


{/* 
            <EditProductModal
    open={showEditProduct}
    onClose={() => {

        setShowEditProduct(false);

        setSelectedProduct(null);

    }}
    businessId={id}
    product={selectedProduct}
/> */}
















            {/* <AddOfferModal
                open={showAddOffer}
                onClose={() =>
                    setShowAddOffer(false)
                }
                businessId={id}
            /> */}
{/* 
            <AddGalleryModal
                open={showAddGallery}
                onClose={() =>
                    setShowAddGallery(false)
                }
                businessId={id}
            /> */}

            <AddReviewModal
                open={showAddReview}
                onClose={() =>
                    setShowAddReview(false)
                }
                businessId={id}
            />



            

<EditReviewModal
    open={showEditReview}
    review={selectedReview}
    businessId={id}
    onClose={() => {

        setShowEditReview(false);
        setSelectedReview(null);

    }}
/>     


{/* 
<EditOfferModal
    open={showEditOffer}
    businessId={id}
    offer={selectedOffer}
    onClose={() => {

        setShowEditOffer(false);

        setSelectedOffer(null);

    }}
/> */}

        </div>

    );

}

export default BusinessDetails;
