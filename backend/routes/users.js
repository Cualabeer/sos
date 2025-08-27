import express from "express";
import { getCustomerById, listCustomers } from "../utils/customers.js";
import { getGarageById, listGarages } from "../utils/garages.js";

const router = express.Router();

// Customers
router.get("/customers/:id", async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id);
    res.json({ status: "ok", customer });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.get("/customers", async (req, res) => {
  try {
    const customers = await listCustomers();
    res.json({ status: "ok", customers });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Garages
router.get("/garages/:id", async (req, res) => {
  try {
    const garage = await getGarageById(req.params.id);
    res.json({ status: "ok", garage });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.get("/garages", async (req, res) => {
  try {
    const garages = await listGarages();
    res.json({ status: "ok", garages });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

export default router;