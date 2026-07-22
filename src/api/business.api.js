import api from "./axios";

// ======================
// Get Nearby Businesses
// ======================

export const getNearbyBusinesses = () =>
    api.get("/businesses/nearby");

// ======================
// Create Business
// ======================

export const createBusiness = (data) =>
    api.post("/businesses", data);

// ======================
// Get Single Business
// ======================

export const getBusinessById = (id) =>
    api.get(`/businesses/${id}`);

// ======================
// Get My Business
// ======================

export const getMyBusiness = async () => {

    const response = await api.get(
        "/businesses/my-business"
    );

    return response.data;

};

// ======================
// Products
// ======================

export const addProduct = (
    businessId,
    product
) =>
    api.post(
        `/businesses/${businessId}/products`,
        product
    );

// ======================
// Update Product
// ======================

export const updateProduct = (
    businessId,
    productId,
    product
) =>
    api.patch(
        `/businesses/${businessId}/products/${productId}`,
        product
    );

// ======================
// Delete Product
// ======================

export const deleteProduct = (
    businessId,
    productId
) =>
    api.delete(
        `/businesses/${businessId}/products/${productId}`
    );

// ======================
// Offers
// ======================

export const addOffer = (
    businessId,
    offer
) =>
    api.post(
        `/businesses/${businessId}/offers`,
        offer
    );

// ======================
// Update Offer
// ======================

export const updateOffer = (
    businessId,
    offerId,
    offer
) =>
    api.patch(
        `/businesses/${businessId}/offers/${offerId}`,
        offer
    );

// ======================
// Delete Offer
// ======================

export const deleteOffer = (
    businessId,
    offerId
) =>
    api.delete(
        `/businesses/${businessId}/offers/${offerId}`
    );

// ======================
// Gallery
// ======================

export const addGalleryImage = (
    businessId,
    image
) =>
    api.post(
        `/businesses/${businessId}/gallery`,
        { image }
    );

export const deleteGalleryImage = (
    businessId,
    imageIndex
) =>
    api.delete(
        `/businesses/${businessId}/gallery/${imageIndex}`
    );

// ======================
// Reviews
// ======================

export const addReview = (
    businessId,
    review
) =>
    api.post(
        `/businesses/${businessId}/reviews`,
        review
    );

export const updateReview = (
    businessId,
    review
) =>
    api.put(
        `/businesses/${businessId}/reviews`,
        review
    );

export const deleteReview = (
    businessId
) =>
    api.delete(
        `/businesses/${businessId}/reviews`
    );

// ======================
// Record Business View
// ======================

export const recordBusinessView = (businessId) => {

    return api.post(
        `/businesses/${businessId}/view`
    );

};


export const getBusinessAnalytics = (businessId) =>
    api.get(`/businesses/${businessId}/analytics`);