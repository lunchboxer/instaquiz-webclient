<script>
  import { auth } from '../../data/auth'
  import TermsLoader from './TermsLoader.svelte'
  import TermsList from './TermsList.svelte'
  import CreateTerm from './CreateTerm.svelte'
</script>

<svelte:head>
  <title>Terms</title>
</svelte:head>

<h1 class="title is-3">Terms</h1>

{#if $auth.role === 'Teacher'}
  <CreateTerm />
{/if}

<TermsLoader let:terms>
  <TermsList {terms} />
</TermsLoader>