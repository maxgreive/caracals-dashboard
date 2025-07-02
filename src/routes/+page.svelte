<script lang="ts">
	import Icon from "$lib/components/svgs/Icon.svelte";
	import TournamentModal from "$lib/components/modals/TournamentModal.svelte";
	let { data } = $props();

	let showModal = $state(false);

	const badgeColors = {
		Fun: "badge-success",
		Uni: "badge-error",
		DFV: "badge-warning",
		Training: "badge-info",
		Hat: "badge-primary",
	};

	const statusColors = {
		not_registered: "status-info",
		waiting: "status-secondary",
		declined: "status-error",
		cancelled: "status-error",
		approved: "status-success",
	};

	const getParticipations = (tournament: any) => {
		if (!tournament.participants) return 0;
		const quota =
			(tournament.participants_m_min ?? 0) +
			(tournament.participants_f_min ?? 0);
		if (quota === 0) return 0;
		return Math.round((tournament.participants.length / quota) * 100);
	};

</script>

<div class="flex flex-col w-full">
	<button class="btn btn-primary ml-auto mb-10" onclick={() => showModal = true }
		><Icon icon="plus" />Neues Turnier</button
	>

	{#if showModal}
		<TournamentModal closeModal={() => (showModal = false)} />
	{/if}

	<div class="overflow-x-auto">
		<table class="table table-auto">
			<thead>
				<tr>
					<th class="text-center">Status</th>
					<th>Type</th>
					<th>Name</th>
					<th>Startdatum</th>
					<th>Enddatum</th>
					<th>Ort</th>
					<th>Division</th>
					<th>Zusagen</th>
					<th>Feld-Typ</th>
				</tr>
			</thead>
			<tbody>
				{#each data.tournaments as tournament}
					<tr>
						{#if tournament.status}
							<td class="text-center" title={tournament.status.toUpperCase()}>
								<div class="inline-grid *:[grid-area:1/1]">
									<div class={`status ${statusColors[tournament.status]} animate-ping`}></div>
									<div class={`status ${statusColors[tournament.status]}`}></div>
								</div>
							</td>
						{/if}
						{#if tournament.type}
							<td>
								<span
									class={`badge badge-dash ${badgeColors[tournament.type]}`}
								>
									{tournament.type}
								</span>
							</td>
						{/if}
						<td>
							<a href="/t/{tournament.id}" class="btn btn-ghost">
								{tournament.name}
							</a>
						</td>
						<td>
							{tournament.start_date
								? new Date(tournament.start_date).toLocaleDateString()
								: ""}
						</td>
						<td>
							{tournament.end_date
								? new Date(tournament.end_date).toLocaleDateString()
								: ""}
						</td>
						<td>{tournament.location}</td>
						<td>{tournament.division}</td>

						<td class="whitespace-nowrap">
							<span
								class="radial-progress text-primary"
								style={`--value: ${getParticipations(tournament)};--size: 1rem;--thickness: 3px;`}
								aria-valuenow={getParticipations(tournament)}
								role="progressbar"
							></span>
							<span>
								{tournament?.participants?.length ?? 0} / {(tournament?.participants_m_min ??
									0) + (tournament?.participants_f_min ?? 0)}
							</span>
						</td>
						<td>{tournament.surface}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
