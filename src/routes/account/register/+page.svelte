<script lang="ts">
	// Modules
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	// Compoents
	import Google from '$lib/components/svgs/Google.svelte';

	// Types and constants
	import type { ActionResult } from '@sveltejs/kit';
	import type { ErrorRegisterUser } from '$lib/types/account';

	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let errors: ErrorRegisterUser;

	/**
	 * Custom handler for submission
	 *
	 * @param event
	 */
	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		try {
			const formData = new FormData(event.currentTarget);
			const response = await fetch(event.currentTarget.action, {
				method: 'POST',
				body: formData
			});

			const result: ActionResult = deserialize(await response.text());

			if (result.type == 'redirect') {
				await invalidateAll();
				await applyAction(result);
			} else if (result.type == 'failure') {
				if (result.data && result.data.errors) {
					errors = result.data.errors;
				}
			} else {
				errors = { other: 'Unknown error occurred' };
			}
		} catch (error: any) {
			errors = { other: 'Unknown error occurred' };
		}
	}
</script>

<div class="flex flex-col items-center min-h-screen lg:mt-20 md:mt-20">
	<div class="w-full max-w-md px-8 py-6 text-center test rounded-xl bg-base-200">
		<h3 class="mt-4 mb-4 text-3xl font-bold text-center">Register</h3>

		<form
			action="?/email"
			class="gap-2 p-4 rounded form-control"
			method="POST"
			on:submit|preventDefault={handleSubmit}
		>
			<div>
				<label for="username" class="mb-1 block text-sm font-medium text-left">Username</label>
				<input
					type="text"
					placeholder="Username"
					name="username"
					class="w-full px-4 py-2 border rounded-md"
					bind:value={username}
				/>
				<p class="mt-1 text-sm text-error">{errors?.username || ''}</p>
			</div>

			<div>
				<label for="email" class="mb-1 block text-sm font-medium text-left">Email</label>
				<input
					type="email"
					placeholder="Email"
					name="email"
					class="w-full px-4 py-2 border rounded-md"
					bind:value={email}
				/>
				<p class="mt-1 text-sm text-error">{errors?.email || ''}</p>
			</div>

			<div>
				<label for="password" class="mb-1 block text-sm font-medium text-left">Password</label>
				<input
					type="password"
					placeholder="Password"
					name="password"
					class="w-full px-4 py-2 border rounded-md"
					bind:value={password}
				/>
				<p class="mt-1 text-sm text-error">{''}</p>
			</div>

			<div>
				<label for="passwordConfirm" class="mb-1 block text-sm font-medium text-left">Password confirmation</label>
				<input
					type="password"
					placeholder="Confirm Password"
					name="passwordConfirm"
					class="w-full px-4 py-2 border rounded-md"
					bind:value={confirmPassword}
				/>
				<p class="mt-1 text-sm text-error">{errors?.password || ''}</p>
			</div>

			<div>
				<p class="mt-1 text-center text-sm text-error">{errors?.other || ''}</p>
			</div>

			<div class="flex justify-center mt-4">
				<button class="px-6 py-2 leading-5 rounded-md btn focus:outline-none btn-primary">Register</button>
			</div>
		</form>

		<div class="pt-4">
			<hr />
		</div>

		<form
			action="?/google"
			class="gap-2 p-4 rounded form-control"
			method="POST"
			on:submit|preventDefault={handleSubmit}
		>
			<Google buttonText={'Register with Google'} />
		</form>
	</div>
</div>
