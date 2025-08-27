const BASE_URL = "https://sos1.onrender.com";

export async function testEndpoint(path, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, options);
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export const ENDPOINTS = [
  { name: "Health Check", path: "/health" },
  { name: "List Customers", path: "/users/customers" },
  { name: "List Garages", path: "/users/garages" },
  // Add any demo UUIDs to test single endpoints
  { name: "Create Booking (test)", path: "/bookings", method: "POST", body: {
      "customer_id": "<demo_customer_uuid>",
      "garage_id": "<demo_garage_uuid>",
      "service_id": 1,
      "mechanic_id": "<demo_mechanic_uuid>",
      "service_type": "mobile",
      "is_emergency": true,
      "booking_time": new Date().toISOString()
  }},
];