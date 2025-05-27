import React, { useState, useEffect } from "react";
import { workData } from "./workData";

// 요일별로 localStorage에 저장
function getStorageKey(date) {
  return `workcheck_data_${date}`;
}

function ChecklistPage({ selectedDate }) {
  // 체크/메모 상태: { "22:00_0": {checked: true, note: "..."}, ... }
  const [state, setState] = useState({});

  // 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(getStorageKey(selectedDate));
    setState(saved ? JSON.parse(saved) : {});
  }, [selectedDate]);

  // 저장하기
  useEffect(() => {
    localStorage.setItem(getStorageKey(selectedDate), JSON.stringify(state));
  }, [state, selectedDate]);

  // 체크/메모 핸들러
  const handleCheck = (time, idx, checked) => {
    setState((prev) => ({
      ...prev,
      [`${time}_${idx}`]: { ...prev[`${time}_${idx}`], checked }
    }));
  };

  const handleNote = (time, idx, note) => {
    setState((prev) => ({
      ...prev,
      [`${time}_${idx}`]: { ...prev[`${time}_${idx}`], note }
    }));
  };

  // 전체 완료 통계
  const totalTasks = workData.reduce((sum, block) => sum + block.tasks.length, 0);
  const completed = Object.values(state).filter((v) => v && v.checked).length;
  const percent = Math.round((completed / totalTasks) * 100);

  // 초기화
  const resetAll = () => {
    if (window.confirm("정말 초기화하시겠습니까?")) setState({});
  };

  // 내보내기
  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `workcheck_${selectedDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="controls">
        <button onClick={exportData}>📋 내보내기</button>
        <button onClick={resetAll}>🔄 전체 초기화</button>
        <span className="stats">{completed}/{totalTasks} ({percent}%)</span>
      </div>
      {workData.map((block) => (
        <div className="time-block" key={block.time}>
          <h2>🕒 {block.time}</h2>
          {block.tasks.map((task, idx) => {
            const key = `${block.time}_${idx}`;
            const checked = state[key]?.checked || false;
            const note = state[key]?.note || "";
            return (
              <div className={`task${checked ? " completed" : ""}`} key={key}>
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => handleCheck(block.time, idx, e.target.checked)}
                  />
                  <span>{task}</span>
                </label>
                <textarea
                  className="notes"
                  placeholder="특이사항/메모"
                  value={note}
                  onChange={(e) => handleNote(block.time, idx, e.target.value)}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ChecklistPage;