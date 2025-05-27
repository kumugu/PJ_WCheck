import React, { useState } from "react";
import ChecklistPage from "./ChecklistPage";
import "./App.css";

function getToday() {
  return new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

function App() {
  const [selectedDate, setSelectedDate] = useState(() => {
    return localStorage.getItem("workcheck_selectedDate") || getToday();
  });

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    localStorage.setItem("workcheck_selectedDate", e.target.value);
  };

  return (
    <div className="app-container">
      <h1>🏢 WorkCheck</h1>
      <div className="date-selector">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          max={getToday()}
        />
      </div>
      <ChecklistPage selectedDate={selectedDate} />
    </div>
  );
}

export default App;
