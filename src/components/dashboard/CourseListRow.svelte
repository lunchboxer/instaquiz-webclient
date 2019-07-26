<script>
  import { teachers } from '../../data/teachers'
  import { courses } from '../../data/courses'
  import { auth } from '../../data/auth'
  import AddTeacherToCourse from '../courses/AddTeacherToCourse.svelte'
  import RemoveTeacherFromCourse from '../courses/RemoveTeacherFromCourse.svelte'

  export let course

  const isCourseTeacher = () => {
    if (!$teachers[$auth.id] || !$teachers[$auth.id].courses) return false
    return $teachers[$auth.id].courses.includes(course)
  }

  const getTeachers = (courseId) => {
    return $courses[courseId].teachers.map(teacherId => {
      const name = $teachers[teacherId].name
      return $auth.name === name ? 'You' : name
    })
  }

  console.log(getTeachers(course))
</script>

<style>
  li {
    margin: 1rem;
    display: flex;
    align-items: baseline;
  }

  em.whosinit {
    color: lightgrey;
    margin: 0.5rem;
  }
</style>

<li><strong>{$courses[course].name}</strong>
  {#if $auth.role === 'Teacher'}
    <em class="whosinit">
      {#if !$courses[course].teachers.length}
        No teacher
      {:else}
        Teachers: {getTeachers(course).join(', ')}
      {/if}
    </em>
    {#if !isCourseTeacher()}
      <AddTeacherToCourse user={$auth.id} {course} />
    {:else}
      <RemoveTeacherFromCourse user={$auth.id} {course} />
    {/if}
  {/if}
</li>