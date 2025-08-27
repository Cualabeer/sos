import React, { useState } from "react";
import { postData } from "../services/api";

export default function GarageSignup() {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postData("/users/garages/apply", form);
    setStatus(res.success ? "Application submitted ✅" : "Error: " + res.error);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Garage Signup</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Garage Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /><br/>
        <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /><br/>
        <input placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} required /><br/>
        <button type="submit">Apply</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}