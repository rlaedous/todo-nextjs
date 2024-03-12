import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex gap-4 p-4 bg-blue-500 text-white">
          <Link href="/about">about</Link>
          <Link href="/report">report</Link>
          <Link href="/todos-csr">todos-csr</Link>
          <Link href="/todos-ssr">todos-ssr</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
