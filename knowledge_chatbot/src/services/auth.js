// src/services/auth.js
import api from "./api";

export async function register(username, password) {
  const res = await api.post("/auth/register", { username, password });
  return res.data;
}

export async function login(username, password) {
  const res = await api.post("/auth/login", { username, password });
  return res.data; // expects { access_token, token_type }
}

export function saveToken(token) {
  localStorage.setItem("access_token", token);
}

export function clearToken() {
  localStorage.removeItem("access_token");
}

export function getToken() {
  return localStorage.getItem("access_token");
}
