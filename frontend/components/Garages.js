import React, { useEffect, useState } from "react";
import { fetchData, endpoints } from "../services/api";

export default function Garages() {
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetchData(endpoints.garages);
      if (res.success) setGarages(res.data);
    }
    load();
  }, []);

  return (
    <div>
      <h2>Garages</h2>
      {garages.map(g => (
        <div key={g.id} style={{ border: "1px solid #ccc", margin: 5, padding: 5 }}>
          <strong>{g.name}</strong> — {g.address}
        </div>
      ))}
    </div>
  );
}