export async function getTasks() {
  const response = await fetch('/tasks');
  return response.json();
}

export async function createTask(task) {
  const response = await fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  
  return response.json();
}

export async function updateTask(id, updates) {
  const response = await fetch(`/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`/tasks/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
}