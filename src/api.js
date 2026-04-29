export async function apiFetch(endpoint, options = {}) {
  const base = API.replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const res = await fetch(`${base}${path}`, {
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