import React, { useState } from "react";
import { fetchData, postData } from "../services/api";

export default function EndpointTester() {
  const [method, setMethod] = useState("GET");
  const [path, setPath] = useState("/health");
  const [body, setBody] = useState("{}");
  const [response, setResponse] = useState("");

  const handleTest = async () => {
    try {
      let res;
      if (method === "POST" || method === "PUT") {
        res = await fetchData(path, {
          method,
          headers: { "Content-Type": "application/json" },
          body
        });
      } else {
        res = await fetchData(path);
      }
      setResponse(JSON.stringify(res, null, 2));
    } catch (err) {
      setResponse(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Live Endpoint Tester</h2>
      <div>
        <label>Method: </label>
        <select value={method} onChange={e => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
      </div>
      <div>
        <label>Endpoint Path: </label>
        <input value={path} onChange={e => setPath(e.target.value)} style={{ width: 300 }} />
      </div>
      {(method === "POST" || method === "PUT") && (
        <div>
          <label>Body (JSON): </label><br />
          <textarea value={body} onChange={e => setBody(e.target.value)} rows={5} cols={50} />
        </div>
      )}
      <button onClick={handleTest} style={{ marginTop: 10 }}>Test Endpoint</button>
      {response && (
        <div>
          <h4>Response:</h4>
          <pre style={{ maxHeight: 300, overflow: "auto", background: "#f7f7f7" }}>{response}</pre>
        </div>
      )}
    </div>
  );
}