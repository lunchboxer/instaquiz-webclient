<script>
  import { auth } from '../../data/auth'
  import AddCourse from '../courses/AddCourse.svelte'
  import CourseList from '../courses/CourseList.svelte'
  import CreateTerm from './CreateTerm.svelte'

  export let terms

  const now = new Date().toJSON()

  $: currentTerm = terms.find(t => t.startDate < now && t.endDate > now)
  $: nextTerm = terms.find(t => t.startDate > now)
</script>

<style>
  section.term {
    margin: 2rem 1rem;
  }
</style>

{#if !currentTerm}
  <p>There is no term currently in session.</p>
{:else}

  <section class="term">

    {#if currentTerm.courses}
      <h2 class="title is-4">{currentTerm.courses.length} courses in {currentTerm.name} </h2>
      <CourseList courses={currentTerm.courses} />
      {#if $auth.role === 'Teacher'}
        <AddCourse termId={currentTerm.id} />
      {/if}
    {/if} <!-- currentTerm.courses -->

  </section>

{/if} <!-- !currentTerm -->

{#if $auth.role === 'Teacher'}
  {#if !nextTerm}

    <p>There are also no upcoming terms recorded yet.</p>
    <CreateTerm/>

  {:else}

    <section class="term">
      {#if nextTerm.courses}
        <h2 class="title is-4">{nextTerm.courses.length} courses in upcoming term: {nextTerm.name}</h2>
        <CourseList courses={nextTerm.courses} />
        <AddCourse termId={nextTerm.id} />
      {/if} <!-- nextTerm.courses -->
    </section>

  {/if} <!-- !nextTerm -->
{/if} <!-- $auth.role === 'Teacher -->

{#if $auth.role === 'Student'}
  <a href="#/join-course" class="button">Join a course</a>
{/if}