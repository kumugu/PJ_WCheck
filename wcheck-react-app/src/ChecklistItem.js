import React from "react";

function ChecklistItem({ item, toggleChecked, deleteItem }) {
    return (
        <li className={`checklist-item $[item.checked ? "checked" : ""]`}>
            <label>
                <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleChecked(item.id)}
                />
                <span>{item.text}</span>
            </label>
            <button className="delete-btn" onClick={() => deleteItem(item.id)}>
                삭제
            </button>
        </li>
    );
}

export default ChecklistItem;