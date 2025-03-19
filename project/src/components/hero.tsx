import Image from "next/image"
import SubscribeCard from "@/components/subscribe-card";
export default function Hero() {
    return (
        <section className="grid min-h-[100dvh] w-full md:grid-cols-2 text-df-text">
            <div className="relative order-2 min-h-[50vh] md:order-1 md:min-h-[100dvh]">
                <Image 
                    src="/pottery.jpg"
                    alt="Dragonfly Ceramics Art"
                    fill
                    className="object-cover" />
            </div>
            <div className="order-1 flex min-h-[50vh] items-center justify-center p-6 md:order-2 md:min-h-[100dvh] md:p-12 lg:p-16">
                <div className="flex max-w-md flex-col gap-8">
                    <div className="space-y-4">
                        <h2 className="text-df-text text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                            All handmade one of a kind pottery, made with love
                        </h2>
                        <p className="text-df-text text-lg font-medium">Sign up for the mailing list and never miss an update</p>
                    </div>
                    <SubscribeCard />
                </div>
            </div>
        </section>
    )
}