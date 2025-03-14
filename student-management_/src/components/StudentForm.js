import React, { useState, useEffect } from "react";
import { getStatuses, getPrograms } from "../utils/storage";
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
      setFaculties(data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">Thông tin sinh viên</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-column">
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
                    <option key={faculty._id} value={faculty.name}>{faculty.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-column">
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
            </div>
          </div>
          <button className="submit-button" type="submit">Lưu</button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
