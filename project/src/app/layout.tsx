import type { Metadata } from "next";
import { ralewayLight } from "@/../public/fonts/fonts"
import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";


export const metadata: Metadata = {
  title: "Dragonfly Ceramics",
  description: "Handcrafted Pottery Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ralewayLight.variable} ${ralewayLight.variable} antialiased bg-df-bg`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
