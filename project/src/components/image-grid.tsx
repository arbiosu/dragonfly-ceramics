import Image from "next/image";


export interface ImageCard {
    heading: string
    src: string
}

interface ImageGridProps {
    items: ImageCard[]
}


export default function ImageGrid({ items }: ImageGridProps) {
    return (
        <section className="bg-df-bg mx-auto px-4 py-12 md:py-20">
            <div className="grid md:grid-cols-3 gap-8">
                {items.map((card) => (
                    <div key={card.src} className="group cursor-pointer">
                        <div className="relative aspect-square bg-stone-100 mb-4 overflow-hidden">
                            <Image
                                src={card.src}
                                alt={card.heading}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <h3 className="text-lg text-df-text tracking-wider">
                            {card.heading}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    )
}
