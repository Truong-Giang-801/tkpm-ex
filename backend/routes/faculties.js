const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");

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
router.put("/:id", async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updatedFaculty
      ? res.status(200).json({ message: "Faculty updated successfully", faculty: updatedFaculty })
      : res.status(404).json({ error: "Faculty not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update faculty" });
  }
});

// 📌 Delete Faculty
router.delete("/:id", async (req, res) => {
  try {
    const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
    deletedFaculty
      ? res.status(200).json({ message: "Faculty deleted successfully" })
      : res.status(404).json({ error: "Faculty not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete faculty" });
  }
});

module.exports = router;
