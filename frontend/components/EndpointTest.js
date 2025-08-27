import React from "react";

export default function EndpointTest({ name, result }) {
  return (
    <div style={{ marginBottom: 10, padding: 10, border: "1px solid #ccc" }}>
      <strong>{name}</strong>
      <div>
        {result === null && <span>Testing...</span>}
        {result && result.success && <span style={{ color: "green" }}>✅ Success</span>}
        {result && !result.success && <span style={{ color: "red" }}>❌ {result.error}</span>}
      </div>
      {result && result.data && <pre style={{ maxHeight: 100, overflow: "auto" }}>{JSON.stringify(result.data, null, 2)}</pre>}
    </div>
  );
}