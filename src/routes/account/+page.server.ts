// Libraries and modules
import { ImageService } from '$lib/services/image.service';
import { UserDatabase } from '$lib/database/user.database';

// Types and constants
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/**
 * Server load on registration checks if user is already logged in and redirects
 * to home page, otherwise returns auth providers if they exist.
 */
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.safeGetSession();
	if (session.user == null) {
		redirect(303, '/');
	}
};

/**
 * Registration action
 */
export const actions = {
	/**
	 * Upload action for profile image
	 */
	upload: async ({ locals, request }) => {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (file) {
			const profileImage = await ImageService.uploadProfileImage(file);
			const { user } = await locals.safeGetSession();
			if (user && profileImage) {
				const updatedUser = await UserDatabase.update(user.id, {
					profile_image: profileImage
				});
				return updatedUser;
			}
		}
	},
	/**
	 * Update action for user profile
	 */
	update: async ({ locals, request }) => {
		const formData = await request.formData();
		const { user } = await locals.safeGetSession();

		if (user) {
			const updates: Record<string, any> = {};
			for (const [key, value] of formData.entries()) {
				if (typeof value === 'string' && value.trim() !== '') {
					// Convert jersey_number to number if present
					if (key === 'jersey_number') {
						const num = Number(value);
						if (!isNaN(num)) {
							updates[key] = num;
						}
					} else {
						updates[key] = value;
					}
				}
			}

			if (Object.keys(updates).length > 0) {
				const updatedUser = await UserDatabase.update(user.id, updates);
				return updatedUser;
			}
		}
	}
} satisfies Actions;
