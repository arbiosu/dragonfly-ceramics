import Link from "next/link";


export default function ShopLink({ label }: { label: string }) {
    return (
        <Link 
            href={"/shop"}
            className="inline-flex items-center justify-center px-5 py-3 mr-3
            text-center text-dfNew rounded-lg bg-dfNew2
            hover:bg-dfNew hover:text-white focus:ring-4 focus:ring-white
            transition duration-300 ease-in-out"
        >
            {label}
            <svg 
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    fillRule="evenodd" 
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd">
                </path>
            </svg>
        </Link>
    );
};
