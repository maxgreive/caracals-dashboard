<script>
  let { closeModal } = $props();
  import { supabase } from "$lib/services/supabaseClient.service";

  let name = $state(""),
    start_date = $state(""),
    end_date = $state(""),
    location = $state(""),
    division = $state(""),
    type = $state(""),
    surface = $state(""),
    loading = $state(false),
    error = $state("");

  async function createTournament() {
    loading = true;
    error = "";
    const { error: insertError } = await supabase.from("tournaments").insert([
      {
        name,
        start_date,
        end_date,
        location,
        division,
        type,
        surface,
      },
    ]);
    loading = false;
    if (insertError) {
      error = insertError.message;
    } else {
      closeModal();
    }
  }
</script>

<div class="modal modal-open">
  <div class="modal-box">
    <h2 class="text-2xl font-bold mb-4">Neues Turnier</h2>
    <form onsubmit={createTournament} class="flex flex-col gap-2">
      <fieldset>
        <legend class="fieldset-legend">Name</legend>
        <input
          class="input input-bordered"
          bind:value={name}
          placeholder="Name"
          required
        />
      </fieldset>
      <fieldset>
        <legend class="fieldset-legend">Startdatum</legend>
        <input
          class="input input-bordered"
          type="date"
          bind:value={start_date}
          placeholder="Startdatum"
          required
        />
      </fieldset>
      <fieldset>
        <legend class="fieldset-legend">Enddatum</legend>
        <input
          class="input input-bordered"
          type="date"
          bind:value={end_date}
          placeholder="Enddatum"
          required
        />
      </fieldset>
      <fieldset>
        <legend class="fieldset-legend">Ort</legend>
        <input
          class="input input-bordered"
          bind:value={location}
          placeholder="Ort"
          required
        />
      </fieldset>
      <fieldset>
        <legend class="fieldset-legend">Division</legend>
        <select bind:value={division} class="select">
          <option value="" disabled selected>Division wählen</option>
          {#each ["Mixed", "Women", "Open", "Masters Open", "Masters Women", "Grand Masters Open", "Grand Masters Women", "Juniors"] as d}
            <option value={d}>{d}</option>
          {/each}
        </select>
      </fieldset>
      <fieldset>
        <legend class="fieldset-legend">Turniertyp</legend>
        <select bind:value={type} class="select">
          <option value="" disabled selected>Turniertyp wählen</option>
          {#each ["Uni", "DFV", "Fun", "Hat", "Training"] as t}
            <option value={t}>{t}</option>
          {/each}
        </select>
      </fieldset>
      <fieldset>
        <legend class="fieldset-legend">Untergrund</legend>
        <div class="flex gap-4">
          {#each ["Grass/Turf", "Indoor", "Beach"] as s}
            <label>
              <input
                type="radio"
                name="surface"
                class="radio"
                bind:group={surface}
                value={s}
              />
              {s}
            </label>
          {/each}
        </div>
      </fieldset>
      {#if error}
        <div class="text-error">{error}</div>
      {/if}

      <div class="modal-action">
        <button class="btn" onclick={() => closeModal()}>Schließen</button>
        <button class="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Speichern..." : "Speichern"}
        </button>
      </div>
    </form>
  </div>
</div>
