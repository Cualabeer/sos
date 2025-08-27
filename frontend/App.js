import React, { useState } from "react";
import InitPage from "./components/InitPage";
import Dashboard from "./components/Dashboard"; // your main dashboard

function App() {
  const [ready, setReady] = useState(false);

  return (
    <div>
      {!ready && <InitPage onComplete={() => setReady(true)} />}
      {ready && <Dashboard />}
    </div>
  );
}

export default App;