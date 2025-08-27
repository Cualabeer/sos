import React, { useEffect, useState } from "react";
import { fetchData, endpoints } from "../services/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetchData(endpoints.customers);
      if (res.success) setCustomers(res.data);
    }
    load();
  }, []);

  return (
    <div>
      <h2>Customers</h2>
      {customers.map(c => (
        <div key={c.id} style={{ border: "1px solid #ccc", margin: 5, padding: 5 }}>
          <strong>{c.name}</strong> — {c.email}
        </div>
      ))}
    </div>
  );
}