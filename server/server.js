require("dotenv").config();
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");
const authenticate = require("./middleware/authenticate");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", authenticate, taskRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: err.message });
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`),
);