const baseUrl = "http://localhost/api/workers/";

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
