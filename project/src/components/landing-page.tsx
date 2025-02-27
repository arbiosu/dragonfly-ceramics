import Image from "next/image";
import ShopLink from "./shop-link";
import landingImg from "@/../public/pottery1.jpg"

export default function LandingPage() {
    return (
        <div className="h-screen flex flex-col">
            <div className="h-[90vh] w-full relative">
                <Image 
                    src={landingImg}
                    alt="Dragonfly Ceramics"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="h-[10vh] w-full flex items-center justify-center bg-df-bg">
                <ShopLink />
            </div>
        </div>
    )
}