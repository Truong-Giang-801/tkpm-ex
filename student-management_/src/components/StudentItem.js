import React from "react";

const StudentItem = ({ student, onDelete, onEdit }) => {
  return (
    <div className="student-card">
      <div className="student-name">{student.name}</div>
      <div className="student-info">
        <p><strong>MSSV:</strong> {student.mssv}</p>
        <p><strong>Ngày sinh:</strong> {student.dob}</p>
        <p><strong>Giới tính:</strong> {student.gender}</p>
        <p><strong>Khoa:</strong> {student.faculty}</p>
        <p><strong>Chương trình:</strong> {student.program}</p>
        <p><strong>Địa chỉ:</strong> {student.address}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Số điện thoại:</strong> {student.phone}</p>
        <p><strong>Tình trạng:</strong> {student.status}</p>
      </div>
      <div className="button-group">
        <button className="edit-button" onClick={() => onEdit(student)}>Sửa</button>
        <button className="delete-button" onClick={() => onDelete(student.mssv)}>Xóa</button>
      </div>
    </div>
  );
};

export default StudentItem;
