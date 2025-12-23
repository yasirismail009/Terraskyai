import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "fyllo - Where Technology Meets Agriculture",
  description: "Next Gen Agri Intelligence Platform - Data Backed Agriculture Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <Header />
        <main className="pt-16 lg:pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
