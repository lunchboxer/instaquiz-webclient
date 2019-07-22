<script>
  import { onMount } from 'svelte'
  import { auth } from '../../data/auth'
  import { request } from '../../data/fetch-client'
  import { GET_MY_COURSES } from './queries'

  onMount(async () => {
    const response = await request(GET_MY_COURSES, { id: $auth.id })
  })
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

{#if $auth.role === 'Teacher'}
<h1 class="title">Teacher dashboard</h1>
{:else}
<h1 class="title">Student dashboard</h1>
{/if}
