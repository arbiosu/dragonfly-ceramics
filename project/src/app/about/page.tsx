import Image from "next/image";
import ShopLink from "@/components/shop-link";
import ImageGrid from "@/components/image-grid";
import SubscribeCard from "@/components/subscribe-card";
import { FAQHorizontalScroll} from "@/components/faqs";
import { SocialMediaLinksCard } from "@/components/socialmedia";
import potterySvg from "@/../public/ceramic-vase.svg"
import logo from "@/../public/logo-df-text.png"


export default function About() {
    
    const imageGridItems = [
        { heading: "Handcrafted", src: "/pottery1.jpg"},
        { heading: "Excellence", src: "/pottery2.jpg"},
        { heading: "Sustainable", src: "/pottery-hand.jpeg"}, 
    ]

    const faqs = [
        {
          id: 1,
          question: "What if my purchase is damaged or delayed?",
          answer: "All products are packaged with love and care and I ship them out ASAP with a tracking number. However, if your piece comes damaged, please email me photos within 3 days of arrival. I will try my best to replace the item with something similar or a full or partial refund can be given."
        },
        {
          id: 2,
          question: "Where do you ship?",
          answer: "As of now, I only ship in the United States but hope to eventually expand internationally!"
        },
        {
          id: 3,
          question: "How do I take care of my Pottery?",
          answer: "All of my pieces are dishwasher and microwave safe! However, I always recommend handwashing. Pieces that are not dishwasher and microwave safe will be labeled in the description of the piece."
        },
        {
          id: 4,
          question: "Do you accept returns?",
          answer: "Please make your purchases carefully as all sales are final. I only accept returns if the wrong item was shipped to you."
        },
        {
          id: 5,
          question: "When do you restock?",
          answer: "I have no particular schedule for restocks. As long as you are following my socials and/or signed up for my newsletter, you will be alerted when a drop happens!"
        },
        {
          id: 6,
          question: "How do I purchase a custom or wholesale order?",
          answer: "Please fill out the form under the “contact” page and allow up to 72 hours for me to respond!"
        }
      ];

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
                src={logo}
                alt="Dragonfly Ceramics Logo"
            />
            <SocialMediaLinksCard />
        </section>
        <section className="pt-20">
            <FAQHorizontalScroll faqs={faqs} />
        </section>
        <ImageGrid items={imageGridItems} />
        </>
    )

}