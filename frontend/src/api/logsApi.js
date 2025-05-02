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

fetchLogs("workers");

// Usage:
// fetchLogs('users');
// fetchLogs('workers', '/stats');
// fetchLogs('rag', '/clear');
// data.filter( (item) => item.type =="request")
// data.filter((item)=> )
