import { useEffect, useRef, useState } from "react";

function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  const handleSelect = (option) => {
    onChange(option.value);
    setOpen(false);
  };

  return (
    <div
      className={`custom-select ${open ? "open" : ""}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className="custom-select-button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>
          {selectedOption?.label || placeholder}
        </span>

        <span className="custom-select-arrow"></span>
      </button>

      {open && (
        <div
          className="custom-select-menu"
          role="listbox"
        >
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              className={`custom-select-option ${
                option.value === value ? "selected" : ""
              }`}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;