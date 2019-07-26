<script>
  import { onMount } from 'svelte'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import { auth } from '../../data/auth'
  import Loading from '../Loading.svelte'
  import { GET_TERMS } from './queries'
  import AddCourse from '../courses/AddCourse.svelte'
  import CreateTerm from '../terms/CreateTerm.svelte'
  import CourseList from './CourseList.svelte'
  import { deluxeRequest } from '../../data/dispatcher'
  import { currentTerm, nextTerm } from '../../data/terms'

  let errors = ''
  let isLoading = true

  onMount(async () => {
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
    {:else if $currentTerm.courses}
      <h2 class="title is-5">{$currentTerm.courses.length} courses in {$currentTerm.name} </h2>
      <CourseList courses={$currentTerm.courses} />
      <AddCourse termId={$currentTerm.id} />
    {/if} <!-- !$currentTerm-->
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
        <!-- <CourseListRow {course} /> -->
      {/each}
      <AddCourse termId={$nextTerm.id} />
    {/if} <!-- !$nextTerm -->
  </section>

  {#if $auth.role === 'Student'}
    <a href="#/join-course" class="button">Join a course</a>
  {/if}

{/if} <!-- isLoading -->