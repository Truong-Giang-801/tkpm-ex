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
    <div >
      <h1 style={styles.container} >Thêm sinh viên mới</h1>
      <StudentForm onSubmit={handleSubmit} />
    </div>
  );
};
const styles = {
  container: { maxWidth: "400px", margin: "20px auto", textAlign: "center" },
  form: { marginBottom: "10px" },
  list: { listStyleType: "none", padding: 0 },
  listItem: { display: "flex", justifyContent: "space-between", padding: "8px", borderBottom: "1px solid #ddd" },
};

export default AddStudent;
