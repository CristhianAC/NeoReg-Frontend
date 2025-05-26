import React from "react";
import LogTable from "../components/LogTable";
function LogPage() {
  return (
    <div>
      <h1>Logs</h1>
      <p>
        <span style={{ fontWeight: "bold" }}>Users: </span>Create, Update,
        Delete
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Workers: </span> Read
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Rag: </span> LLM{" "}
      </p>
      <LogTable />
    </div>
  );
}

export default LogPage;
