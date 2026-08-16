"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MultiSelectFilter.module.css";

export default function MultiSelectFilter({
  label = "All Markets",
  options = [],
  values = [],
  onChange,
  onApply,
  maxSelections = 5,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function toggleValue(option) {
    const exists = values.includes(option);
    if (exists) {
      onChange(values.filter((value) => value !== option));
      return;
    }

    if (values.length < maxSelections) onChange([...values, option]);
  }

  function applySelections() {
    setIsOpen(false);
    onApply?.();
  }

  const buttonText =
    values.length === 0
      ? label
      : values.length === 1
        ? values[0]
        : `${values.length} markets selected`;

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.triggerText}>{buttonText}</span>
        <span
          className={styles.chevron}
          aria-hidden="true"
          style={{
            color: "#147eae",
            display: "inline-block",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 160ms ease",
          }}
        >
          ⌄
        </span>
      </button>

      {isOpen ? (
        <div className={styles.menu} role="listbox" aria-multiselectable="true">
          <div className={styles.menuHeader}>
            <span>Select up to {maxSelections}</span>
            {values.length ? (
              <button type="button" className={styles.clear} onClick={() => onChange([])}>
                Clear
              </button>
            ) : null}
          </div>

          <div className={styles.options}>
            {options.map((option) => {
              const checked = values.includes(option);
              const disabled = !checked && values.length >= maxSelections;

              return (
                <label
                  key={option}
                  className={`${styles.option} ${disabled ? styles.disabled : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleValue(option)}
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>

          <div className={styles.applyBar}>
            <span>{values.length} of {maxSelections} selected</span>
            <button
              type="button"
              className={styles.applyButton}
              onClick={applySelections}
              aria-label="View positions matching selected market sectors"
            >
              View Results
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
