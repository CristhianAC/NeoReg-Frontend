import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import LogDropdown from "./LogDropdown";
import { fetchLogsFilter, fetchLogs } from "../api/logsApi";
function LogTable() {
  const [view, setView] = useState("none");
  const [showTables, setShowTables] = useState(false);
  const [logEndpoint, setLogEndpoint] = useState("none");
  const [params, setParams] = useState({});
  const [logs, setLogs] = useState({});
  console.log(`view: ${view}. endpoint ${logEndpoint}`);

  useEffect(() => {
    if (showTables && logEndpoint !== "none") {
      const fetchData = async () => {
        const url = fetchLogsFilter(logEndpoint, params);
        console.log(url);
        const data = await fetchLogs(url);
        setLogs(data);
      };
      fetchData();
    }
  }, [showTables, logEndpoint, params]);

  return (
    <div>
      <LogDropdown
        setLogEndpoint={setLogEndpoint}
        setParams={setParams}
        setShowTables={setShowTables}
      />
      {params.type_filter == "request" && (
        <>
          <DataTable value={logs} tableStyle={{ minWidth: "50rem" }}>
            <Column field="type" header="Type"></Column>
            <Column field="method" header="Method"></Column>
            <Column field="path" header="Path"></Column>
          </DataTable>
        </>
      )}

      {params.type_filter == "response" && (
        <>
          <DataTable value={logs} tableStyle={{ minWidth: "50rem" }}>
            <Column field="type" header="Type"></Column>
            <Column field="status_code" header="Status Code"></Column>
          </DataTable>
        </>
      )}
    </div>
  );
}

export default LogTable;
