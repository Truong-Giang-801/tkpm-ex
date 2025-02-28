import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import Navbar from './components/Navbar';
import ManageFaculties from "./pages/ManageFaculties";



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:mssv" element={<EditStudent />} />
        <Route path="/faculities" element={<ManageFaculties />} />
      </Routes>
    </Router>
  );
};

export default App;
