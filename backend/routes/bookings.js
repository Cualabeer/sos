import express from "express";
import supabase from "../db.js";
import { logAudit } from "../utils/audit.js";

const router = express.Router();

// Create booking
router.post("/", async (req, res) => {
  const { customer_id, garage_id, service_id, mechanic_id, service_type, is_emergency, booking_time } = req.body;

  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([{ customer_id, garage_id, service_id, mechanic_id, service_type, is_emergency, booking_time }])
      .select()
      .single();

    if (error) throw error;

    await logAudit(customer_id, "create_booking", "bookings", data.id, { service_type, is_emergency });

    res.json({ status: "ok", booking: data });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Get bookings for a user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .or(`customer_id.eq.${userId},mechanic_id.eq.${userId}`);

    if (error) throw error;
    res.json({ status: "ok", bookings: data });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Get live mechanics for a garage
router.get("/mechanics/:garageId", async (req, res) => {
  const { garageId } = req.params;
  try {
    const { data, error } = await supabase
      .from("mechanics")
      .select("id,name,lat,lng,is_available")
      .eq("garage_id", garageId);

    if (error) throw error;
    res.json({ status: "ok", mechanics: data });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Update mechanic location
router.put("/mechanic/:mechanicId/location", async (req, res) => {
  const { mechanicId } = req.params;
  const { lat, lng, is_available, user_id } = req.body;

  try {
    const { data, error } = await supabase
      .from("mechanics")
      .update({ lat, lng, is_available })
      .eq("id", mechanicId)
      .select()
      .single();

    if (error) throw error;

    await logAudit(user_id, "update_location", "mechanics", mechanicId, { lat, lng, is_available });

    res.json({ status: "ok", mechanic: data });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

export default router;