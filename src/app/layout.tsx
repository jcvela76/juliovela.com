import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: ":// JULIO VELA | TECH SOLUTIONS",
  description:
    "Practical technology guidance on AI, automation, software strategy, and web solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[color:var(--brand-soft)] text-[color:var(--brand-space)]">
        {children}
      </body>
    </html>
  );
}
