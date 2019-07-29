<script>
  import { TERMS_AND_ALL } from '../../data/queries'
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import TermsList from './TermsList.svelte'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import { auth } from '../../data/auth'
  import CreateTerm from './CreateTerm.svelte'

  const termsCache = query(client, { query: TERMS_AND_ALL })
</script>

<svelte:head>
  <title>Terms</title>
</svelte:head>

<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Home</a></li>
    <li class="is-active"><a href="#/Terms" aria-current="page">Terms</a></li>
  </ul>
</nav>

<h1 class="title is-3">All Terms</h1>

{#if $auth.role === 'Teacher'}
  <CreateTerm />
{/if}

{#await $termsCache}
  <Loading what="terms and courses" />
{:then result}
  <TermsList terms={result.data.terms}/>
{:catch errors}
  <Error {errors}/>
{/await}