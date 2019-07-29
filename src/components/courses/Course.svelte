<script>
  import { COURSE } from '../../data/queries'
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import CourseDetails from './CourseDetails.svelte'

  export let params = {}

  const courseCache = query(client, {
    query: COURSE,
    variables: { id: params.id }
  })
</script>

<svelte:head>
  <title>Course Details</title>
</svelte:head>

<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="#/Terms">Terms</a></li>
    <li><a href="#/Courses">Courses</a></li>
  </ul>
</nav>

{#await $courseCache}
  <h1 class="title is-3">Course Details</h1>
  <Loading what="course"/>
{:then result}
  {#if result && result.data && result.data.course}
    <CourseDetails course={result.data.course} terms={result.data.terms} />
  {/if}
{:catch errors}
  <Error {errors} />
{/await}