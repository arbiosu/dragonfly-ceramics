import ShopLink from "@/components/shop/shop-link";


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
    )
}

export default function LandingPage() {
    return (
        <div className="h-screen flex flex-col">
            <div className="h-[90vh] w-full relative">
                <LandinPageVideo />
            </div>
            <div className="h-[10vh] w-full flex items-center justify-center bg-df-bg">
                <ShopLink label={"Shop Now"}/>
            </div>
        </div>
    )
}