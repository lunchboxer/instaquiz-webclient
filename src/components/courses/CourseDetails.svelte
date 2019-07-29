<script>
  import { auth } from '../../data/auth'
  import AddTeacherToCourse from './AddTeacherToCourse.svelte'
  import RemoveTeacherFromCourse from './RemoveTeacherFromCourse.svelte'
  import DeleteCourse from './DeleteCourse.svelte'
  import DL from '../DL.svelte'

  export let course
  export let terms

  $: isCourseTeacher = course.teachers.find(t => t.id === $auth.id)
  $: isEnrolled = course.students.find(t => t.id === $auth.id)
  $: teacherNames = course.teachers.map(teacher => {
    return $auth.id === teacher.id ? 'You' : teacher.name
  })
  const now = new Date().toJSON()
  $: past = course.sessions.filter(s => s.endsAt < now)
  $: future = course.sessions.filter(s => s.endsAt > now)
  $: term = terms.find(t => t.id === course.term.id)
</script>

<style>
  .registration {
    display: inline-flex;
    align-items: baseline;
    margin-bottom: 1rem;
  }

  .registration span {
    margin-right: 1rem;
  }

  .course-details {
    padding: 1rem;
  }

  .buttons {
    margin-top: 0.5rem;
  }
</style>

<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="#/Terms">Terms</a></li>
    <li><a href="#/Courses">Courses</a></li>
  </ul>
</nav>

<h1 class="title is-3">{course.name}</h1>
<p class="subtitle">{term.name}</p>

{#if $auth.role === 'Teacher'}
  <p class="registration">
    <span>You are{!isCourseTeacher ? "n't" : ''} a teacher for this class.</span>
  {#if !isCourseTeacher}
    <AddTeacherToCourse user={$auth.id} {course} />
  {:else}
    <RemoveTeacherFromCourse user={$auth.id} {course} />
  {/if}
  </p>
{:else}
  <p>You are{!isEnrolled ? "n't" : ''} enrolled in this class.</p>
{/if}


<div class="course-details">
  <DL>
    <dt>Teacher(s):</dt>
    <dd>
      {teacherNames.length > 0 ? teacherNames.join(', ') : 'none'}
    </dd>
    <dt>Students:</dt>
    <dd>{course.students.length}</dd>
    {#if course.sessions}
      <dt>Past Sessions:</dt>
      <dd>{course.sessions.length}</dd>
      <dt>Current and Future sessions:</dt>
      <dd>{course.sessions.length}</dd>
    {/if}

  </DL>

  <div class="buttons">
    {#if $auth.role === 'Teacher'}
        <!-- Can't be deleted if it has session connection -->
      {#if !course.sessions || course.sessions.length === 0}
        <DeleteCourse {course} />
      {/if}
   
    {/if}
  </div>
  
</div>