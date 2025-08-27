import supabase from "../db.js";

export async function getGarageById(garageId) {
  const { data, error } = await supabase
    .from("garages")
    .select("id, name, location, user_id")
    .eq("id", garageId)
    .single();

  if (error) throw error;
  return data;
}

export async function listGarages() {
  const { data, error } = await supabase
    .from("garages")
    .select("id, name, location, user_id");

  if (error) throw error;
  return data;
}