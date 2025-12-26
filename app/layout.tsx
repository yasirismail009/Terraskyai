import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TerraSkyAI - Where Technology Meets Agriculture",
  description: "TerraSkyAI is a precision agriculture platform that uses AI to help farmers make better decisions about their crops and soil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
    >
      <head>
        <link rel="icon" href="/assets/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <Header />
        <main className="pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
