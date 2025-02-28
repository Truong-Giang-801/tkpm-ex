export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const validatePhone = (phone) => {
    const re = /^(?:\+84|0[3|5|7|8|9])\d{8}$/;
    return re.test(phone);
  };
  
  
  export const validateFaculty = (faculty) => {
    const validFaculties = ['Khoa Luật', 'Khoa Tiếng Anh thương mại', 'Khoa Tiếng Nhật', 'Khoa Tiếng Pháp'];
    return validFaculties.includes(faculty);
  };
  
  export const validateStatus = (status) => {
    const validStatuses = ['Đang học', 'Đã tốt nghiệp', 'Đã thôi học', 'Tạm dừng học'];
    return validStatuses.includes(status);
  };

  export const validateStatusChange = (oldStatus, newStatus) => {
    const validTransitions = {
      "Đang học": ["Bảo lưu", "Tốt nghiệp", "Đình chỉ"],
      "Đã tốt nghiệp": [],
      "Bảo lưu": ["Đang học"],
    };
  
    return validTransitions[oldStatus]?.includes(newStatus);
  };
  