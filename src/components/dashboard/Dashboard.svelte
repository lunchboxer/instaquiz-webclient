<script>
  import { TERMS_AND_ALL } from '../../data/queries'
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import TwoTermsList from './TwoTermsList.svelte'
  import UpcomingSessions from './UpcomingSessions.svelte'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'

  const termsCache = query(client, { query: TERMS_AND_ALL })
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<h1 class="title is-3">Dashboard</h1>

<UpcomingSessions />

{#await $termsCache}
  <Loading what="terms and courses" />
{:then result}
  <TwoTermsList terms={result.data.terms}/>
{:catch errors}
  <Error {errors}/>
{/await}