import Image from "next/image"
import ShopLink from "@/components/shop-link"

export default function Hero() {
    return (
        <section className="grid min-h-[100dvh] w-full md:grid-cols-2 bg-white text-black">
            <div className="relative order-2 min-h-[50vh] md:order-1 md:min-h-[100dvh]">
                <Image 
                    src="/dragonfly.jpg"
                    alt="Dragonfly Ceramics Art"
                    fill
                    className="object-cover" />
            </div>
            <div className="order-1 flex min-h-[50vh] items-center justify-center p-6 md:order-2 md:min-h-[100dvh] md:p-12 lg:p-16">
                <div className="flex max-w-md flex-col gap-8">
                    <div className="space-y-4">
                    <h1 className="font-serif text-sm uppercase tracking-wider text-muted-foreground">
                        Welcome to Dragonfly Ceramics
                    </h1>
                    <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                        Handcrafted Pottery - insert more interesting text here.
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Insert some text here for your brand
                    </p>
                    </div>
                    <ShopLink />
                </div>
            </div>
        </section>
    )
}