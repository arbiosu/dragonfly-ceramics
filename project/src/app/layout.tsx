import type { Metadata } from "next";
import { ralewayLight } from "@/../public/fonts/fonts"
import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";
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
        className={`${ralewayLight.className} ${ralewayLight.className} antialiased bg-df-bg`}
      >
        <CartProvider>
          <ToastProvider>
            <Navbar />
            {children}
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
