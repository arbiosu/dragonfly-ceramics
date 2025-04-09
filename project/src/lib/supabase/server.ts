import { createServerClient } from '@supabase/ssr';
import type { User, AuthError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

interface CheckUserResponse {
  user: User | null;
  err: AuthError | null;
}

export async function checkUser(): Promise<CheckUserResponse> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return {
      user: null,
      err: error,
    };
  }

  return {
    user: data.user,
    err: null,
  };
}
