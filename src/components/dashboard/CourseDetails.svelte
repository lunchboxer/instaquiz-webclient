<script>
  import { query } from 'svelte-apollo'
  import { auth } from '../../data/auth'
  import { client } from '../../data/apollo'
  import AddTeacherToCourse from '../courses/AddTeacherToCourse.svelte'
  import RemoveTeacherFromCourse from '../courses/RemoveTeacherFromCourse.svelte'
  import DL from '../DL.svelte'
  import { COURSE_SESSIONS } from '../../data/queries'
  import Error from '../Error.svelte'

  export let course

  const sessions = query(client, {
    query: COURSE_SESSIONS,
    variables: { courseId: course.id }
  })
  $: isCourseTeacher = course.teachers.find(t => t.id === $auth.id)
  $: teacherNames = course.teachers.map(teacher => {
    return $auth.id === teacher.id ? 'You' : teacher.name
  })
  const now = new Date().toJSON()
  const past = (sessions) => sessions.filter(s => s.endsAt < now)
  const future = (sessions) => sessions.filter(s => s.endsAt > now)
</script>

<style>
  .item-header {
    padding: 0.5rem;
  }

  .buttons {
    margin-top: 0.5rem;
  }
</style>

<div class="item-header">

  <DL>
    <dt>Teacher(s):</dt>
    <dd>
      {teacherNames.length > 0 ? teacherNames.join(', ') : 'none'}
    </dd>
    <dt>Students:</dt>
    <dd>{course.students.length}</dd>
    {#await $sessions}
      <dt>Past Sessions:</dt>
      <dd>Loading...</dd>
      <dt>Current and Future sessions:</dt>
      <dd>Loading...</dd>
    {:then result}
      <dt>Past Sessions:</dt>
      <dd>{past(result.data.sessions).length}</dd>
      <dt>Current and Future sessions:</dt>
      <dd>{future(result.data.sessions).length}</dd>
    {:catch errors}
      <Error {errors}/>
    {/await}

  </DL>

  <div class="buttons">
    {#if $auth.role === 'Teacher'}
      {#if !isCourseTeacher}
        <AddTeacherToCourse user={$auth.id} {course} />
      {:else}
        <RemoveTeacherFromCourse user={$auth.id} {course} />
      {/if}
    {/if}
  </div>
  
</div>