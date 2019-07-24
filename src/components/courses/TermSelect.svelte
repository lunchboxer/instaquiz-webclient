<script>
  import { onMount } from 'svelte'
  import { terms, currentTerm } from '../../data/terms'

  export let termId = ''
  let termSelect

  onMount(async () => {
    if (!termId) { // not already chosen then get default
      if ($currentTerm) {
        termId = $currentTerm.id
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
      {#each Object.keys($terms) as term (term)}
        <option value={$terms[term].id}>{$terms[term].name}</option>
      {/each}
    {:else}
      <option value="">Loading terms...</option>
    {/if}
  </select>
</div>