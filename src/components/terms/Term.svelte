<script>
  import { query } from 'svelte-apollo'
  import { link } from 'svelte-routing'
  import { client } from '../../data/apollo'
  import { TERM } from '../../data/queries'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import TermDetails from './TermDetails.svelte'

  export let id

  const termCache = query(client, {
    query: TERM,
    variables: { id }
  })
</script>

<svelte:head>
  <title>Term Details</title>
</svelte:head>

{#await $termCache}
    <Loading what="session"/>
  {:then result}
    {#if result && result.data && result.data.term}
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><a href="/terms" use:link>Terms</a></li>
        </ul>
      </nav>
      <TermDetails term={result.data.term}/>
    {/if}
  {:catch errors}
    <Error {errors} />
  {/await}