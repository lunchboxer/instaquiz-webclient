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
  import UpcomingSessions from './UpcomingSessions.svelte'

  let errors = ''
  let isLoading = true

  onMount(async () => {
    try {
      await deluxeRequest({ query: GET_TERMS, parentKey: 'terms' })
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

<h1 class="title is-3">Dashboard</h1>

<UpcomingSessions />
<Error {errors} />

{#if isLoading}
    <Loading what="Terms and courses" />
{:else}
 
  {#if !$currentTerm}
    <p>There is no term currently in session.</p>
  {:else}
    <section class="term">
      {#if $currentTerm.courses}
        <h2 class="title is-4">{$currentTerm.courses.length} courses in {$currentTerm.name} </h2>
        <CourseList courses={$currentTerm.courses} />
        {#if $auth.role === 'Teacher'}
          <AddCourse termId={$currentTerm.id} />
        {/if}
      {/if} <!-- $currentTerm.courses-->
    </section>
  {/if} <!-- !$currentTerm-->

  {#if $auth.role === 'Teacher'}
    {#if !$nextTerm}
      <p>There are also no upcoming terms recorded yet.</p>
      <CreateTerm/>
    {:else}
      <section class="term">
        {#if $nextTerm.courses}
          <h2 class="title is-4">{$nextTerm.courses.length} courses in upcoming term: {$nextTerm.name}</h2>
          <CourseList courses={$nextTerm.courses} />
          <AddCourse termId={$nextTerm.id} />
        {/if} <!-- $nextTerm.courses-->
      </section>
    {/if} <!-- !$nextTerm -->
  {/if} <!-- $auth.role === 'Teacher -->

  {#if $auth.role === 'Student'}
    <a href="#/join-course" class="button">Join a course</a>
  {/if}

{/if} <!-- isLoading -->