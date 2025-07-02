<script lang="ts">
	// Components
	import LoggedIn from './LoggedIn.svelte';
	import LoggedOut from './LoggedOut.svelte';
	import ToggleLightDarkMode from './ToggleLightDarkMode.svelte';

	export let profileImage: string;

	// Variables
	import { userStore } from '$lib/stores/user.svelte';
</script>

<div class="navbar">
	<div class="flex items-center justify-between w-full">
		<a href="/" class="text-xl btn btn-ghost">Caracals Dashboard</a>
		<div class="flex-none">
			<ToggleLightDarkMode></ToggleLightDarkMode>
		</div>
	</div>

	{#if userStore.exists}
		<LoggedIn {profileImage}></LoggedIn>
	{:else}
		<LoggedOut></LoggedOut>
	{/if}
</div>
