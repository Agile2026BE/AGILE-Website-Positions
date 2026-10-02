import FriendChessGame from "../../../../components/chess/FriendChessGame";

export const metadata = {
  title: "AGILE Chess — Play a Friend",
  robots: { index: false, follow: false },
};

export default async function PlayFriendChessPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const token = typeof sp?.t === "string" ? sp.t : "";
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "8px 12px" }}>
      <FriendChessGame id={id} token={token} />
    </main>
  );
}
