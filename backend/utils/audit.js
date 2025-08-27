import supabase from "../db.js";

export async function logAudit(user_id, action, entity, entity_id, details = {}) {
  await supabase
    .from("audit_logs")
    .insert([{ user_id, action, entity, entity_id, details }]);
}