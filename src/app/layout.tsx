import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xlinic - Your AI Health Assistant",
  description: "Track your health with AI effortlessly. Your comprehensive health companion for all your health needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
} 