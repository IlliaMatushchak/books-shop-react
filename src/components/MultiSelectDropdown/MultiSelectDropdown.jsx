import { useState, useRef, useEffect } from "react";
import "./MultiSelectDropdown.css";

function MultiSelectDropdown({ options = [], selected = [], setSelected }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-trigger" onClick={() => setOpen((prev) => !prev)}>
        {selected.length > 0 ? `${selected.length} tags selected` : "Select tags"}
      </button>

      {open && (
        <ul className="dropdown-menu">
          {options.map((value) => {
            const isChecked = selected.includes(value);
            return (
              <li key={value}>
                <label className="dropdown-option">
                  <input type="checkbox" checked={isChecked} onChange={() => toggleOption(value)} />
                  <span className={isChecked ? "marked" : ""}>{value}</span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
