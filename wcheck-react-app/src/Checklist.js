import React, { useState } from "react";
import ChecklistItem from "./ChecklistItem";

function Checklist({ items, setItems }) {
    const [input, setInput] = useState("");

    // 항목 추가
    const addItem = () => {
        if (input.trim() === "") return;
        setItems([
            ...items,
            { id: Date.now(), text: input.trim(), checked: false }
        ]);
        setInput("");
    };

    // 체크 해제
    const toggleChecked = (id) => {
        setItems(
            items.map((item) => 
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    // 삭제
    const deleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    // 엔터로 추가
    const handleKeyDown = (e) => {
        if (e.key === "Enter") addItem();
    };

    return (
        <div>
            <div className="input-row">
                <input
                 type="text"
                 placeholder="업무를 입력하세요"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={handleKeyDown}
                />
                <button onClick={addItem}>추가</button>
            </div>
            <ul className="checklist">
                {items.map((item) => (
                    <ChecklistItem
                        key={item.id}
                        item={item}
                        toggleChecked={toggleChecked}
                        deleteItem={deleteItem}
                    />      
                ))}
            </ul>
        </div>
    );
}

export default Checklist;