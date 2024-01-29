const API_URL = "https://backend-service-h1x1.onrender.com/todos";

async function fetchTodos() {
  try {
    // Make a GET request to fetch todos from the server
    const response = await axios.get(`${API_URL}`);
    const todos = response.data;
    return todos;
  } catch (error) {
    // If there's an error, reject the promise with the error
    console.log("there's an Error");
    throw error;
  }
}

async function addTodoItem(todoText) {
  try {
    const response = await axios.post(`${API_URL}`, {
      text: todoText,
    });
    return response;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
}

async function completeTodo(id) {
  try {
    const response = await axios.put(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("Error modifying todo:", error);
  }
}

async function editTodo(id, newText) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { text: newText });
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}

async function deleteTodo(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

export { fetchTodos, deleteTodo, completeTodo, addTodoItem, editTodo };
