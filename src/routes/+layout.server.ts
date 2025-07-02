import type { LayoutServerLoad } from './$types';
import { getProfileImageUrl } from '$lib/services/supabase.service';

/**
 * Gets data from our users table.
 *
 * @param param0
 * @returns
 */
export const load: LayoutServerLoad = async ({ locals }) => {
	const session = locals.session;
	const user = locals.user;
	let profileImage: string = '';

	const { data, error } = await locals.supabase.auth.getUser();

	if (data && error == null) {
		const result = await locals.supabase.from('users').select('*').eq('id', data.user.id);

		if (result.data && result.data.length > 0) {

			return {
				session: locals.session,
				user: result.data[0],
				profileImage: await getProfileImageUrl(result.data[0].profile_image) ?? ''
			};
		}
	}

	return {
		session,
		user,
		profileImage
	};
};
