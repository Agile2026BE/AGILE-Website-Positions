export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label="Search positions by title, specialty, skill, city, or commute area"
      autoComplete="off"
    />
  );
}
