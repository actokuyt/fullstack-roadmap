import { deleteTodo, fetchTodos, completeTodo, addTodoItem } from "./todoservice.js";

document.addEventListener("DOMContentLoaded", () => {
  // Attach event listeners to dynamically created elements
  document.addEventListener("click", handleButtonClick);

  // Fetch and display initial todo list
  displayTodosInUI();
});

async function displayTodosInUI() {
  // Get current todo list element
  const todoList = document.getElementById("todoList");

  // Clear existing content
  todoList.innerHTML = "";

  // Get todo items from db
  let todos;

  try {
    todos = await fetchTodos();
  } catch (error) {
    console.error("Error fetching todos:", error);
    return;
  }

  // Create and append elements for each todo
  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.className = "todoItem";
    todoItem.setAttribute("id", `${todo.id}`);

    // const checkbox = document.createElement("input");
    // checkbox.type = "checkbox";

    const todoText = document.createElement("span");
    todoText.textContent = todo.text;

    const completeButton = document.createElement("button");
    completeButton.textContent = "complete";
    completeButton.setAttribute("id", "completeBtn");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("id", "deleteBtn");

    todoItem.appendChild(todoText);
    todoItem.appendChild(completeButton);
    todoItem.appendChild(deleteButton);

    todoList.appendChild(todoItem);
  });
}

async function handleButtonClick(event) {
  const target = event.target;

  // Check if the clicked element is a "Add" button
  if (target.id === "addTodoBtn") {
    const todoList = document.getElementById("todoList");
    const newTodoInput = document.getElementById("newTodoInput");
    if (newTodoInput.value.trim() !== "") {
      const todoText = newTodoInput.value.trim();
      let response;
      try {
        response = await addTodoItem(todoText);
        if (response.status === 200) {
          const todoItem = createTodoItem(response.data.id, response.data.text);
          todoList.appendChild(todoItem);
          newTodoInput.value = "";
        }
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  }

  // Check if the clicked element is a "Delete" button
  if (target.id === "deleteBtn") {
    const todoList = document.getElementById("todoList");

    // get parent node and it's id
    const parent = event.target.parentNode;
    const parentId = event.target.parentNode.id;
    let response;

    try {
      response = await deleteTodo(parentId);
      if (response.status === 200) {
        todoList.removeChild(parent);
      } else {
        console.error("Error deleting todo:", response.statusText);
      }
    } catch (error) {
      console.log("error deleting todo");
    }
  }

  // Check if the clicked element is a "Complete" button
  if (target.id === "completeBtn") {
    // get parent node and it's id
    const parent = event.target.parentNode;
    const todoText = parent.children[0];
    const parentId = event.target.parentNode.id;
    let response;

    try{
      response = await completeTodo(parentId);
      if (response.status === 200) {
        todoText.classList.add("completed");
      } else {
        console.error("Error completing todo:", response.statusText);
      }
    } catch (error) {
      console.log("error completing todo");
    }
  }

  // Check if the clicked element is an "Edit" button
  if (target.classList.contains("edit-button")) {
    const todoId = target.dataset.id;
    const newText = prompt("Enter the new text for the todo:");

    if (newText !== null) {
      try {
        const updatedTodo = await updateTodo(todoId, newText);
        // Update the UI to reflect the changes
        updateTodoInUI(updatedTodo);
      } catch (error) {
        // Handle errors, e.g., display an error message to the user
        console.error("Error updating todo:", error);
      }
    }
  }
}

function createTodoItem(id, text) {
  const todoItem = document.createElement("li");
  todoItem.className = "todoItem";
  todoItem.setAttribute("id", `${id}`);

  // const checkbox = document.createElement("input");
  // checkbox.type = "checkbox";

  const todoText = document.createElement("span");
  todoText.textContent = text;

  const completeButton = document.createElement("button");
  completeButton.textContent = "complete";
  completeButton.setAttribute("id", "completeBtn");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("id", "deleteBtn");

  todoItem.appendChild(todoText);
  todoItem.appendChild(completeButton);
  todoItem.appendChild(deleteButton);

  return todoItem;
}

function updateTodoInUI(updatedTodo) {
  // Implement logic to update the UI with the modified todo
  // This might involve finding the todo element in the DOM and updating its text
}
