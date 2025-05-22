const logs = [
  {
    id: "62b59021-df9b-4118-8458-0c4a4d75c935",
    timestamp: "2025-05-21T02:26:32.104551",
    type: "request",
    method: "GET",
    path: "/api/v1/logs",
    headers: {
      host: "localhost",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0",
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language":
        "es-419,es;q=0.9,es-ES;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5,es-CO;q=0.4,de-DE;q=0.3,de;q=0.2",
      origin: "http://localhost:5173",
      referer: "http://localhost:5173/",
      "sec-ch-ua":
        '"Chromium";v="136", "Microsoft Edge";v="136", "Not.A/Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-forwarded-for": "172.21.0.1",
      "x-forwarded-host": "localhost",
      "x-forwarded-port": "80",
      "x-forwarded-prefix": "/api/rag",
      "x-forwarded-proto": "http",
      "x-forwarded-server": "785ada97085e",
      "x-real-ip": "172.21.0.1",
    },
    body: null,
    query_params: {
      limit: "3",
      type_filter: "request",
    },
    client_ip: "172.21.0.4",
  },
  {
    id: "3282695d-b95c-4425-83f6-2ed2581c42f8",
    timestamp: "2025-05-21T02:26:28.479561",
    type: "request",
    method: "GET",
    path: "/metrics",
    headers: {
      host: "rag-service:8000",
      "user-agent": "Prometheus/3.3.0",
      accept:
        "application/openmetrics-text;version=1.0.0;escaping=allow-utf-8;q=0.6,application/openmetrics-text;version=0.0.1;escaping=allow-utf-8;q=0.5,text/plain;version=1.0.0;escaping=allow-utf-8;q=0.4,text/plain;version=0.0.4;escaping=allow-utf-8;q=0.3,*/*;q=0.2",
      "accept-encoding": "gzip",
      "x-prometheus-scrape-timeout-seconds": "10",
    },
    body: null,
    query_params: {},
    client_ip: "172.21.0.2",
  },
  {
    id: "4e4df288-dc7c-439d-b511-39cddb780df9",
    timestamp: "2025-05-21T02:26:13.482680",
    type: "request",
    method: "GET",
    path: "/metrics",
    headers: {
      host: "rag-service:8000",
      "user-agent": "Prometheus/3.3.0",
      accept:
        "application/openmetrics-text;version=1.0.0;escaping=allow-utf-8;q=0.6,application/openmetrics-text;version=0.0.1;escaping=allow-utf-8;q=0.5,text/plain;version=1.0.0;escaping=allow-utf-8;q=0.4,text/plain;version=0.0.4;escaping=allow-utf-8;q=0.3,*/*;q=0.2",
      "accept-encoding": "gzip",
      "x-prometheus-scrape-timeout-seconds": "10",
    },
    body: null,
    query_params: {},
    client_ip: "172.21.0.2",
  },
];

const filterLogsByDate = (logs, dateStr) => {
  return logs.filter((log) => log.timestamp.includes(dateStr));
};

console.log(logs.filter((log) => log.timestamp.includes("2025")));
