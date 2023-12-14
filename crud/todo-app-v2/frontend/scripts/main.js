const addTodoBtn = document.getElementById("addTodoBtn");
addTodoBtn.addEventListener("click", async function addTodo() {
  const newTodoInput = document.getElementById("newTodo");
  const todoList = document.getElementById("todoList");

  if (newTodoInput.value.trim() !== "") {
    const todoText = newTodoInput.value.trim();

    try {
      const response = await axios.post("http://localhost:5000/todos", {
        text: todoText,
      });
      const todoItem = createTodoItem(response.data.id, response.data.text);
      todoList.appendChild(todoItem);
      newTodoInput.value = "";
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }
});

async function deleteTodo(id, todoItem) {
  try {
    const response = await axios.delete(`http://localhost:5000/todos/${id}`);
    if (response.status === 200) {
      todoList.removeChild(todoItem);
    } else {
      console.error("Error deleting todo:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

function createTodoItem(id, text) {
  const todoItem = document.createElement("li");
  todoItem.className = "todoItem";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const todoText = document.createElement("span");
  todoText.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    deleteTodo(id, todoItem);
  };

  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(deleteButton);

  return todoItem;
}

// const addTodoBtn = document.getElementById("addTodoBtn");
// addTodoBtn.addEventListener("click", function () {
//   const newTodoInput = document.getElementById("newTodo");
//   const todoList = document.getElementById("todoList");

//   if (newTodoInput.value.trim() !== "") {
//     const todoItem = document.createElement("li");
//     todoItem.className = "todoItem";

//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";

//     checkbox.addEventListener("change", function () {
//       if (checkbox.checked) {
//         console.log("Task completed:", todoText.textContent);
//       } else {
//         console.log("Task marked as incomplete:", todoText.textContent);
//       }
//     });

//     const todoText = document.createElement("span");
//     todoText.textContent = newTodoInput.value;

//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Delete";
//     deleteButton.onclick = function () {
//       todoList.removeChild(todoItem);
//     };

//     todoItem.appendChild(checkbox);
//     todoItem.appendChild(todoText);
//     todoItem.appendChild(deleteButton);

//     todoList.appendChild(todoItem);
//     newTodoInput.value = "";
//   }
// });
