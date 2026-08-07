export default function ShareButton({ label = "Share", onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
}
