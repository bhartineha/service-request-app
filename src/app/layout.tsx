import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConfigureAmplify from "../utils/configureAmplify";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Service Request Tracker",
  description: "Track and manage service requests efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-blue-50 to-blue-100`}>
        <ConfigureAmplify />
        <main 
          style={{
            backgroundImage: `url('https://service-portal-docs.s3.us-east-1.amazonaws.com/backdrop.jpg')`,
            backgroundSize: 'cover', // Ensures the image covers the entire element
            backgroundPosition: 'center', // Centers the image
            backgroundRepeat: 'no-repeat', // Prevents the image from repeating
          }}>
          <Header />
          {children}
          </main>
      </body>
    </html>
  );
}