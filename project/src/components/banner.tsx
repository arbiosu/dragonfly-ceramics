export interface BannerLabel {
    label: string
}

interface BannerProps {
    items: BannerLabel[]
}


export default function Banner({ items }: BannerProps) {
    return (
        <div className="flex justify-center bg-neutral-200 py-6 border-y border-stone-200 overflow-hidden whitespace-nowrap">
            <div className="animate-scroll-x inline-block">
                {items.map((item, index) => (
                    <>
                        <span className="text-lg font-semibold text-black inline-block px-4" key={item.label}>{item.label}</span>
                        <span className="text-lg text-black inline-block px-4" key={index}>|</span>
                    </>
                ))}
            </div>
        </div>
    )
}
