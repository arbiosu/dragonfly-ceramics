"use client";

import Image from "next/image";
import { Stripe } from "stripe";
import { useState, useRef } from "react";
import { uploadImage } from "@/lib/supabase/model";
import { updateProductImagesById } from "@/lib/stripe/utils";


export default function AdminProductCard(props: { product: Stripe.Product }) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!file) {
            alert('Please upload an image')
            return;
        }

        if ((file?.size / 1024 / 1024) > 2) {
            alert('File size is too large. Image must be less than 2MB')
            return;
        }

        try {
            const imgPath = await uploadImage(file, product.id);
            if (!imgPath) {
                alert('File upload failed. Please try again later.');
                return;
            }
            const newImages = product.images;
            newImages.push(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/content/${imgPath}`);
            await updateProductImagesById(product.id, newImages)
        } catch (error) {
            alert("Upload failed. Please try again.");
            console.log(error);
            return;
        } finally {
            setLoading(false);
        }
    }

    const { product } = props;

    return (
        <div className="relative group w-full max-w-sm bg-df-bg rounded-lg shadow-t-md overflow-hidden">
            {/* Image Container */}
            <div className="relative w-full aspect-square">
                <Image 
                    src={product.images[0]}
                    alt={product.description || "No Description"}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                />
            </div>
            <div className="p-2">
                <h3 className="text-lg font-semibold text-df-text truncate">
                    {product.name}
                </h3>
                <p className="text-sm text-df-text mb-4 flex-grow">
                    {product.description}
                </p>
                <div className="mt-auto">
                    {product.default_price &&
                    typeof product.default_price !== 'string' &&
                    product.default_price.unit_amount ? (
                        <p className="text-xl font-bold text-df-text mb-3">
                            ${product.default_price?.unit_amount / 100}
                        </p>
                    ) : (
                        <p className="text-xl font-bold text-df-text mb-3">
                            No pricing data
                        </p>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <label className="text-df-text">
                        {`Add an Image to ${product.name}`}
                    </label>
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="text-df-text"
                        required
                    />
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-df-text text-white p-2 rounded">
                        {loading ? "Uploading..." : "Upload Image"}
                    </button>
                </form>
            </div>
        </div>
    );
}
