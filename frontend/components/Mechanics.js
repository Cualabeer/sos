import React, { useEffect, useState } from "react";
import { fetchData, endpoints } from "../services/api";

export default function Mechanics({ garageId }) {
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    async function load() {
      if (!garageId) return;
      const res = await fetchData(endpoints.mechanics(garageId));
      if (res.success) setMechanics(res.data);
    }
    load();
  }, [garageId]);

  return (
    <div>
      <h2>Mechanics (Garage ID: {garageId})</h2>
      {mechanics.map(m => (
        <div key={m.id} style={{ border: "1px solid #ccc", margin: 5, padding: 5 }}>
          <strong>{m.name}</strong> — Status: {m.is_available ? "Available" : "Busy"} — Location: {m.lat}, {m.lng}
        </div>
      ))}
    </div>
  );
}