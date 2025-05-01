import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect } from "react";
import { getWorkers } from "../api/workersApi";
function LogTable() {
  const requests = [
    {
      id: "a16557d4-7e51-4bf5-8a86-8ea7ce2ea6ef",
      timestamp: "2025-05-01T02:45:55.139886",
      type: "request",
      method: "GET",
      path: "/api/v1/logs",
      headers: {
        host: "localhost",
        "user-agent": "PostmanRuntime/7.43.4",
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "postman-token": "29113680-bd01-4fbe-b3c9-986a003e8450",
        "x-forwarded-for": "172.21.0.1",
        "x-forwarded-host": "localhost",
        "x-forwarded-port": "80",
        "x-forwarded-prefix": "/api/workers",
        "x-forwarded-proto": "http",
        "x-forwarded-server": "74d01d99c119",
        "x-real-ip": "172.21.0.1",
      },
      body: null,
      query_params: {},
      client_ip: "172.21.0.4",
    },
  ];

  const responses = [
    {
      id: "74a3a8fc-67b0-4944-a714-ea2559b9d64b",
      timestamp: "2025-05-01T02:45:47.579251",
      type: "response",
      status_code: 404,
      headers: {
        "content-length": "22",
        "content-type": "application/json",
      },
      body: {
        detail: "Not Found",
      },
      processing_time_ms: 1.2149810791015625,
    },
  ];
  return (
    <div>
      <DataTable value={requests} tableStyle={{ minWidth: "50rem" }}>
        <Column field="type" header="Type"></Column>
        <Column field="method" header="Method"></Column>
        <Column field="path" header="Path"></Column>
      </DataTable>
      <DataTable value={responses} tableStyle={{ minWidth: "50rem" }}>
        <Column field="type" header="Type"></Column>
        <Column field="status_code" header="Status Code"></Column>
      </DataTable>
    </div>
  );
}

export default LogTable;
