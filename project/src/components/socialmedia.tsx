import Image from "next/image";
import Link from "next/link";


interface SocialMediaData {
    src: string
    link: string
    alt: string
}

interface SocialMediaLinkProps {
    items: SocialMediaData[]
}


export function SocialMediaLink({ src, link, alt }: SocialMediaData) {
    return (
        <Link
            href={link}
            rel="noopener noreferrer"
            target="_blank"
        >
            <Image 
                src={src}
                alt={alt}
                width={48}
                height={48}
            />
        </Link>
    )
}


export function SocialMediaLinks({ items }: SocialMediaLinkProps) {
    return (
        <section className="bg-white">
            <div className="flex justify-start space-x-4">
                {items.map((sm, index) => (
                    <SocialMediaLink src={sm.src} link={sm.link} alt={sm.alt} key={index} />
                ))}
            </div>
        </section>
    )
}


export default function SocialMediaLinksComponent() {
    const socials = [
            {
                src: "/youtube.svg",
                link: "https://youtube.com/@dragonflyceramics?si=z3XyaYTzbkfRsiAe",
                alt: "Youtube",
            },
            {
                src: "/tiktok.svg",
                link: "https://www.tiktok.com/@dragonflyceramics?_t=ZT-8uFd3TGlJe7&_r=1",
                alt: "Tiktok",
            },
            {
                src: "/instagram.svg",
                link: "https://www.instagram.com/dragonflyceramics.kelly?igsh=Y3ZxYTZqbzZjMWxx&utm_source=qr",
                alt: "Instagram",
            },

        ]
    return (
        <SocialMediaLinks items={socials} />
    )
}


export function SocialMediaLinksCard() {
    return (
        <div className="w-full mx-auto rounded-lg shadow-lg bg-white p-6 flex flex-col h-full">
            <div className="text-center mb-auto justify-items-center space-y-8">
                <h2 className="text-xl font-bold text-df-text mb-2">
                    Follow Us
                </h2>
                <Image 
                    src="/profile.svg"
                    alt="Profile icon with heart"
                    width={100}
                    height={100}
                />
            </div>
            <div className="text-center my-auto py-4">
                <p className="text-df-text">
                    Keep up with Dragonfly Ceramics on YouTube, TikTok, and Instagram
                </p>
            </div>
            <div className="flex justify-center mt-4">
                <SocialMediaLinksComponent />
            </div>
        </div>
    )
}