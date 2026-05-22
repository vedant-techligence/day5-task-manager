const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ error: "Username and password are required" });

    const existing = db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username);
    if (existing)
      return res.status(409).json({ error: "Username already taken" });

    const hashed = await bcrypt.hash(password, 10);
    const result = db
      .prepare("INSERT INTO users (username, password) VALUES (?, ?)")
      .run(username, hashed);

    const token = jwt.sign(
      { id: result.lastInsertRowid, username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.status(201).json({ token, username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ error: "Username and password are required" });

    const user = db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ token, username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;