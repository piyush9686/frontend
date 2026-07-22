import api from "./axios";


// =====================================
// Get Nearby Emergencies
// =====================================

export const getNearbyEmergencies = () =>

    api.get("/api/v1/emergencies/nearby");


// =====================================
// Create Emergency
// =====================================

export const createEmergency = (data) =>

    api.post("/api/v1/emergencies", data);


// =====================================
// Resolve Emergency
// =====================================

export const resolveEmergency = (id) =>

    api.patch(

        `/api/v1/emergencies/${id}/resolve`

    );


// =====================================
// Get Emergency By ID
// =====================================

export const getEmergencyById = (id) =>

    api.get(

        `/api/v1/emergencies/${id}`

    );


// =====================================
// Respond To Emergency
// =====================================

export const respondToEmergency = (

    id,

    data

) =>

    api.post(

        `/api/v1/emergencies/${id}/respond`,

        data

    );