// api.ts - utilidades para consumir el backend ASP.NET Core con JWT

const API_URL = 'http://localhost:5000/api'; // Ajusta el puerto si es necesario

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('Login inválido');
  const data = await res.json();
  return data.token;
}

export async function getUsers(token: string) {
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('No autorizado');
  return await res.json();
}

export async function addUser(user: { username: string; email: string; password: string }, token: string) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error('No autorizado');
  return await res.json();
}

export async function updateUser(user: { id: number; username: string; email: string; password: string }, token: string) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error('No autorizado');
  return await res.json();
}

export async function deleteUser(id: number, token: string) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('No autorizado');
  return await res.json();
}
