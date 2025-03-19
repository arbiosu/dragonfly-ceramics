import { Raleway, Pacifico } from "next/font/google";

export const ralewayLight = Raleway({
    weight: "300",
    variable: "--font-raleway",
    subsets: ["latin"],
    display: "swap",
});

export const cursiveFont = Pacifico({
    weight: "400",
    variable: "--font-pacifico",
    subsets: ["latin"],
    display: "swap",
});