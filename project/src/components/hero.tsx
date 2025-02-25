import Image from "next/image"
import Link from "next/link"


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
                    <Link 
                        href={"#"}
                        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-bold text-center text-white rounded-lg bg-black hover:bg-stone-500 focus:ring-4 focus:ring-white"
                    >
                        Shop now
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}