import ShopLink from "@/components/shop/shop-link";

export default function Canceled() {
    return (
        <section id="canceled" className="container mx-auto py-40">
            <div className="py-20 grid gap-10 justify-center">
                <p className="text-3xl text-df-text text-center">Something went wrong with your order and it has been canceled.</p>
                <ShopLink label={"Return to Shop"} />
            </div>
        </section>
    );
};