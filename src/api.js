export const API = "http://localhost:3000";

export function authHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
}

export async function apiFetch(url, options = {}) {
    const res = await fetch(url, options);

    if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
    }

    return res.json();
}