import { PRIVATE_SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

// Uses the service role key, allowing bypass of RLS policies
export const supabaseServerClient = createClient(
	PUBLIC_SUPABASE_URL,
	PRIVATE_SUPABASE_SERVICE_ROLE_KEY,
	{
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			detectSessionInUrl: false
		}
	}
);


export async function getProfileImageUrl(path: string): Promise<string | null> {
  const { data, error } = await supabaseServerClient
    .storage
    .from('profile-images')
    .createSignedUrl(path, 60 * 60); // 1 hour expiry

  if (error) {
    console.error(error);
    return null;
  }
  return data.signedUrl;
}
