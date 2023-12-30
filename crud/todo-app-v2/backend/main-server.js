const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_app",
  password: "Ac70",
  port: 5432,
});

pool.connect();

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new todo
app.post("/todos", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required for a todo." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO todos (text) VALUES ($1) RETURNING *",
      [text]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update todo route
app.put("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid todo ID." });
  }

  const newText = req.body.text;

  try {
    let result;

    if (newText !== undefined) {
      // Update the text of the todo
      result = await pool.query(
        "UPDATE todos SET text = $1 WHERE id = $2 RETURNING *",
        [newText, id]
      );
    } else if (newText === undefined) {
      //get requested todo
      const requestedTodo = await pool.query(
        "SELECT * FROM todos WHERE id = $1",
        [id]
      );

      //get current state
      currentState = requestedTodo.rows[0].completed;

      const newState = !currentState;

      //set new state in database
      result = await pool.query(
        "UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *",
        [newState, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Todo not found." });
      }
    } else {
      return res.status(400).json({ error: "Invalid request" });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Return the updated todo
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid todo ID." });
  }

  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found." });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
