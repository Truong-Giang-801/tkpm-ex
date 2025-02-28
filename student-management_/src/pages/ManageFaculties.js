import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/ManageFaculties.css"; // Corrected CSS import
const API_URL = "http://localhost:5123/api/faculties"; // Your API endpoint

const ManageFaculties = () => {
  const [faculties, setFaculties] = useState([]);
  const [newFaculty, setNewFaculty] = useState("");
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [editedName, setEditedName] = useState("");

  // 📌 Fetch faculties from the database
  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(API_URL);
      setFaculties(response.data); // Ensure API returns an array
    } catch (error) {
      console.error("❌ Failed to fetch faculties:", error);
    }
  };

  // 📌 Add a new faculty
  const handleAddFaculty = async () => {
    if (!newFaculty.trim()) return;

    try {
      const response = await axios.post(API_URL, { name: newFaculty });
      setFaculties((prev) => [...prev, response.data]); // Append new faculty
      setNewFaculty(""); // Clear input
    } catch (error) {
      console.error("❌ Failed to add faculty:", error);
    }
  };

  // 📌 Rename faculty
  const handleRenameFaculty = async () => {
    if (!editingFaculty || !editedName.trim()) return;

    try {
      const response = await axios.put(`${API_URL}/${editingFaculty._id}`, { name: editedName });
      setFaculties((prev) =>
        prev.map((f) => (f._id === editingFaculty._id ? { ...f, name: response.data.name } : f))
      );
      setEditingFaculty(null);
      setEditedName("");
    } catch (error) {
      console.error("❌ Failed to update faculty:", error);
    }
  };

  // 📌 Delete faculty
  const handleDeleteFaculty = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa khoa này?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setFaculties((prev) => prev.filter((f) => f._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete faculty:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Quản lý Khoa</h1>

      {/* Add Faculty */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Tên khoa mới"
          value={newFaculty}
          onChange={(e) => setNewFaculty(e.target.value)}
        />
        <button onClick={handleAddFaculty}>Thêm Khoa</button>
      </div>

      {/* Edit Faculty */}
      {editingFaculty && (
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Tên mới"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <button onClick={handleRenameFaculty}>Cập nhật</button>
          <button onClick={() => setEditingFaculty(null)}>Hủy</button>
        </div>
      )}

      {/* Faculty List */}
      <ul style={styles.list}>
        {faculties.map((faculty) => (
          <li key={faculty._id} style={styles.listItem}>
            {faculty.name}
            <div>
              <button onClick={() => { setEditingFaculty(faculty); setEditedName(faculty.name); }}>✏️</button>
              <button onClick={() => handleDeleteFaculty(faculty._id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Basic inline styles
const styles = {
  container: { maxWidth: "400px", margin: "20px auto", textAlign: "center" },
  form: { marginBottom: "10px" },
  list: { listStyleType: "none", padding: 0 },
  listItem: { display: "flex", justifyContent: "space-between", padding: "8px", borderBottom: "1px solid #ddd" },
};

export default ManageFaculties;
