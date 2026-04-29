export async function apiFetch(endpoint, options = {}) {
  const base = API.replace(/\/$/, ""); // rimuove slash finale
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

console.log("API:", API);
console.log("endpoint:", endpoint);
console.log("FULL:", `${API}${endpoint}`);