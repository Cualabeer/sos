import React, { useState } from "react";
import Customers from "./Customers";
import Garages from "./Garages";
import Bookings from "./Bookings";
import MechanicMap from "./MechanicMap";

export default function Dashboard() {
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [customerLocation, setCustomerLocation] = useState([51.509865, -0.118092]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Garage Dashboard</h1>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <Customers />
          <Garages />
          <Bookings />
        </div>
        <div style={{ flex: 2 }}>
          <MechanicMap garageId={selectedGarage} customerLocation={customerLocation} />
        </div>
      </div>
    </div>
  );
}