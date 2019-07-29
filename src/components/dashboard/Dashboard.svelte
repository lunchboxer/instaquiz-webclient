<script>
  import TermsLoader from '../terms/TermsLoader.svelte'
  import UpcomingSessions from './UpcomingSessions.svelte'
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<h1 class="title is-3">Dashboard</h1>

<UpcomingSessions />

<TermsLoader />