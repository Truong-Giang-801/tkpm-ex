import React, { useEffect, useState } from "react";
import StudentItem from "./StudentItem";
import EditStudentForm from "./EditStudentForm"; 
import Modal from "./Modal"; 
import axios from "axios";
import "./style/StudentList.css";

const API_URL = "http://localhost:5123/api/students";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // 📌 Fetch students when component mounts and when changes occur
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

  // 📌 Delete student and update list
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents((prevStudents) => prevStudents.filter((s) => s._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete student:", error);
    }
  };

  // 📌 Set student for editing
  const handleEditClick = (student) => {
    setEditingStudent(student);
  };

  // 📌 Save edited student data & refresh the list
  const handleEditSubmit = async (updatedData) => {
    try {
      await axios.put(`${API_URL}/${updatedData._id}`, updatedData); // ✅ Only one API call here
      setStudents((prevStudents) =>
        prevStudents.map((s) => (s._id === updatedData._id ? updatedData : s))
      );
      setEditingStudent(null);
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
            onEdit={() => handleEditClick(student)}
          />
        ))
      ) : (
        <p className="no-students">Không có sinh viên nào</p>
      )}

      {/* Modal with EditStudentForm */}
      <Modal isOpen={editingStudent !== null} onClose={() => setEditingStudent(null)}>
        {editingStudent && (
          <EditStudentForm
            studentId={editingStudent._id}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingStudent(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default StudentList;
