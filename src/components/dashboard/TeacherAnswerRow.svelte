<script>
  export let answer
  export let responses
  export let totalResponses

  $: percentage = responses.length === 0 || !totalResponses ? 0
    : responses.length / totalResponses
  $: console.log(parseInt(responses.length, 10))
</script>

<li>
  <strong>{answer.text}</strong>
  {#if responses.length > 0}
  {responses.length} votes ({percentage}%)
  {/if}
</li>