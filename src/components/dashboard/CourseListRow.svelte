<script>
  import { teachers } from '../../data/dispatcher'
  import { courses } from '../../data/courses'
  import { auth } from '../../data/auth'

  export let course
  export let teaching = []
  export let attending = []

  const isCourseTeacher = (courseId) => {
    const found = teaching.find(course => {
      return course === courseId
    })
    return !!found
  }

  const isCourseStudent = (courseId) => {
    const found = attending.find(course => {
      return course === courseId
    })
    return !!found
  }

  const getTeachers = (courseId) => {
    $courses[courseId].teachers.map(teacherId => {
      return $teachers[teacherId]
    })
  }
</script>

<style>
  em.whosinit {
    color: lightgrey;
  }
</style>

<li><strong>{$courses[course].name}</strong>
  <em class="whosinit">
    {#if $auth.role === 'Teacher'}
    {#if isCourseTeacher(course)}
      You're teaching
    {:else if !$courses[course].teachers.length}
    No teacher
    {:else}
    {getTeachers(course).join(', ')} teaching
    {/if}
  {:else if isCourseStudent(course)}
    Enrolled
  {/if}
  </em>
</li>