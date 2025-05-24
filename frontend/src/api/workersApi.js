const baseUrl = "http://localhost/api/workers/";
import { API_base } from "./config";

export async function getWorkers() {
  try {
    const response = await fetch(
      "http://localhost/api/workers/api/v1/workers/"
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}
export async function fetchWorker(id) {
  const res = await fetch(`http://localhost/api/workers/api/v1/workers/${id}`);
  if(!res.ok) {
      throw new Error('Error fetching worker');
  }
  return res.json();
}