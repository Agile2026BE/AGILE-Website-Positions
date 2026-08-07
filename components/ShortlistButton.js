export default function ShortlistButton({ isShortlisted = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isShortlisted}
    >
      {isShortlisted ? "Shortlisted" : "+ Shortlist"}
    </button>
  );
}
