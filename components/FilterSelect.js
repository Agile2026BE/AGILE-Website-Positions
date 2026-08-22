import styles from "./FilterSelect.module.css";

export default function FilterSelect({
  label,
  value,
  options = [],
  onChange,
  tone,
}) {
  return (
    <select
      className={`${styles.select} ${value ? styles.selectActive : ""} ${tone === "money" ? styles.selectMoney : ""}`}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={label}
    >
      <option value="">{label}</option>
      {options.map((option) => {
        const normalized =
          typeof option === "string"
            ? { value: option, label: option }
            : option;

        return (
          <option key={normalized.value} value={normalized.value}>
            {normalized.label}
          </option>
        );
      })}
    </select>
  );
}
