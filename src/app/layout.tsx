import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import QueryProvider from "./provider";

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
          <a href="/todos-ssr">todos-ssr</a>
          {/* <Link href="/todos-ssr">todos-ssr</Link> */}
          {/* link 태그사용시 : csr page에서 새로고침  -> 글작성 -> ssr page(정상출력) ->csr page -> 글작성 -> ssr page (두번째 글작성 출력 x  과정 반복~~~) 나타남
          link는 무조건 캐싱처리를 한다 ! */}
        </nav>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
