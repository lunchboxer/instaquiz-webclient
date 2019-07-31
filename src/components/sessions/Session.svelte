<script>
  import { SESSION } from '../../data/queries'
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import SessionDetails from './SessionDetails.svelte'
  import { link } from 'svelte-routing'

  export let id

  const sessionCache = query(client, {
    query: SESSION,
    variables: { id }
  })
</script>

<svelte:head>
  <title>Session Details</title>
</svelte:head>

{#await $sessionCache}
  <Loading what="session"/>
{:then result}
  {#if result && result.data && result.data.session}
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><a href="/terms" use:link>Terms</a></li>
        <li><a href="/term/{result.data.session.course.term.id}" use:link>{result.data.session.course.term.name}</a></li>
        <li><a href="/course/{result.data.session.course.id}" use:link>{result.data.session.course.name}</a></li>
      </ul>
    </nav>
    <SessionDetails session={result.data.session} />
  {/if}
{:catch errors}
  <Error {errors} />
{/await}