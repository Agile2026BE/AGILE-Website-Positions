import "./globals.css";

export const metadata = {
  title: "AGILE Careers | AEC Engineering Opportunities",
  description:
    "Explore AEC engineering and building systems career opportunities with AGILE Business Consulting.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
