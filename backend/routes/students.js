const express = require("express");
const router = express.Router();
const Student = require("../models/Student");


// 📌 Create Student
router.post("/", async (req, res) => {
  try {
    const { mssv } = req.body;
    if (!mssv) {
      return res.status(400).json({ error: "MSSV is required" });
    }
    
    const MSSV = mssv.toUpperCase();
    const existingStudent = await Student.findOne({ MSSV });

    if (existingStudent) {
      return res.status(400).json({ error: `MSSV "${MSSV}" already exists.` });
    }

    const newStudent = new Student(req.body);
    await newStudent.save();

    console.log("✅ Student added:", newStudent);
    res.status(201).json({ message: "Student added successfully", student: newStudent });

  } catch (error) {
    console.error("❌ Error:", error);

    // Handle MongoDB duplicate key error (code 11000)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]; // Get the duplicate field (e.g., 'mssv')
      const value = error.keyValue[field]; // Get the duplicate value
      
      return res.status(400).json({
        error: `Duplicate MSSV: ${field.toUpperCase()} "${value}" already exists.`,
        details: error.message // Provide the full error message for debugging
      });
    }

    res.status(500).json({ error: "Failed to save student", details: error.message });
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
//Check mssv before sent
router.get("/check-mssv/:mssv", async (req, res) => {
  try {
    const student = await Student.findOne({ MSSV: req.params.mssv });
    res.status(200).json({ exists: !!student });
  } catch (error) {
    res.status(500).json({ error: "Failed to check MSSV" });
  }
});

// 📌 Get a Student by ID
const mongoose = require("mongoose");

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid student ID format" });
    }

    const student = await Student.findById(req.params.id);
    student
      ? res.status(200).json(student)
      : res.status(404).json({ error: "Student not found" });
  } catch (error) {
    console.error("❌ Error fetching student:", error);
    res.status(500).json({ error: "Failed to fetch student" });
  }
});


// 📌 Update Student

router.put("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const { MSSV, ...updateData } = req.body; // Extract MSSV separately

    // 🔍 Validate if studentId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID format" });
    }

    // 🔍 Find existing student (to check if MSSV is being updated)
    const existingStudent = await Student.findById(studentId);
    if (!existingStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    // 🔍 Check MSSV duplication **only if MSSV is being changed**
    if (MSSV && MSSV !== existingStudent.MSSV) {
      const duplicateStudent = await Student.findOne({ MSSV });
      if (duplicateStudent) {
        return res.status(400).json({ error: "MSSV already existed. Please enter another MSSV." });
      }
    }

    // ✅ Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { MSSV, ...updateData }, // Ensure MSSV is included if changed
      { new: true } // Return updated document
    );

    res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
    console.error("❌ Error updating student:", error);
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
