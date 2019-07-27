<script>
  import { students } from '../../data/students'
  import { teachers } from '../../data/teachers'
  import { auth } from '../../data/auth'
  import CourseListRow from './CourseListRow.svelte'

  export let courses = []

  const getNotTeaching = () => {
    if (!$teachers[$auth.id] ||
      !$teachers[$auth.id].courses ||
      $teachers[$auth.id].courses.length === 0) return courses
    return courses.filter(course => !$teachers[$auth.id].courses.includes(course))
  }
  const getTeaching = () => {
    if (!$teachers[$auth.id] ||
      !$teachers[$auth.id].courses ||
      $teachers[$auth.id].courses.length === 0) return []
    return courses.filter(course => $teachers[$auth.id].courses.includes(course))
  }

  const getNotAttending = () => {
    if (!$students[$auth.id] ||
      !$students[$auth.id].courses ||
      $students[$auth.id].courses.length === 0) return courses
    return courses.filter(course => !$students[$auth.id].courses.includes(course))
  }
  const getAttending = () => {
    if (!$students[$auth.id] ||
      !$students[$auth.id].courses ||
      $students[$auth.id].courses.length === 0) return []
    return courses.filter(course => $students[$auth.id].courses.includes(course))
  }

  $: notTeaching = getNotTeaching(courses, $teachers)
  $: teaching = getTeaching(courses, $teachers)
  $: notAttending = getNotAttending(courses, $teachers)
  $: attending = getAttending(courses, $teachers)
</script>

{#if courses.length > 0}

  {#if teaching && teaching.length}
    <h2 class="title is-5">Teaching</h2>
    {#each teaching as course (course)}
      <CourseListRow {course} />
    {/each}
  {/if}

  {#if attending && attending.length}
    <h2 class="title is-5">Attending</h2>
    {#each attending as course (course)}
      <CourseListRow {course} />
    {/each}
  {/if}

  {#if $auth.role === 'Teacher' && notTeaching.length > 0}
    <h2 class="title is-5">Not teaching</h2>
    {#each notTeaching as course (course)}
      <CourseListRow {course} />
    {/each}
  {/if}

  {#if $auth.role === 'Student' && notAttending.length > 0}
    <h2 class="title is-5">Not attending</h2>
    {#each notAttending as course (course)}
      <CourseListRow {course} />
    {/each}
  {/if}
{/if}