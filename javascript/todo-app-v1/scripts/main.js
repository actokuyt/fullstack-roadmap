let todoItemCount = 0;

// Function to create a new todo item
const createTodoListHandler = () => {
  // Get the input value
  let inputFieldValue = document.getElementById("inputField").value;

  // Create a new list item
  const todoItem = document.createElement("li");

  // Create a <span> element to display the todo text
  const todoText = document.createElement("span");
  todoText.appendChild(document.createTextNode(inputFieldValue));
  todoText.setAttribute("id", "todoText" + todoItemCount);
  todoText.style.textDecoration = "none";

  // Create an "Edit" button with a click event handler
  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("edit"));
  editBtn.addEventListener("click", (event) => {
    const editTodo = event.target.parentElement.querySelector("span");

    if (editTodo !== null) {
      // If <span> exists, replace with an input field for editing
      const editTodoInputField = document.createElement("input");
      editTodoInputField.value = editTodo.innerHTML;
      event.target.parentElement.replaceChild(editTodoInputField, editTodo);
    } else {
      // If <span> is not found, handle accordingly
      console.log("No <span> element found.");
      const editedTodo = event.target.parentElement.querySelector("input");
      const editedTodoText = document.createElement("span");
      editedTodoText.appendChild(document.createTextNode(editedTodo.value));
      event.target.parentElement.replaceChild(editedTodoText, editedTodo);
    }
  });

  // Create a "Delete" button with a click event handler
  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("delete"));
  deleteBtn.addEventListener("click", (event) => {
    const deletedTodo = event.target.parentElement;
    deletedTodo.remove();
  });

  // Create a "Complete" button with a click event handler
  const completeBtn = document.createElement("button");
  completeBtn.appendChild(document.createTextNode("finished"));
  completeBtn.addEventListener("click", (event) => {
    const completedTodoTextBtn = event.target;
    const completedTodoText = event.target.parentElement.querySelector("span");

    if (completedTodoText.style.textDecoration != "line-through") {
      completedTodoText.style.textDecoration = "line-through";
      completedTodoTextBtn.textContent = "unfinished";
    } else {
      completedTodoText.style.textDecoration = "none";
      completedTodoTextBtn.textContent = "finished";
    }
  });

  // Append elements to the todo item
  todoItem.appendChild(todoText);
  todoItem.appendChild(editBtn);
  todoItem.appendChild(completeBtn);
  todoItem.appendChild(deleteBtn);

  // Append the todo item to the list of todos
  const todoItems = document.getElementById("todoItems");
  todoItems.appendChild(todoItem);

  // Increment the item count
  ++todoItemCount;
};

// Function to open the input field for adding a new todo
const openNewTodoInputFieldHandler = () => {
  inputArea.style.display = "flex";
};

// Function to add a new todo item to the list
const addNewTodoItemToListHandler = () => {
  let inputFieldValue = document.getElementById("inputField").value;
  if (inputFieldValue.length < 1) {
    return;
  }

  createTodoListHandler();
  document.getElementById("inputField").value = "";
  inputArea.style.display = "none";
};

// Add event listeners to buttons
const addNewTodoBtn = document.getElementById("addNewTodoBtn");
addNewTodoBtn.addEventListener("click", openNewTodoInputFieldHandler);

const inputArea = document.getElementById("inputArea");

const addNewTodoItemToListBtn = document.getElementById(
  "addNewTodoItemToListBtn"
);
addNewTodoItemToListBtn.addEventListener("click", addNewTodoItemToListHandler);
