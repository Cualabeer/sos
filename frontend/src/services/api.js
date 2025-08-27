import { createClient } from "@supabase/supabase-js";

// Use Render environment variables
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helpers
export async function fetchData(path, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, options);
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function postData(path, body) {
  return fetchData(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

// Endpoint list
export const ENDPOINTS = [
  { name: "Health Check", path: "/health" },
  { name: "List Customers", path: "/users/customers" },
  { name: "List Garages", path: "/users/garages" },
  { name: "List Bookings", path: "/bookings" }
];

export const endpoints = {
  customers: "/users/customers",
  garages: "/users/garages",
  bookings: "/bookings",
  mechanics: (garage_id) => `/bookings/mechanics/${garage_id}`
};