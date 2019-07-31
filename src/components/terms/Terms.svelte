<script>
  import TermsLoader from './TermsLoader.svelte'
  import { auth } from '../../data/auth'
  import CreateTerm from './CreateTerm.svelte'
  import { link } from 'svelte-routing'
</script>

<svelte:head>
  <title>Terms</title>
</svelte:head>

<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a href="/" use:link>Home</a></li>
    <li class="is-active"><a href="/terms" aria-current="page" use:link>Terms</a></li>
  </ul>
</nav>

<h1 class="title is-3">All Terms</h1>

{#if $auth.role === 'Teacher'}
  <CreateTerm />
{/if}

<TermsLoader />