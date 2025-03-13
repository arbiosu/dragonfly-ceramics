import Image from "next/image";
import ShopLink from "@/components/shop/shop-link";
import { ImageGridItem } from "@/components/image-grid";
import SubscribeCard from "@/components/subscribe-card";
import { SocialMediaLinksCard } from "@/components/socialmedia";


export default function About() {
    return (
        <>
        <section className="bg-df-bg mx-auto px-4 py-28 md:py20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-square bg-df-bg">
                    <Image
                        src="/about-kelly-cropped.jpg"
                        alt="Kelly Slater, Owner, Dragonfly Ceramics"
                        fill
                        className="object-contain bg-df-bg"
                    />
                </div>
                <div className="space-y-8">
                    <div className='space-y-6'>
                        <h2 className="text-df-text text-6xl font-light tracking-wider text-center md:text-left">
                            Meet the Artist
                        </h2>
                        <p className="text-df-text leading-relaxed text-3xl text-center md:text-left">Kelly Slater (she/her)</p>
                        <p className="text-df-text leading-relaxed text-lg text-center md:text-left italic">Ceramicist</p>
                        <p className="text-df-text leading-relaxed text-lg text-center md:text-left italic">Based in NYC</p>
                        <p className="text-df-text leading-relaxed">
                            I first started working with clay in highschool and then pottery
                            quickly became an obsession in college. I fell in love with the medium
                            when I started to create both functional and nonfunctional things for myself. 
                            Soon enough, I had so much pottery in my home, that I needed to share it with others. 
                        </p>
                        <p className="text-df-text leading-relaxed">
                            I currently produce small batches of my work and list them here on
                            my website when they are finished. I also offer the option to commission
                            me for custom work and large batch items at a wholesale rate. Be sure to
                            sign up for my newsletter so you know when I restock and if anything else
                            exciting happens! 
                        </p>
                        <ShopLink label={"Shop Now"}/>
                    </div>
                </div>
            </div>
        </section>
        <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <SocialMediaLinksCard />
                <ImageGridItem src="/pottery-hand.jpeg" alt="Grid image 2" />
            </div>
        </div>
        <div className="container mx-auto max-w-lg py-20">
            <h3 className="text-df-text text-center text-4xl md:text-6xl font-semibold mb-4">
                Subscribe to the Newsletter
            </h3>
            <p className="text-lg text-df-text text-center tracking-tight font-medium mb-4">Sign up for the mailing list and never miss an update</p>
            <SubscribeCard />
        </div>

        </>
    );
};
