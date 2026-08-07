export default function ResetFiltersButton({ label = "Reset", onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
}
