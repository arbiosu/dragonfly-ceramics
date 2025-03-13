import LoginForm from "./login";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";


export default async function Page() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        return (
            <LoginForm />
        );
    } else {
        redirect("/")
    }
}
