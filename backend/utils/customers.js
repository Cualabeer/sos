import supabase from "../db.js";

export async function getCustomerById(customerId) {
  const { data, error } = await supabase
    .from("users")
    .select("id, full_name, email")
    .eq("id", customerId)
    .eq("role", "customer")
    .single();

  if (error) throw error;
  return data;
}

export async function listCustomers() {
  const { data, error } = await supabase
    .from("users")
    .select("id, full_name, email")
    .eq("role", "customer");

  if (error) throw error;
  return data;
}