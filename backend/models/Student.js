const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  mssv: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  faculty: { type: String, required: true },
  program: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
