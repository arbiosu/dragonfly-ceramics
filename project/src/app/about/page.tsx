import Image from "next/image";
import ShopLink from "@/components/shop/shop-link";
import SubscribeCard from "@/components/subscribe-card";
import { SocialMediaLinksCard } from "@/components/socialmedia";
import { BasicCarousel } from "@/components/carousel";


export default function About() {
    const carouselItems = [
        <div key="slide-1" className="relative h-[500px] w-full">
          <Image
            src="/pottery1.jpg"
            alt="Slide 1"
            fill
            className="object-contain rounded-lg"
            priority
          />
        </div>,
        <div key="slide-2" className="relative h-[500px] w-full">
          <Image src="/pottery2.jpg" alt="Slide 2" fill className="object-contain" />
        </div>,
        <div key="slide-3" className="relative h-[500px] w-full">
          <Image src="/pottery-hand.jpeg" alt="Slide 3" fill className="object-contain" />
        </div>,
      ]

    return (
        <>
        <section className="bg-df-bg mx-auto px-4 py-20 md:py20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-square bg-df-bg">
                    <Image
                        src="/about-kelly-cropped.jpg"
                        alt="Kelly From Dragonfly Ceramics"
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
                        <ShopLink />
                    </div>
                </div>
            </div>
        </section>
        <section className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-12 place-items-center bg-df-bg">
                <div className="w-full max-w-lg mx-auto">
                <SocialMediaLinksCard />
                </div>
                <div className="w-full max-w-lg mx-auto">
                <BasicCarousel items={carouselItems} />
                </div>
            </div>
            <div className="py-12 flex justify-center">
                <div className="w-full max-w-lg">
                <SubscribeCard />
                </div>
            </div>
        </section>
        </>
    );
};
