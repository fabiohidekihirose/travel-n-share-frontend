import "./globals.css";

export const metadata = {
  title: "Travel N Share",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#112D4E]">
      <body className="h-full">{children}</body>
    </html>
  );
}
