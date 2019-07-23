<script>
  import { onMount } from 'svelte'
  import { notifications } from '../notifications'
  import { auth } from '../../data/auth'
  import { request } from '../../data/fetch-client'
  import { GET_MY_COURSES } from './queries'
  import { terms } from '../terms/data'
  import CreateTerm from '../terms/CreateTerm.svelte'
  import Loading from '../Loading.svelte'
  import AddCourse from '../courses/AddCourse.svelte'

  let teaching = []
  let attending = []
  let isLoading = true

  onMount(async () => {
    const myresponse = await request(GET_MY_COURSES, { id: $auth.id })
    if (myresponse && myresponse.user) {
      teaching = myresponse.user.coursesTeaching
      attending = myresponse.user.coursesAttending
    }

    try {
      await terms.get()
    } catch (error) {
      notifications.add({ text: "Couldn't get terms from server", type: 'danger' })
    } finally {
      isLoading = false
    }
  })

  const findCurrentTerm = terms => {
    if (!terms) return
    return terms.find(term => {
      return (term.startDate < (new Date()).toJSON() && term.endDate > (new Date()).toJSON())
    })
  }

  const filterFutureTerms = terms => {
    if (!terms) return
    const date = new Date()
    return terms.filter(term => {
      return term.startDate > date.toISOString()
    })
  }

  $: currentTerm = findCurrentTerm($terms)
  $: futureTerms = filterFutureTerms($terms) || []

  $: console.log($terms)
  $: console.log('currentTerm', currentTerm)

  const isCourseTeacher = (courseId) => {
    const found = teaching.find(course => {
      return course.id === courseId
    })
    return !!found
  }
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<h1 class="title">Dashboard</h1>

{#if isLoading}
  <Loading what="Terms and courses" />
{:else}
  {#if !currentTerm}
    <p>There is no term currently in session.</p>
        <CreateTerm />
      <br>
    {#if !futureTerms || futureTerms.length === 0}
      <p>There are also no upcoming terms recorded yet.</p>
    {:else if futureTerms[0].courses.length === 0}
      <h2 class="title is-5">Upcoming term: {futureTerms[0].name} also has no courses</h2>
      <AddCourse termId={currentTerm.id} />
    {:else}
      <h2 class="title is-5">{futureTerms[0].courses.length} courses in upcoming term: {futureTerms[0].name} </h2>
      {#each futureTerms[0].courses as course}
        <li>{course.name} {isCourseTeacher(course.id) ? 'teaching' : 'not teaching'}</li>
      {/each}
    {/if} <!-- futureTerms -->
  {:else if currentTerm.courses && currentTerm.courses.length === 0}
    <h2 class="title is-5">There are no courses for {currentTerm.name}.</h2>
    <AddCourse termId={currentTerm.id} />
  {:else}
    <h2 class="title is-5">{currentTerm.courses.length} courses in {currentTerm.name} </h2>
    {#if $auth.role === 'Teacher'}
      {#if teaching.length}
        <h2 class="title is-5">Teaching {teaching.length} courses</h2>
      {:else}
        <h2>Not registered as a teacher for any courses.</h2>
      {/if} <!-- teaching.length-->
    {/if} <!-- $auth.role === 'Teacher' -->
    {#if attending.length}
      <h2 class="title is-5">Enrolled in {attending.length} courses</h2>
    {/if}
  {/if} <!-- !currentTerm -->
{/if} <!-- isLoading -->