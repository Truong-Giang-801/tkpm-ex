import React, { useState, useEffect } from "react";
import {
  addFaculty,
  getStatuses, addStatus,
  getPrograms, addProgram,
} from "../utils/storage";
import "./style/StudentForm.css";

const EditStudentForm = ({ studentId, onSubmit }) => {
  const [formData, setFormData] = useState({
    mssv: "", name: "", dob: "", gender: "",
    faculty: "", program: "", address: "",
    email: "", phone: "", status: "",
  });

  const [faculties, setFaculties] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [newFaculty, setNewFaculty] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newProgram, setNewProgram] = useState("");

  
  useEffect(() => {
    console.log("🔍 Fetching student data for ID:", studentId);
    if (studentId) {
      fetchStudentData(studentId);
    }
    if (!studentId) {
      console.warn("⚠️ No student ID provided.");
    }
    fetchFaculties();
    setStatuses(getStatuses());
    setPrograms(getPrograms());
  }, [studentId]);
  

  const fetchStudentData = async (id) => {
    if (!id) {
      console.warn("⚠️ No student ID provided.");
      return;
    }
  
    try {
      console.log(`🔍 Fetching student data for ID: ${id}`);
      const response = await fetch(`http://localhost:5123/api/students/${id}`);
  
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  
      const data = await response.json();
      console.log("✅ Student data received:", data);
      setFormData(data);
    } catch (error) {
      console.error("❌ Error fetching student data:", error.message);
      alert("Failed to load student data. Please check your network or API.");
    }
  };
  
  

  const fetchFaculties = async () => {
    try {
      const response = await fetch("http://localhost:5123/api/faculties");
      if (!response.ok) throw new Error("Failed to fetch faculties");

      const data = await response.json();
      setFaculties(data);
    } catch (error) {
      console.error("❌ Error fetching faculties:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNewFacultyChange = (e) => {
    setNewFaculty(e.target.value);
  };

  const handleNewStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleNewProgramChange = (e) => {
    setNewProgram(e.target.value);
  };

  const handleAddFaculty = () => {
    if (newFaculty) {
      addFaculty(newFaculty);
      setFaculties([...faculties, { name: newFaculty }]);
      setNewFaculty("");
    }
  };

  const handleAddStatus = () => {
    if (newStatus) {
      addStatus(newStatus);
      setStatuses([...statuses, newStatus]);
      setNewStatus("");
    }
  };

  const handleAddProgram = () => {
    if (newProgram) {
      addProgram(newProgram);
      setPrograms([...programs, newProgram]);
      setNewProgram("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5123/api/students/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("📤 Sent request:", formData);

      if (response.status === 204) {
        console.warn("⚠️ Server returned 204 No Content, but expected data.");
        alert("Student updated, but no response data.");
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Student updated:", result);
      alert(result.message);
    } catch (error) {
      console.error("❌ Error updating student:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">Chỉnh sửa thông tin sinh viên</h2>
        <form onSubmit={handleSubmit} className="scrollable-form">
          <div className="form-group">
            <label>MSSV:</label>
            <input type="text" name="mssv" value={formData.mssv} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Họ tên:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Ngày sinh:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Giới tính:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">-- Chọn giới tính --</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="form-group">
            <label>Khoa:</label>
            <select name="faculty" value={formData.faculty} onChange={handleChange} required>
              <option value="">-- Chọn khoa --</option>
              {faculties.map((faculty) => (
                <option key={faculty._id} value={faculty.name}>
                  {faculty.name}
                </option>
              ))}
            </select>
            <div>
              <input 
                type="text" 
                placeholder="Thêm khoa mới" 
                value={newFaculty} 
                onChange={handleNewFacultyChange} 
              />
              <button type="button" onClick={handleAddFaculty}>Thêm Khoa</button>
            </div>
          </div>
          <div className="form-group">
            <label>Chương trình:</label>
            <select name="program" value={formData.program} onChange={handleChange} required>
              <option value="">-- Chọn chương trình --</option>
              {programs.map((program) => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
            <div>
              <input 
                type="text" 
                placeholder="Thêm chương trình mới" 
                value={newProgram} 
                onChange={handleNewProgramChange} 
              />
              <button type="button" onClick={handleAddProgram}>Thêm Chương Trình</button>
            </div>
          </div>
          <div className="form-group">
            <label>Địa chỉ:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Số điện thoại:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Tình trạng:</label>
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="">-- Chọn tình trạng --</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <div>
              <input 
                type="text" 
                placeholder="Thêm tình trạng mới" 
                value={newStatus} 
                onChange={handleNewStatusChange} 
              />
              <button type="button" onClick={handleAddStatus}>Thêm Tình Trạng</button>
            </div>
          </div>
          <button className="submit-button" type="submit">Lưu</button>
        </form>
      </div>
    </div>
  );
};

export default EditStudentForm;
