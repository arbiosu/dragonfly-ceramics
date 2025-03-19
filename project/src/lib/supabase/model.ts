"use server";

import { createServiceClient } from "./service";

export async function uploadImage(file: File, productId: string) {
    const fileName = `product_images/${productId}/${Date.now()}`;
    const supabase = await createServiceClient();
    const { data, error } = await supabase
        .storage
        .from('content')
        .upload(fileName, file)

    if (error) {
        console.error(error.message);
    }

    return data?.path;
}