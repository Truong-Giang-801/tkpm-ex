import React, { useState } from "react";
import { Search, Mic } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleMicrophoneClick = () => {
    // Implement voice search logic here
    console.log("Microphone clicked");
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center rounded-full shadow-md overflow-hidden bg-white border-4 border-gray-300"> {/* Increased border width */}
        {/* Left Search Icon */}
        <div className="absolute left-3 flex items-center">
        </div>

          <Search className="text-gray-500" size={24} /> {/* Increased icon size */}
        {/* Input Field */}
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc MSSV..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full pl-12 pr-12 py-3 text-sm text-gray-700 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500" // Increased padding
        />
      </div>
    </div>
  );
};

export default SearchBar;