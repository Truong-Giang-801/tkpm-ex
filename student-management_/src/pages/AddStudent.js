import React from 'react';
import StudentForm from '../components/StudentForm';
import { addStudent } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleSubmit = (student) => {
    addStudent(student);
    navigate('/'); // Replace history.push with navigate
  };

  return (
    <div>
      <h1>Thêm sinh viên mới</h1>
      <StudentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddStudent;
