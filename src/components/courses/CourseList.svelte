<script>
  import AddCourse from './AddCourse.svelte'
  import { link } from 'svelte-routing'

  export let courses = []

  $: sortedCourses = [...courses].sort((a, b) => {
    if (a.term === b.term) return a.name.localeCompare(b.name)
    return a.term.startDate.localeCompare(b.term.startDate)
  })
</script>

<AddCourse />

{#each sortedCourses as course (courses.id)}
  <li><a href="/course/{course.id}" use:link>{course.name}</a> {course.term.name}</li>
{/each}