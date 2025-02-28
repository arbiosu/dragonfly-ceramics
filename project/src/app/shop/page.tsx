import { getProducts } from "@/lib/stripe"


export default async function Shop() {
    const products = getProducts()
    console.log(products)
    return (
        <div className="container mx-auto">
            <ul>
                <li>
                    Produts
                </li>
            </ul>
        </div>
    )
}