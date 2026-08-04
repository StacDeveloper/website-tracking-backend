import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebTest — Test your website. Get real insights.",
  description:
    "Run automated tests, check performance, SEO, accessibility and more. Everything you need to make your website better.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
