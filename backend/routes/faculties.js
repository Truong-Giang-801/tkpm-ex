const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");
const Student = require("../models/Student"); // Import model Student

// 📌 Create Faculty
router.post("/", async (req, res) => {
  try {
    const newFaculty = new Faculty(req.body);
    await newFaculty.save();
    res.status(201).json({ message: "Faculty added successfully", faculty: newFaculty });
  } catch (error) {
    res.status(500).json({ error: "Failed to save faculty" });
  }
});

// 📌 Get All Faculties
router.get("/", async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch faculties" });
  }
});

// 📌 Update Faculty
router.put("/:facultyId", async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { name } = req.body;

    // 🔍 Find the faculty by ID
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    const oldFacultyName = faculty.name; // Store old name for student update

    // 🔄 Update faculty name
    faculty.name = name;
    await faculty.save();

    // 🔄 Update all students linked to this faculty
    const result = await Student.updateMany(
      { faculty: oldFacultyName }, // Find students by old faculty name
      { faculty: name } // Update to new faculty name
    );

    console.log(`✅ Updated ${result.modifiedCount} students`); // Debugging log

    res.status(200).json({ message: "Faculty updated successfully", name });
  } catch (error) {
    console.error("❌ Error updating faculty:", error);
    res.status(500).json({ error: "Failed to update faculty" });
  }
});




// 📌 Delete Faculty only if no students are linked
router.delete("/:facultyId", async (req, res) => {
  try {
    const facultyId = req.params.facultyId;

    // 🔍 Check if faculty exists
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    // 🔍 Check if any students are linked to this faculty (by ID, not name)
    const studentsCount = await Student.countDocuments({ faculty: faculty.name }); 
    if (studentsCount > 0) {
      return res.status(400).json({
        error: `Cannot delete faculty. ${studentsCount} student(s) are linked to this faculty.`,
      });
    }

    // 🚀 Delete the faculty if no students are linked
    await Faculty.findByIdAndDelete(facultyId);
    res.status(200).json({ message: "Faculty deleted successfully" });

  } catch (error) {
    console.error("❌ Error deleting faculty:", error);
    res.status(500).json({ error: "Failed to delete faculty" });
  }
});



module.exports = router;
