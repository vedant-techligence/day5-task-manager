async function handleResponse(response) {
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
    return;
  }
  return response.json();
}

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

export async function getTasks() {
  const response = await fetch("/tasks", { headers: authHeaders() });
  return handleResponse(response);
}

export async function createTask(task) {
  const response = await fetch("/tasks", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(task),
  });
  return handleResponse(response);
}

export async function updateTask(id, updates) {
  const response = await fetch(`/tasks/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
}

export async function deleteTask(id) {
  const response = await fetch(`/tasks/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
    return;
  }
  return response.ok;
}