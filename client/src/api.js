const BASE_URL = "http://localhost:5000/api/visits";

// Fetch all guest visits
export async function getVisits() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch visits");
  return response.json();
}

// Add a new visit
export async function addVisit(visitData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(visitData),
  });
  if (!response.ok) throw new Error("Failed to add visit");
  return response.json();
}

// Update a visit
export async function updateVisit(id, visitData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(visitData),
  });
  if (!response.ok) throw new Error("Failed to update visit");
  return response.json();
}

// Delete a visit
export async function deleteVisit(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete visit");
  return response.json();
}
