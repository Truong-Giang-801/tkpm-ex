import React, { useEffect, useState } from "react";
import StudentItem from "./StudentItem";
import EditStudentForm from "./EditStudentForm"; // Import the EditStudentForm component
import Modal from "./Modal"; // Import the Modal component
import axios from "axios";
import "./style/StudentList.css";

const API_URL = "http://localhost:5123/api/students";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null); // New state for editing

  // 📌 Fetch all students from API
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch students:", error);
    }
  };

  // 📌 Delete Student by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete student:", error);
    }
  };

  // 📌 Set the student for editing
  const handleEditClick = (student) => {
    setEditingStudent(student);
  };

  // 📌 Save the edited student data
  const handleEditSubmit = async (updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${updatedData._id}`, updatedData);
      setStudents(students.map((s) => (s._id === updatedData._id ? response.data.student : s)));
      setEditingStudent(null); // Close the edit form after successful edit
    } catch (error) {
      console.error("❌ Failed to update student:", error);
    }
  };

  return (
    <div className="student-list">
      {students.length > 0 ? (
        students.map((student) => (
          <StudentItem
            key={student._id}
            student={student}
            onDelete={() => handleDelete(student._id)}
            onEdit={() => handleEditClick(student)} // Trigger editing on click
          />
        ))
      ) : (
        <p className="no-students">Không có sinh viên nào</p>
      )}
      
      {/* Modal with EditStudentForm */}

      <Modal isOpen={editingStudent !== null} onClose={() => setEditingStudent(null)}>
        {editingStudent && (
          <EditStudentForm
          
            studentId={editingStudent?._id}  // ✅ Pass only the ID
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingStudent(null)}
          />

      )}
    </Modal>

    </div>
  );
};

export default StudentList;
