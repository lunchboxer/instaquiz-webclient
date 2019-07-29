<script context="module">
  import { TERMS_AND_ALL } from '../../data/queries'
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'

  export const terms = query(client, { query: TERMS_AND_ALL })
</script>

<script>
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import TermsList from './TermsList.svelte'
</script>

{#await $terms}
  <Loading what="terms and courses" />
{:then result}
  {#if result && result.data && result.data.terms}
    <TermsList terms={result.data.terms} />
  {/if}
{:catch errors}
  <Error {errors} />
{/await}
      