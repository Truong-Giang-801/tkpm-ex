import React, { useState, useEffect } from "react";
import {
  getStatuses, 
  getPrograms, 
} from "../utils/storage";
import "./style/StudentForm.css";

const StudentForm = ({ student, onSubmit }) => {
  const [formData, setFormData] = useState(
    student || {
      mssv: "", name: "", dob: "", gender: "",
      faculty: "", program: "", address: "",
      email: "", phone: "", status: "",
    }
  );

  const [faculties, setFaculties] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    fetchFaculties();
    setStatuses(getStatuses());
    setPrograms(getPrograms());
  }, []);
  const fetchFaculties = async () => {
    try {
      const response = await fetch("http://localhost:5123/api/faculties");
      if (!response.ok) throw new Error("Failed to fetch faculties");
  
      const data = await response.json();
      setFaculties(data);  // ✅ Store fetched faculties in state
      console.log("📥 Faculties received:", data);
    } catch (error) {
      console.error("❌ Error fetching faculties:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 🚀 Fetch existing students to check MSSV uniqueness
    try {
      const existingStudents = await fetch("http://localhost:5123/api/students")
        .then((res) => res.json())
        .catch(() => []);
  
      const isDuplicate = existingStudents.some((s) => s.mssv === formData.mssv);
      if (isDuplicate) {
        alert("⚠️ MSSV đã tồn tại. Vui lòng nhập MSSV khác.");
        return;
      }
    } catch (fetchError) {
      console.error("❌ Error fetching existing students:", fetchError);
      alert("Không thể kiểm tra MSSV. Vui lòng thử lại sau.");
      return;
    }
  
    // 🚀 Validate email format dynamically
    const allowedDomains = ["@student.university.edu.vn", "@gmail.com", "@yahoo.com"];
    if (!allowedDomains.some(domain => formData.email.endsWith(domain))) {
      alert(`⚠️ Email phải có tên miền hợp lệ: ${allowedDomains.join(", ")}`);
      return;
    }
    
  
    // 🚀 Validate phone number format (Vietnam)
    const phoneRegex = /^(?:\+84|0[3|5|7|8|9])\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("⚠️ Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.");
      return;
    }
  
    // 🚀 Validate status change rules
    if (student) { // Only check when editing an existing student
      const validTransitions = {
        "Đang học": ["Bảo lưu", "Tốt nghiệp", "Đình chỉ"],
        "Đã tốt nghiệp": [],
        "Bảo lưu": ["Đang học"],
      };
      if (!validTransitions[student.status]?.includes(formData.status)) {
        alert("⚠️ Trạng thái không hợp lệ.");
        return;
      }
    }
  
    // 🚀 Submit student data
    try {
      const response = await fetch("http://localhost:5123/api/students", {
        method: student ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      console.log("📤 Sent request:", formData);
  
      if (response.status === 204) {
        console.warn("⚠️ Server returned 204 No Content, but expected data.");
        alert("Student saved, but no response data.");
        return;
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("✅ Student added/updated:", result);
      alert(result.message);
    } catch (error) {
      console.error("❌ Error adding/updating student:", error);
      alert("Không thể kết nối đến máy chủ.");
    }
  };
  
  
  
  

  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">Thông tin sinh viên</h2>
        <form onSubmit={handleSubmit}>
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
          </div>
          <div className="form-group">
            <label>Chương trình:</label>
            <select name="program" value={formData.program} onChange={handleChange} required>
              <option value="">-- Chọn chương trình --</option>
              {programs.map((program) => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
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
          </div>
          <button className="submit-button" type="submit">Lưu</button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
