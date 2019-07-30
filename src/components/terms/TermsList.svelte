<script>
  import { auth } from '../../data/auth'
  import AddCourse from '../courses/AddCourse.svelte'
  import CategorizedCourseList from '../courses/CategorizedCourseList.svelte'

  export let terms

  const now = new Date().toJSON()

  $: currentTerm = terms && terms.find(t => t.startDate < now && t.endDate > now)
</script>

<style>
  section.term {
    margin: 2rem 1rem;
  }
</style>

{#each terms as term (term.id)}
  <section class="term">
      <h2 class="title is-4">{term.name}</h2>
      {#if term.courses && term.courses.length > 0}
        <CategorizedCourseList courses={term.courses} />
      {/if}
      {#if $auth.role === 'Teacher'}
        <AddCourse termId={term.id} />
      {/if}
  </section>
{/each}