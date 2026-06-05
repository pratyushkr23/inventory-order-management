const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

console.log(
  "API_BASE_URL =",
  API_BASE_URL
);

export async function getDashboardSummary() {
  const response = await fetch(
    `${API_BASE_URL}/dashboard/summary`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
}