<script lang="ts">
	// Libraries and modules
	import { deserialize } from '$app/forms';

	// Types and variables
	import type { Tables } from '$lib/types/supabase';
	import type { ActionResult } from '@sveltejs/kit';

	import { userStore } from '$lib/stores/user.svelte';
    import Icon from '$lib/components/svgs/Icon.svelte';

	let formElement: HTMLFormElement;
	let profileFormElement: HTMLFormElement;
	let fileInput: any;
	let editing = false,
		error = "";

	export let data;
	const { profileImage } = data;

	let username = userStore.username;

	function triggerFileInput() {
		if (fileInput) fileInput.click(); // Safely trigger the file input
	}

	async function handleSubmit(event: Event) {
		event.preventDefault(); // Prevent the form from submitting normally

		const formData = new FormData(formElement);

		if (formData.get('file')) {
			// Submit to the 'upload' action in +page.server.ts
			const response = await window.fetch('?/upload', {
				method: 'POST',
				body: formData
			});

			const result: ActionResult = deserialize(await response.text());

			if (result.type == 'success') {
				if (result.data) {
					userStore.set(result.data as Tables<'users'>);
				}
			} else {
				console.error('Error uploading new profile image');
			}
		}
	}
	async function saveProfile(event: Event) {
		event.preventDefault(); // Prevent the form from submitting normally
		const formData = new FormData(profileFormElement);

		if (formData.get('username')) {
			// Submit to the 'saveProfile' action in +page.server.ts
			const response = await window.fetch('?/update', {
				method: 'POST',
				body: formData
			});

			const result: ActionResult = deserialize(await response.text());

			if (result.type == 'success') {
				if (result.data) {
					userStore.set(result.data as Tables<'users'>);
				}
			} else {
				error = 'Error saving profile';
				console.error('Error saving profile');
			}
		}
	}
</script>

<div class="flex justify-center px-5 mt-10 sm:px-6 lg:px-0">
	<div class="w-full p-6 rounded-lg shadow bg-base-200 sm:w-3/4 lg:w-1/2">
		{#if userStore.exists}
			<div class="flex flex-row items-center">
				<form bind:this={formElement} onsubmit={handleSubmit}>
					<button type="button" class="relative hover:cursor-pointer" onclick={triggerFileInput}>
						<div class="w-16 h-16 overflow-hidden border-4 rounded-full border-primary">
							<img
								class="object-cover w-full h-full rounded-full"
								alt="Avatar"
								src={profileImage}
								role="none"
							/>
						</div>
						<span
							class="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 text-md transform translate-x-1 translate-y-1.5 border-white rounded-full bg-primary"
							>+</span
						>
					</button>
					<input
						type="file"
						id="file-upload"
						name="file"
						accept="image/*"
						style="display: none;"
						bind:this={fileInput}
						onchange={handleSubmit}
					/>
					<button type="submit" style="display: none;">Submit</button>
				</form>
				<h1 class="pl-5 text-2xl font-bold">{userStore.username}</h1>
			</div>

			<form bind:this={profileFormElement} onsubmit={saveProfile} class="flex flex-col gap-2 mt-10">
				<fieldset>
        	<legend class="fieldset-legend">Name</legend>
					<input type="text" name="username" placeholder="Username" class="input" bind:value={userStore.username} />
				</fieldset>
				<fieldset>
        	<legend class="fieldset-legend">Rückennummer</legend>
					<input type="number" name="jersey_number" placeholder="#7" class="input" bind:value={userStore.jersey_number} />
				</fieldset>

				{#if error}
					<div class="text-error">{error}</div>
				{/if}

				<div class="flex mt-10">
					{#if editing}
						<button class="btn btn-ghost ml-auto" type="button" onclick={() => (editing = false)}>
							Abbrechen
						</button>
						<button class="btn btn-primary ml-4" type="submit">
							<Icon icon="save" />
							Speichern
						</button>
					{:else}
						<button class="btn btn-primary ml-auto" type="button" onclick={() => (editing = true)}>
							<Icon icon="edit" />
							Profil bearbeiten
						</button>
					{/if}
				</div>
			</form>
		{/if}
	</div>
</div>
