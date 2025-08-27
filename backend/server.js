import express from "express";
import dotenv from "dotenv";
import healthRouter from "./routes/health.js";
import bookingsRouter from "./routes/bookings.js";
import usersRouter from "./routes/users.js";

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use("/health", healthRouter);
app.use("/bookings", bookingsRouter);
app.use("/users", usersRouter);

// Root
app.get("/", (req, res) => res.send("Garage Backend running ✅"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));