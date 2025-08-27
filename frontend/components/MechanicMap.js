import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { fetchData, endpoints } from "../services/api";

export default function MechanicMap({ garageId, customerLocation }) {
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    async function loadMechanics() {
      if (!garageId) return;
      const res = await fetchData(endpoints.mechanics(garageId));
      if (res.success) setMechanics(res.data);
    }
    loadMechanics();
    // live updates every 15s
    const interval = setInterval(loadMechanics, 15000);
    return () => clearInterval(interval);
  }, [garageId]);

  // Helper for distance-based privacy
  function displayLocation(mechanic) {
    if (!customerLocation) return [mechanic.lat, mechanic.lng];
    const distance = getDistance(customerLocation, [mechanic.lat, mechanic.lng]);
    // show exact if within 10 miles (~16 km)
    if (distance <= 16) return [mechanic.lat, mechanic.lng];
    // otherwise randomize location ~1 km
    return [
      mechanic.lat + (Math.random() - 0.5) * 0.01,
      mechanic.lng + (Math.random() - 0.5) * 0.01
    ];
  }

  // Simple Haversine approximation
  function getDistance([lat1, lng1], [lat2, lng2]) {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  return (
    <MapContainer
      center={customerLocation || [51.509865, -0.118092]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {mechanics.map((m) => (
        <Marker key={m.id} position={displayLocation(m)}>
          <Popup>
            {m.name} <br />
            Status: {m.is_available ? "Available" : "Busy"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}