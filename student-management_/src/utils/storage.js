const STORAGE_KEYS = {
    STUDENTS: 'students',
    FACULTIES: 'faculties',
    STATUSES: 'statuses',
    PROGRAMS: 'programs',
  };
  // Load students from localStorage
export const getStudents = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS)) || [];

// Get a single student by MSSV
export const getStudent = (mssv) => {
  return getStudents().find(student => student.mssv === mssv) || null;
};

// Add a new student
export const addStudent = (student) => {
  const students = getStudents();
  students.push(student);
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
};

// Update an existing student
export const updateStudent = (updatedStudent) => {
  const students = getStudents().map(student =>
    student.mssv === updatedStudent.mssv ? updatedStudent : student
  );
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
};

// Delete a student by MSSV
export const deleteStudent = (mssv) => {
  const students = getStudents().filter(student => student.mssv !== mssv);
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
};
  // Initialize storage with default values
  const DEFAULT_FACULTIES = ["Khoa Luật", "Khoa Tiếng Anh thương mại", "Khoa Tiếng Nhật", "Khoa Tiếng Pháp"];
  const DEFAULT_STATUSES = ["Đang học", "Đã tốt nghiệp", "Đã thôi học", "Tạm dừng học"];
  const DEFAULT_PROGRAMS = ["Cử nhân", "Thạc sĩ", "Tiến sĩ"];
  
  const initializeStorage = () => {
    if (!localStorage.getItem(STORAGE_KEYS.FACULTIES)) {
      localStorage.setItem(STORAGE_KEYS.FACULTIES, JSON.stringify(DEFAULT_FACULTIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.STATUSES)) {
      localStorage.setItem(STORAGE_KEYS.STATUSES, JSON.stringify(DEFAULT_STATUSES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROGRAMS)) {
      localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(DEFAULT_PROGRAMS));
    }
  };
  
  initializeStorage();
  
  // ✅ Get, Add, Remove, Rename Faculties
  export const getFaculties = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.FACULTIES)) || [];
  export const addFaculty = (faculty) => {
    const faculties = getFaculties();
    if (!faculties.includes(faculty)) {
      faculties.push(faculty);
      localStorage.setItem(STORAGE_KEYS.FACULTIES, JSON.stringify(faculties));
    }
  };
  export const removeFaculty = (faculty) => {
    const faculties = getFaculties().filter(f => f !== faculty);
    localStorage.setItem(STORAGE_KEYS.FACULTIES, JSON.stringify(faculties));
  };
  export const renameFaculty = (oldName, newName) => {
    let faculties = getFaculties();
    faculties = faculties.map(f => (f === oldName ? newName : f));
    localStorage.setItem(STORAGE_KEYS.FACULTIES, JSON.stringify(faculties));
  };
  
  // ✅ Get, Add, Remove, Rename Statuses
  export const getStatuses = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.STATUSES)) || [];
  export const addStatus = (status) => {
    const statuses = getStatuses();
    if (!statuses.includes(status)) {
      statuses.push(status);
      localStorage.setItem(STORAGE_KEYS.STATUSES, JSON.stringify(statuses));
    }
  };
  export const removeStatus = (status) => {
    const statuses = getStatuses().filter(s => s !== status);
    localStorage.setItem(STORAGE_KEYS.STATUSES, JSON.stringify(statuses));
  };
  export const renameStatus = (oldName, newName) => {
    let statuses = getStatuses();
    statuses = statuses.map(s => (s === oldName ? newName : s));
    localStorage.setItem(STORAGE_KEYS.STATUSES, JSON.stringify(statuses));
  };
  
  // ✅ Get, Add, Remove, Rename Programs
  export const getPrograms = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRAMS)) || [];
  export const addProgram = (program) => {
    const programs = getPrograms();
    if (!programs.includes(program)) {
      programs.push(program);
      localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
    }
  };
  export const removeProgram = (program) => {
    const programs = getPrograms().filter(p => p !== program);
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
  };
  export const renameProgram = (oldName, newName) => {
    let programs = getPrograms();
    programs = programs.map(p => (p === oldName ? newName : p));
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
  };
  