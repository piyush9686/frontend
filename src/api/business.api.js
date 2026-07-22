import api from "./axios";

// ======================
// Get Nearby Businesses
// ======================

export const getNearbyBusinesses = () =>
    api.get("/api/v1/businesses/nearby");

// ======================
// Create Business
// ======================

export const createBusiness = (data) =>
    api.post("/api/v1/businesses", data);

// ======================
// Get Single Business
// ======================

export const getBusinessById = (id) =>
    api.get(`/api/v1/businesses/${id}`);

// ======================
// Get My Business
// ======================

export const getMyBusiness = async () => {

    const response = await api.get(
        "/api/v1/businesses/my-business"
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
        `/api/v1/businesses/${businessId}/products`,
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
        `/api/v1/businesses/${businessId}/products/${productId}`,
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
        `/api/v1/businesses/${businessId}/products/${productId}`
    );

// ======================
// Offers
// ======================

export const addOffer = (
    businessId,
    offer
) =>
    api.post(
        `/api/v1/businesses/${businessId}/offers`,
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
        `/api/v1/businesses/${businessId}/offers/${offerId}`,
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
        `/api/v1/businesses/${businessId}/offers/${offerId}`
    );

// ======================
// Gallery
// ======================

export const addGalleryImage = (
    businessId,
    image
) =>
    api.post(
        `/api/v1/businesses/${businessId}/gallery`,
        { image }
    );

export const deleteGalleryImage = (
    businessId,
    imageIndex
) =>
    api.delete(
        `/api/v1/businesses/${businessId}/gallery/${imageIndex}`
    );

// ======================
// Reviews
// ======================

export const addReview = (
    businessId,
    review
) =>
    api.post(
        `/api/v1/businesses/${businessId}/reviews`,
        review
    );

export const updateReview = (
    businessId,
    review
) =>
    api.put(
        `/api/v1/businesses/${businessId}/reviews`,
        review
    );

export const deleteReview = (
    businessId
) =>
    api.delete(
        `/api/v1/businesses/${businessId}/reviews`
    );

// ======================
// Record Business View
// ======================

export const recordBusinessView = (businessId) => {

    return api.post(
        `/api/v1/businesses/${businessId}/view`
    );

};


export const getBusinessAnalytics = (businessId) =>
    api.get(`/api/v1/businesses/${businessId}/analytics`);