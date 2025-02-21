const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/students");
const facultyRoutes = require("./routes/faculties");

const app = express();
const PORT = process.env.PORT || 5123;

// Middleware
app.use(cors());
app.use(express.json()); // Enables parsing JSON request bodies

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/faculties", facultyRoutes); // 🔥 Faculty routes

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
