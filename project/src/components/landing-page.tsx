import ShopLink from "@/components/shop/shop-link";
import Image from "next/image";


function LandinPageVideo() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video 
                autoPlay 
                loop
                muted 
                playsInline 
                preload="auto"
                className="w-full h-full object-cover"
            >
                <source 
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/content/videos/df-video-compressed.mp4`} 
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default function LandingPage() {
    return (
        <div className="h-screen w-full relative">
            <LandinPageVideo />
            <div className="absolute inset-0 flex flex-col items-center justify-center mx-8">
                <Image 
                    src="/dragonfly-text-white.png" 
                    alt="Dragonfly Ceramics"
                    width={600}
                    height={400}
                    className="mb-4"
                />
                <ShopLink label={"Shop Now"} />
            </div>
        </div>
    );
}