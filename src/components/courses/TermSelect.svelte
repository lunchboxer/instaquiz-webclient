<script>
  import { onMount } from 'svelte'
  import { terms } from '../terms/data'

  export let termId = ''
  let termSelect

  onMount(async () => {
    await terms.get()
    if (!termId) { // not already chosen then get default
      const now = new Date().toISOString()
      const current = $terms.find(t => t.startDate < now && t.endDate > now)
      if (current) {
        termId = current.id
      }
    }
  })

  const handleChange = () => {
    termId = termSelect.value
  }
</script>

<style>
  .select {
    margin-bottom: 1rem;
  }
</style>

<div class="select">

  <select value={termId} on:change={handleChange} bind:this={termSelect}>
    {#if $terms}
    {#each $terms as {id, name} (id)}
    <option value={id}>{name}</option>
    {/each}
    {:else}
    <option value="">Loading terms...</option>
    {/if}
  </select>
</div>