const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  try {
    const tasks = db
      .prepare("SELECT * FROM tasks WHERE user_id = ?")
      .all(req.user.id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", (req, res) => {
  try {
    const { title, urgent = 0, important = 0 } = req.body;
    if (!title || title.trim() === "")
      return res.status(400).json({ error: "Title is required" });

    const result = db
      .prepare(
        "INSERT INTO tasks (title, urgent, important, user_id) VALUES (?, ?, ?, ?)",
      )
      .run(title, urgent, important, req.user.id);
    const task = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(result.lastInsertRowid);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const existingTask = db
      .prepare("SELECT * FROM tasks WHERE id = ? AND user_id = ?")
      .get(id, req.user.id);
    if (!existingTask) return res.status(404).json({ error: "Task not found" });

    const title =
      req.body.title !== undefined ? req.body.title : existingTask.title;
    const completed =
      req.body.completed !== undefined
        ? req.body.completed
        : existingTask.completed;
    const urgent =
      req.body.urgent !== undefined ? req.body.urgent : existingTask.urgent;
    const important =
      req.body.important !== undefined
        ? req.body.important
        : existingTask.important;

    db.prepare(
      "UPDATE tasks SET title = ?, completed = ?, urgent = ?, important = ? WHERE id = ? AND user_id = ?",
    ).run(title, completed, urgent, important, id, req.user.id);

    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const task = db
      .prepare("SELECT * FROM tasks WHERE id = ? AND user_id = ?")
      .get(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    db.prepare("DELETE FROM tasks WHERE id = ?").run(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;