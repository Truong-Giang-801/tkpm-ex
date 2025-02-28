import React, { useState, useEffect } from "react";
import StudentList from "../components/StudentList";
import SearchBar from "../components/SearchBar";
import { getStudents, deleteStudent } from "../utils/storage";
import "../components/style/Home.css"; // Corrected CSS import

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(getStudents());
  }, []); // Only runs on mount

  const handleSearch = (term) => {
    const filteredStudents = getStudents().filter(
      (student) =>
        student.name.toLowerCase().includes(term.toLowerCase()) ||
        student.mssv.includes(term)
    );
    setStudents(filteredStudents);
  };

  const handleDelete = (mssv) => {
    deleteStudent(mssv);
    setStudents(prevStudents => prevStudents.filter(student => student.mssv !== mssv));
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Quản lý sinh viên</h1>
      </div>
      <div className="home-content">
        <SearchBar onSearch={handleSearch} />
        <StudentList students={students} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Home;
