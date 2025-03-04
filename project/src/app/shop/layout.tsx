import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CartProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </CartProvider>
    );
};