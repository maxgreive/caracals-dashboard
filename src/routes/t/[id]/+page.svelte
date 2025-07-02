<script lang="ts">
  import Icon from "$lib/components/svgs/Icon.svelte";
  let { data } = $props();
</script>

<div class="flex flex-col w-full">
  <div class="mb-10">
    <a href="/" class="btn btn-ghost"><Icon icon="arrow-left" />Zurück zu allen Turnieren</a>
  </div>

  {#if data.tournament}
    <h1 class="text-3xl font-bold mb-10">{data.tournament.name}</h1>
    <ul>
      <li class="flex items-center gap-2">
        <Icon icon="pin" />
        <span>{data.tournament.location}</span>
      </li>
      <li class="flex items-center gap-2">
        <Icon icon="calendar" />
        <span>
          {data.tournament.start_date
            ? new Date(data.tournament.start_date).toLocaleDateString()
            : ""} &ndash; {data.tournament.end_date
            ? new Date(data.tournament.end_date).toLocaleDateString()
            : ""}
        </span>
      </li>
      <li class="flex items-center gap-2">
        <Icon icon="user" />
        <span>{data?.user?.username}</span>
      </li>
      <li class="flex items-center gap-2">{data.tournament.type}</li>
    </ul>
  {/if}
</div>
