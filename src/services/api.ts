const API_BASE_URL = "https://pm-api.deval.us/api";

export const apiCall = async (
  endpoint: string,
  method: string,
  body?: object,
  authRequired = true
) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authRequired) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return await response.json();
};