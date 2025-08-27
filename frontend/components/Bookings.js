import React, { useEffect, useState } from "react";
import { fetchData, endpoints } from "../services/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetchData(endpoints.bookings);
      if (res.success) setBookings(res.data);
    }
    load();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      {bookings.map(b => (
        <div key={b.id} style={{ border: "1px solid #ccc", margin: 5, padding: 5 }}>
          Customer: {b.customer_id} — Garage: {b.garage_id} — Service: {b.service_type} — Emergency: {b.is_emergency ? "Yes" : "No"}
        </div>
      ))}
    </div>
  );
}