import React, { useEffect, useState } from "react";
import EndpointTest from "./EndpointTest";
import { testEndpoint, ENDPOINTS } from "../services/api";

export default function InitPage({ onComplete }) {
  const [results, setResults] = useState({});

  useEffect(() => {
    async function runTests() {
      const newResults = {};
      for (const endpoint of ENDPOINTS) {
        let result;
        if (endpoint.method === "POST") {
          result = await testEndpoint(endpoint.path, { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(endpoint.body)
          });
        } else {
          result = await testEndpoint(endpoint.path);
        }
        newResults[endpoint.name] = result;
        setResults({ ...newResults });
      }
      // Check if all endpoints succeeded
      if (Object.values(newResults).every(r => r.success)) {
        onComplete(); // proceed to dashboard
      }
    }

    runTests();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Initializing and Testing Backend</h2>
      {ENDPOINTS.map(ep => (
        <EndpointTest key={ep.name} name={ep.name} result={results[ep.name] || null} />
      ))}
    </div>
  );
}