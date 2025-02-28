import React, { useEffect, useState } from 'react';
import StudentForm from '../components/StudentForm';
import { getStudent, updateStudent } from '../utils/storage';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
  const { mssv } = useParams();
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const studentData = getStudent(mssv);
    if (studentData) {
      setStudent(studentData);
    }
  }, [mssv]);

  const handleSubmit = (updatedStudent) => {
    updateStudent(updatedStudent);
    navigate('/'); // Replace history.push with navigate
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Sửa thông tin sinh viên</h1>
      <StudentForm student={student} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditStudent;
