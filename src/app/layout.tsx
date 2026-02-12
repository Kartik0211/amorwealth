import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Amorwealth",
  description: "Financial Calculators for Everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-pale-slate`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-grow">
            <Sidebar />
            <main className="flex-grow p-8">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
