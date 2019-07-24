<script>
  import { onMount } from 'svelte'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import { auth } from '../../data/auth'
  import { request } from '../../data/fetch-client'
  import Loading from '../Loading.svelte'
  import { GET_TERMS, GET_MY_COURSES } from './queries'
  import AddCourse from '../courses/AddCourse.svelte'
  import CreateTerm from '../terms/CreateTerm.svelte'
  import CourseListRow from './CourseListRow.svelte'
  import { deluxeRequest } from '../../data/dispatcher'
  import { currentTerm, nextTerm } from '../../data/terms'

  let errors = ''
  let isLoading = true
  let teaching = []
  let attending = []

  onMount(async () => {
    const myresponse = await request(GET_MY_COURSES, { id: $auth.id })
    if (myresponse && myresponse.user) {
      teaching = myresponse.user.coursesTeaching.map(i => i.id)
      attending = myresponse.user.coursesAttending.map(i => i.id)
    }
    try {
      deluxeRequest({ query: GET_TERMS, parentKey: 'terms' })
    } catch (error) {
      errors = error
      notifications.add({ text: "Couldn't get terms from server", type: 'danger' })
    } finally {
      isLoading = false
    }
  })
</script>

<style>
  section.term {
    margin: 2rem 1rem;
  }
</style>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<h1 class="title">Dashboard</h1>

<Error {errors} />

{#if isLoading}
    <Loading what="Terms and courses" />
{:else}

  <section class="term">
    {#if !$currentTerm}
      <p>There is no term currently in session.</p>
      <CreateTerm/>
    {:else if $currentTerm.courses && $currentTerm.courses.length === 0}
      <h2 class="title is-5">There are no courses for {$currentTerm.name}.</h2>
      <AddCourse termId={currentTerm.id} />
      {:else}
      <h2 class="title is-5">{$currentTerm.courses.length} courses in {$currentTerm.name} </h2>
      {#each $currentTerm.courses as course (course)}
        <CourseListRow {course} {attending}/>
      {/each}
      <AddCourse termId={currentTerm.id} />
    {/if} <!-- currentTerm-->
  </section>

  <section class="term">
    {#if !$nextTerm}
      <p>There are also no upcoming terms recorded yet.</p>
    {:else if $nextTerm.courses.length === 0}
      <h2 class="title is-5">Upcoming term: {$nextTerm.name} also has no courses</h2>
      <AddCourse termId={$nextTerm.id} />
    {:else}
      <h2 class="title is-5">{$nextTerm.courses.length} courses in upcoming term: {$nextTerm.name} </h2>
      {#each $nextTerm.courses as course}
        <CourseListRow {course} {teaching}/>
      {/each}
      <AddCourse termId={$nextTerm.id} />
    {/if} <!-- !$nextTerm -->
  </section>

{/if} <!-- isLoading -->