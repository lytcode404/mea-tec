require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "*", // Allow requests from any URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// --------------------
// Authentication Routes
// --------------------

// Register a new user
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return token with user details:
    res.json({ token, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// --------------------
// Middleware to Protect Routes
// --------------------
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId: '...' }
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// --------------------
// Task Routes (Protected)
// --------------------

// GET /api/tasks - Get tasks for the logged-in user
app.get("/api/tasks", authenticate, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/tasks - Create a new task
app.post("/api/tasks", authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.userId,
      },
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/tasks/:id - Update an existing task
app.put("/api/tasks/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Ensure the task belongs to the user
    const existingTask = await prisma.task.findUnique({ where: { id } });
    if (!existingTask || existingTask.userId !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, completed },
    });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/tasks/:id - Delete a task
app.delete("/api/tasks/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the task belongs to the user
    const existingTask = await prisma.task.findUnique({ where: { id } });
    if (!existingTask || existingTask.userId !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.task.delete({ where: { id } });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------
// Example Protected Route (optional)
// --------------------
app.get("/api/protected", authenticate, (req, res) => {
  res.json({
    message: "You have accessed a protected route!",
    userId: req.user.userId,
  });
});

// --------------------
// Logout Route (Frontend handles token removal)
// --------------------
app.post("/api/auth/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
