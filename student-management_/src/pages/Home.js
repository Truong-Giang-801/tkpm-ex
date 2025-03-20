import React, { useState, useEffect } from "react";
import StudentList from "../components/StudentList";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import "../components/style/Home.css";

const API_URL = "http://localhost:5123/api/students";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data); // ✅ Store students from API
    } catch (error) {
      console.error("❌ Failed to fetch students:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents((prevStudents) => prevStudents.filter((s) => s._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete student:", error);
    }
  };

  // ✅ Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm) || student.mssv.includes(searchTerm)
  );

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Quản lý sinh viên</h1>
      </div>
      <div className="home-content">
        <SearchBar onSearch={handleSearch} />
        <StudentList students={filteredStudents} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Home;
