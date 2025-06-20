import type { Metadata } from "next";
import Navbar from './components/Navbar';
import ScrollToTop from "./components/ScrollToTop";
import Flooter from "./components/Footer"
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventQuorum",
  description: "Une nouvelle façon de créer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
