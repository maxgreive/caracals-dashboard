<script lang="ts">
	// Libraries
	import "../app.css";
	import { goto, invalidate } from "$app/navigation";
	import { onMount, type Snippet } from "svelte";

	// Components
	import Navbar from "$lib/components/navbar/Navbar.svelte";

	import { supabase as clientSupabase } from "$lib/services/supabaseClient.service"; // <-- import your shared client

	// Types
	import type { Session, SupabaseClient } from "@supabase/supabase-js";
	import type { Tables } from "$lib/types/supabase";

	// Variables
	import { userStore } from "$lib/stores/user.svelte";

	type Props = {
		data: {
			profileImage: string;
			session: Session;
			user: Tables<"users">;
			supabase: SupabaseClient;
		};
		children: Snippet;
	};

	let { data, children }: Props = $props();

	let { session, user, supabase, profileImage } = data;

	let mounted = $state(false);

	onMount(async (): Promise<any> => {
		if (session) {
			await clientSupabase.auth.setSession({
				access_token: session.access_token,
				refresh_token: session.refresh_token,
			});
		}
		const { data } = supabase.auth.onAuthStateChange(async (_, newSession) => {
			if (!newSession) {
				/**
				 * Queue this as a task so the navigation won't prevent the
				 * triggering function from completing
				 */
				userStore.reset();
				goto("/", { replaceState: true });
				invalidate("/"); // Explicitly invalidate the current page
			}

			if (newSession?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}

			if (user) {
				userStore.set(user);
				mounted = true;
			}
		});

		mounted = true;
		return () => data.subscription.unsubscribe();
	});
</script>

{#if mounted}
	<Navbar {profileImage}></Navbar>
	<div class="container px-4 mx-auto">{@render children()}</div>
{/if}
