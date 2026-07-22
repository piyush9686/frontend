import { create } from "zustand";

import {
    getNearbyBusinesses,
    createBusiness,
    getBusinessById,

    addProduct,
    updateProduct,
    deleteProduct,

    addOffer,
    updateOffer,
    deleteOffer,

    addGalleryImage,
    deleteGalleryImage,

    addReview,
    updateReview,
    deleteReview,

    recordBusinessView as recordBusinessViewAPI,
    getBusinessAnalytics,

} from "../api/business.api";

import { getMyBusiness } from "../api/business.api";

export const useBusinessStore = create((set, get) => ({

    businesses: [],

    selectedBusiness: null,

    myBusiness: null,

    analytics:null,

    isLoading: false,

    // ======================
    // Fetch Businesses
    // ======================

    fetchBusinesses: async () => {

        try {

            set({
                isLoading: true,
            });

            const response =
                await getNearbyBusinesses();

            set({

                businesses:
                    response.data.data,

                isLoading: false,

            });

        } catch (error) {

            set({
                isLoading: false,
            });

            console.error(error);

        }

    },



  




    // ======================
    // Fetch Single Business
    // ======================

    fetchBusinessById: async (id) => {

        try {

            set({
                isLoading: true,
            });

            const response =
                await getBusinessById(id);

            set({

                selectedBusiness:
                    response.data.data,

                isLoading: false,

            });

        } catch (error) {

            set({
                isLoading: false,
            });

            console.error(error);

        }

    },



  // ======================
// Record Business View
// ======================

recordBusinessView: async (businessId) => {

    try {

        await recordBusinessViewAPI(
            businessId
        );

    } catch (error) {

        console.error(error);

    }

},
  

      
    // ======================
// Fetch My Business
// ======================

fetchMyBusiness: async () => {

    try {

        set({
            isLoading: true,
        });

        const response =
            await getMyBusiness();

        set({

            myBusiness:
                response.data.data,

            isLoading: false,

        });

    }

    catch (error) {

        set({

            myBusiness: null,

            isLoading: false,

        });

        console.error(error);

    }

},










    // ======================
    // Create Business
    // ======================

    createNewBusiness: async (data) => {

        try {

            console.log(
                "🏪 Creating business:",
                data
            );

            const response =
                await createBusiness(data);

            console.log(
                "✅ Business created:",
                response.data
            );

            await get().fetchBusinesses();

            return response.data.data;

        } catch (error) {

            console.error(
                "❌ Business creation failed:",
                error.response?.data || error
            );

            throw error;

        }

    },

    // ======================
    // Add Product
    // ======================

    addProductToBusiness: async (
        businessId,
        product
    ) => {

        try {

            await addProduct(
                businessId,
                product
            );

            await get().fetchBusinessById(
                businessId
            );

        } catch (error) {

            console.error(error);

            throw error;

        }

    },


// =====================================
// Update Product
// =====================================

updateProductInBusiness: async (

    businessId,

    productId,

    product

) => {

    try {

        await updateProduct(

            businessId,

            productId,

            product

        );

        await get().fetchBusinessById(

            businessId

        );

    }

    catch (error) {

        console.error(error);

        throw error;

    }

},



    // ======================
    // Delete Product
    // ======================

    deleteProductFromBusiness: async (
        businessId,
        productId
    ) => {

        try {

            await deleteProduct(
                businessId,
                productId
            );

            await get().fetchBusinessById(
                businessId
            );

        } catch (error) {

            console.error(error);

            throw error;

        }

    },

    // ======================
    // Add Offer
    // ======================

    addOfferToBusiness: async (
        businessId,
        offer
    ) => {

        try {

            await addOffer(
                businessId,
                offer
            );

            await get().fetchBusinessById(
                businessId
            );

        } catch (error) {

            console.error(error);

            throw error;

        }

    },




    // =====================================
// Update Offer
// =====================================

updateOfferInBusiness: async (

    businessId,

    offerId,

    offer

) => {

    try {

        await updateOffer(

            businessId,

            offerId,

            offer

        );

        await get().fetchBusinessById(

            businessId

        );

    }

    catch (error) {

        console.error(error);

        throw error;

    }

},

    // ======================
    // Delete Offer
    // ======================

    deleteOfferFromBusiness: async (
        businessId,
        offerId
    ) => {

        try {

            await deleteOffer(
                businessId,
                offerId
            );

            await get().fetchBusinessById(
                businessId
            );

        } catch (error) {

            console.error(error);

            throw error;

        }

    },



// ======================
// Add Gallery Image
// ======================

addGalleryToBusiness: async (
    businessId,
    image
) => {

    await addGalleryImage(
        businessId,
        image
    );

    await get().fetchBusinessById(
        businessId
    );

},


// ======================
// Delete Gallery Image
// ======================

deleteGalleryFromBusiness: async (
    businessId,
    index
) => {

    await deleteGalleryImage(
        businessId,
        index
    );

    await get().fetchBusinessById(
        businessId
    );

},





// ======================
// Add Review
// ======================

addReviewToBusiness: async (
    businessId,
    review
) => {

    try {

        await addReview(
            businessId,
            review
        );

        await get().fetchBusinessById(
            businessId
        );

    } catch (error) {

        console.error(error);

        throw error;

    }

},

// ======================
// Update Review
// ======================

updateReviewInBusiness: async (
    businessId,
    review
) => {

    try {

        await updateReview(
            businessId,
            review
        );

        await get().fetchBusinessById(
            businessId
        );

    } catch (error) {

        console.error(error);

        throw error;

    }

},



// ======================
// Delete Review
// ======================

deleteReviewFromBusiness: async (
    businessId
) => {

    try {

        await deleteReview(
            businessId
        );

        await get().fetchBusinessById(
            businessId
        );

    } catch (error) {

        console.error(error);

        throw error;

    }

},


fetchBusinessAnalytics: async (businessId) => {

    try {

        const response = await getBusinessAnalytics(businessId);

        set({

            analytics: response.data.data,

        });

    } catch (error) {

        console.error(error);

    }

},



}));









