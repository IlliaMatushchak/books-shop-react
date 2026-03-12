import { useState, useRef, useEffect } from "react";
import "./MultiSelectDropdown.css";

function MultiSelectDropdown({ options = [], selected, setSelected }) {
  const [tempSelected, setTempSelected] = useState(selected);
  const tempSelectedRef = useRef(tempSelected); // fix problem with closure in handleClickOutside
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    tempSelectedRef.current = tempSelected;
  }, [tempSelected]);

  useEffect(() => {
    setTempSelected(selected);
  }, [selected]);

  const toggleOption = (value) => {
    setTempSelected((prev) => {
      const next = new Set(prev);

      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }

      return next;
    });
  };

  const handleToggle = () => {
    if (open) setSelected(tempSelected);
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setSelected(tempSelectedRef.current);
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [open, setSelected]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-trigger" onClick={handleToggle}>
        {tempSelected.size > 0 ? `${tempSelected.size} tags selected` : "Select tags"}
      </button>

      {open && (
        <ul className="dropdown-menu">
          {options.map((value) => {
            const isChecked = tempSelected.has(value);
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
