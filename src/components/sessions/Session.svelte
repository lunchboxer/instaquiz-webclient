<script>
  import { SESSION } from '../../data/queries'
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import SessionDetails from './SessionDetails.svelte'

  export let params = {}

  const sessionCache = query(client, {
    query: SESSION,
    variables: { id: params.id }
  })
</script>

<svelte:head>
  <title>Session Details</title>
</svelte:head>

<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="#/terms">Terms</a></li>
    <li><a href="#/courses">Courses</a></li>
    <li><a href="#/sessions">Sessions</a></li>
  </ul>
</nav>

{#await $sessionCache}
    <h1 class="title is-3">Session Details</h1>
    <Loading what="session"/>
  {:then result}
    {#if result && result.data && result.data.session}
      <SessionDetails session={result.data.session} />
    {/if}
  {:catch errors}
    <Error {errors} />
  {/await}