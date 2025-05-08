const url = "http://localhost/api/users/api/v1/personas/";

export async function deleteUser(id) {
  const response = await fetch(`${url + id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete user");
  }
  return response.json(); // Or response.text() if the API returns plain text
}
