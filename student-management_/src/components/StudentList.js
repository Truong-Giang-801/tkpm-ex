import React, { useState } from "react";
import StudentItem from "./StudentItem";
import EditStudentForm from "./EditStudentForm"; 
import Modal from "./Modal";
import "./style/StudentList.css";

const StudentList = ({ students, onDelete }) => {
  const [editingStudent, setEditingStudent] = useState(null);

  // 📌 Set student for editing
  const handleEditClick = (student) => {
    setEditingStudent(student);
  };

  return (
    <div className="student-list">
      {students.length > 0 ? (
        students.map((student) => (
          <StudentItem
            key={student._id}
            student={student}
            onDelete={() => onDelete(student._id)}
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
            onCancel={() => setEditingStudent(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default StudentList;
