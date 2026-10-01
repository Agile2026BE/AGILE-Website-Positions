import ChessHost from "../../../components/chess/ChessHost";

export const metadata = {
  title: "AGILE Chess — Host Console",
  robots: { index: false, follow: false },
};

export default function ChessHostPage() {
  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "24px 12px 48px" }}>
      <ChessHost />
    </main>
  );
}
