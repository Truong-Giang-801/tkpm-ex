const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// 📌 Create Student
router.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ error: "Failed to save student" });
  }
});

// 📌 Get All Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// 📌 Get a Student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    student ? res.status(200).json(student) : res.status(404).json({ error: "Student not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
});

// 📌 Update Student
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updatedStudent
      ? res.status(200).json({ message: "Student updated successfully", student: updatedStudent })
      : res.status(404).json({ error: "Student not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
});

// 📌 Delete Student
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    deletedStudent
      ? res.status(200).json({ message: "Student deleted successfully" })
      : res.status(404).json({ error: "Student not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

module.exports = router;
