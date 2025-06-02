import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "Houseek | Victor Abuka",
  description: "Created by Victor Abuka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
