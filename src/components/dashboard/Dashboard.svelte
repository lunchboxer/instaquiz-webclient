<script context="module">
  import { TERMS_AND_ALL } from '../../data/queries'
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'

  export const terms = query(client, { query: TERMS_AND_ALL })
</script>
<script>
  import { auth } from '../../data/auth'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import AddCourse from '../courses/AddCourse.svelte'
  import CourseList from './CourseList.svelte'
  import CreateTerm from '../terms/CreateTerm.svelte'
  import UpcomingSessions from './UpcomingSessions.svelte'

  const now = new Date().toJSON()

  const getCurrent = (terms) => terms.find(term => {
    return term.startDate < now && term.endDate > now
  })

  const getNext = (terms) => terms.find(t => t.startDate > now)
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

{#await $terms}
  <Loading what="terms and courses" />
{:then result}
  {#if result && result.data && result.data.terms}
  {#if !getCurrent(result.data.terms)}

    <p>There is no term currently in session.</p>

  {:else}

    <section class="term">

      {#if getCurrent(result.data.terms).courses}
        <h2 class="title is-4">{getCurrent(result.data.terms).courses.length} courses in {getCurrent(result.data.terms).name} </h2>
        <CourseList courses={getCurrent(result.data.terms).courses} />
        {#if $auth.role === 'Teacher'}
          <AddCourse termId={getCurrent(result.data.terms).id} />
        {/if}
      {/if} <!-- getCurrent(result.data.terms).courses -->

    </section>

  {/if} <!-- getCurrent(result.data.terms) -->
  
    {#if $auth.role === 'Teacher'}
      {#if !getNext(result.data.terms)}
  
        <p>There are also no upcoming terms recorded yet.</p>
        <CreateTerm/>
  
      {:else}
  
        <section class="term">
          {#if getNext(result.data.terms).courses}
            <h2 class="title is-4">{getNext(result.data.terms).courses.length} courses in upcoming term: {getNext(result.data.terms).name}</h2>
            <CourseList courses={getNext(result.data.terms).courses} />
            <AddCourse termId={getNext(result.data.terms).id} />
          {/if} <!-- getNext(result.data.terms).courses -->
        </section>
  
      {/if} <!-- !getNext(result.data.terms) -->
    {/if} <!-- $auth.role === 'Teacher -->
  
    {#if $auth.role === 'Student'}
      <a href="#/join-course" class="button">Join a course</a>
    {/if}
  {/if}
  {:catch errors}
    <Error {errors} />
  {/await}
    