const url = "http://localhost/api/users/api/v1/personas/";
import { API_base } from "./config";
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
export async function createPersona(data_persona){
  const res = await fetch(`${API_base}/personas`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data_persona)
  });
  if (!res.ok) {
      throw new Error('Error creando persona');
  }
  return res.json();
}

export async function updatePersona(id, data_persona){
  const res = await fetch(`${API_base}/personas/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data_persona)
  });
  if (!res.ok) {
      throw new Error('Error actualizando persona');
  }
  return res.json();
}
