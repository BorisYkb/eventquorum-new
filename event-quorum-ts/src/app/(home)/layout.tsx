// src/app/(home)/layout.tsx
import type { Metadata } from "next";
import Navbar from './components/Navbar';
import ScrollToTop from "./components/ScrollToTop";
import Flooter from "./components/Footer"
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Flooter />
        <ScrollToTop />
      </body>
    </html>
  );
}