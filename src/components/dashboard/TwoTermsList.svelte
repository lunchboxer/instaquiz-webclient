<script>
  import { auth } from '../../data/auth'
  import AddCourse from '../courses/AddCourse.svelte'
  import CourseList from '../courses/CourseList.svelte'
  import CreateTerm from '../terms/CreateTerm.svelte'

  export let terms

  const now = new Date().toJSON()

  $: currentTerm = terms && terms.find(t => t.startDate < now && t.endDate > now)
  $: nextTerm = terms && terms.find(t => t.startDate > now)
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
      <h2 class="title is-4">Current term: {currentTerm.name} </h2>
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
        <h2 class="title is-4">Next term: {nextTerm.name}</h2>
        <CourseList courses={nextTerm.courses} />
        <AddCourse termId={nextTerm.id} />
      {/if} <!-- nextTerm.courses -->
    </section>

  {/if} <!-- !nextTerm -->
{/if} <!-- $auth.role === 'Teacher -->

{#if $auth.role === 'Student'}
  <a href="#/join-course" class="button">Join a course</a>
{/if}