import React, { useState } from "react";
import Customers from "./Customers";
import Garages from "./Garages";
import Bookings from "./Bookings";
import Mechanics from "./Mechanics";
import MechanicMap from "./MechanicMap";
import EndpointTester from "./EndpointTester";

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
          <EndpointTester /> {/* New mini Postman inside dashboard */}
        </div>
        <div style={{ flex: 2 }}>
          <MechanicMap garageId={selectedGarage} customerLocation={customerLocation} />
        </div>
      </div>
    </div>
  );
}