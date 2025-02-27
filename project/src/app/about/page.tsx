import Image from "next/image";
import ShopLink from "@/components/shop-link";
import ImageGrid from "@/components/image-grid";
import SubscribeCard from "@/components/subscribe-card";
import FAQCarousel from "@/components/faqs";
import { SocialMediaLinksCard } from "@/components/socialmedia";
import potterySvg from "@/../public/ceramic-vase.svg"


export default function About() {
    
    const imageGridItems = [
        { heading: "Handcrafted", src: "/pottery1.jpg"},
        { heading: "Excellence", src: "/pottery2.jpg"},
        { heading: "Sustainable", src: "/pottery-hand.jpeg"}, 
    ]

    const sampleFaqs = [
        { id: 1, question: "Blah blah blah?", answer: "Yes!"},
        { id: 2, question: "Blha blah blha?", answer: "No!"},
        { id: 3, question: "Blha blah blha?", answer: "Yes!"},
        { id: 4, question: "Blha blah blha?", answer: "No!"},
        { id: 5, question: "Blha blah blha?", answer: "Yes!"},
    ]

    return (
        <>
        <section className="bg-df-bg mx-auto px-4 py-12 md:py20">
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
                        <div className="w-24 h-24 mx-auto md:mx-0">
                            <Image src={potterySvg} alt="Pottery Icon" />
                        </div>
                        <h2 className="text-df-text text-6xl font-light tracking-wider text-center md:text-left">
                            Meet the Artist
                        </h2>
                        <p className="text-df-text leading-relaxed">
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Phasellus curae est suscipit ultricies imperdiet ligula duis. Augue dis odio sociosqu vel laoreet mollis consectetur. Enim nullam ipsum aliquet natoque ante malesuada auctor dictum efficitur. Montes faucibus fermentum urna; in hendrerit dapibus purus.
                        </p>
                        <ShopLink />
                    </div>
                </div>
            </div>
        </section>
        <section className="p-8 grid md:grid-cols-3 gap-2 bg-df-bg">
            <SubscribeCard />
            <Image
                src="/logo-black.png"
                alt="Dragonfly Ceramics Logo"
                width={600}
                height={400}
            />
            <SocialMediaLinksCard />
        </section>
        <FAQCarousel faqs={sampleFaqs} />
        <ImageGrid items={imageGridItems} />
        </>
    )

}