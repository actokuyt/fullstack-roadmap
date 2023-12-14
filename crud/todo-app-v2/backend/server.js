const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo_app',
  password: 'Ac70',
  port: 5432,
});

app.use(express.json());
app.use(cors());

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new todo
app.post('/todos', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required for a todo.' });
  }

  try {
    const result = await pool.query('INSERT INTO todos (text) VALUES ($1) RETURNING *', [text]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid todo ID.' });
  }

  try {
    const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});














// const fs = require('fs');
// const path = require('path');

// const TODO_FILE = path.join(__dirname, 'todos.json');

// // Load existing todos from file or initialize an empty array
// let todos = [];
// if (fs.existsSync(TODO_FILE)) {
//   const data = fs.readFileSync(TODO_FILE, 'utf8');
//   todos = JSON.parse(data);
// }

// // Function to save todos to file
// function saveTodos() {
//   fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2), 'utf8');
// }

// // Function to add a new todo
// function addTodo(description) {
//   const newTodo = {
//     id: todos.length + 1,
//     description,
//     done: false,
//   };
//   todos.push(newTodo);
//   saveTodos();
//   console.log(`New todo added: "${description}"`);
// }

// // Function to list todos based on status (all, pending, done)
// function listTodos(status) {
//   let filteredTodos = todos;
//   if (status === 'pending') {
//     filteredTodos = todos.filter((todo) => !todo.done);
//   } else if (status === 'done') {
//     filteredTodos = todos.filter((todo) => todo.done);
//   }

//   console.log(`Listing ${status} todos:`);
//   filteredTodos.forEach((todo) => {
//     console.log(`${todo.id}. [${todo.done ? 'x' : ' '}] ${todo.description}`);
//   });
// }

// // Function to mark a todo as done
// function markTodoDone(id) {
//   const todo = todos.find((todo) => todo.id === id);
//   if (todo) {
//     todo.done = true;
//     saveTodos();
//     console.log(`Todo ${id} marked as done.`);
//   } else {
//     console.error(`Todo with ID ${id} not found.`);
//   }
// }

// // Function to delete a todo
// function deleteTodo(id) {
//   const index = todos.findIndex((todo) => todo.id === id);
//   if (index !== -1) {
//     const deletedTodo = todos.splice(index, 1)[0];
//     saveTodos();
//     console.log(`Deleted todo: "${deletedTodo.description}"`);
//   } else {
//     console.error(`Todo with ID ${id} not found.`);
//   }
// }

// // Parse command-line arguments
// const [, , command, ...args] = process.argv;

// // Execute the appropriate action based on the command
// switch (command) {
//   case '--new':
//     if (args.length > 0) {
//       addTodo(args.join(' '));
//     } else {
//       console.error('Please provide a description for the new todo.');
//     }
//     break;

//   case '--list':
//     const status = args[0] || 'all';
//     listTodos(status);
//     break;

//   case '--done':
//     const todoId = parseInt(args[0], 10);
//     if (!isNaN(todoId)) {
//       markTodoDone(todoId);
//     } else {
//       console.error('Please provide a valid todo ID to mark as done.');
//     }
//     break;

//   case '--delete':
//     const deleteId = parseInt(args[0], 10);
//     if (!isNaN(deleteId)) {
//       deleteTodo(deleteId);
//     } else {
//       console.error('Please provide a valid todo ID to delete.');
//     }
//     break;

//   case '--help':
//     console.log('Available options:');
//     console.log('--new <description>: Add a new todo item');
//     console.log('--list [all|pending|done]: List todo items');
//     console.log('--done <id>: Mark a todo item as done');
//     console.log('--delete <id>: Delete a todo item');
//     console.log('--help: List all the available options');
//     console.log('--version: Print the version of the application');
//     break;

//   case '--version':
//     console.log('Todo List CLI v1.0.0');
//     break;

//   default:
//     console.error('Invalid command. Use --help for the list of available options.');
//     break;
// }
