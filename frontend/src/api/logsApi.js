export async function fetchLogs(endpoint, option = "") {
  try {
    const response = await fetch(
      `http://localhost/api/${endpoint}/api/v1/logs${option}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint} logs: ${error}`);
  }
}

export function fetchLogsFilter(
  endpoint,
  { limit = 100, type_filter, method_filter } = {}
) {
  const params = new URLSearchParams({
    limit,
    ...(type_filter && { type_filter }),
    ...(method_filter && { method_filter }),
  });
  const url = `http://localhost/api/${endpoint}/api/v1/logs?${params}`;
  try {
    return url;
  } catch (error) {
    console.error(`Error fetching ${endpoint} logs:`, error);
  }
}

// Usage:
// fetchLogs('users');
// fetchLogs('workers', '/stats');
// fetchLogs('rag', '/clear');

/* fetchLogsFilter("users"); // Only limit=100
fetchLogsFilter("users", { limit: 5, type_filter: "response" }); // limit=100 + type_filter
fetchLogsFilter("users", { type_filter: "request", method_filter: "GET" }); */
