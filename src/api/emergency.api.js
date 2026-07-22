import api from "./axios";


// =====================================
// Get Nearby Emergencies
// =====================================

export const getNearbyEmergencies = () =>

    api.get("/emergencies/nearby");


// =====================================
// Create Emergency
// =====================================

export const createEmergency = (data) =>

    api.post("/emergencies", data);


// =====================================
// Resolve Emergency
// =====================================

export const resolveEmergency = (id) =>

    api.patch(

        `/emergencies/${id}/resolve`

    );


// =====================================
// Get Emergency By ID
// =====================================

export const getEmergencyById = (id) =>

    api.get(

        `/emergencies/${id}`

    );


// =====================================
// Respond To Emergency
// =====================================

export const respondToEmergency = (

    id,

    data

) =>

    api.post(

        `/emergencies/${id}/respond`,

        data

    );