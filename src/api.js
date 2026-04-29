export const API = import.meta.env.VITE_API_URL;

export function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  };
}

export async function apiFetch(endpoint, options = {}, useAuth = true) {
  const base = API.replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...(useAuth ? authHeaders() : {}),
    ...options.headers
  };

  const res = await fetch(`${base}${path}`, {
    ...options,
    headers
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