export const API = import.meta.env.VITE_API_URL;

export function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  };
}

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API}${endpoint}`, {
    ...options,
    headers: {
      ...authHeaders(),
      ...options.headers
    }
  });

  let data;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("token");

    window.location.href = "/login";
    return;
  }

  return {
    ok: res.ok,
    status: res.status,
    data
  };
}