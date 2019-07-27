<script>
  import { onMount } from 'svelte'
  import { courses } from '../../data/courses'
  import { sessions } from '../../data/sessions'
  import { auth } from '../../data/auth'
  import { teachers } from '../../data/teachers'
  import { request } from '../../data/fetch-client'
  import { normalize } from '../../data/normalizer'
  import { COURSE_SESSIONS } from './queries'
  import AddTeacherToCourse from '../courses/AddTeacherToCourse.svelte'
  import RemoveTeacherFromCourse from '../courses/RemoveTeacherFromCourse.svelte'
  import DL from '../DL.svelte'
  import AddCourseSession from '../courses/AddCourseSession.svelte'

  export let course = {}
  let pastSessions = []
  let futureSessions = []

  onMount(async () => {
    // load all the course sessions
    const response = await request(COURSE_SESSIONS, { courseId: course })
    if (response && response.sessions && response.sessions.length > 0) {
      const now = new Date().toJSON()
      response.sessions.forEach(session => {
        if (session.endsAt < now) pastSessions.push(session.id)
        else futureSessions.push(session.id)
      })
      // trigger updates, since push won't
      pastSessions = pastSessions
      futureSessions = futureSessions
      const normalized = normalize(response.sessions, 'sessions')
      sessions.merge(normalized.entities.sessions)
      courses.merge(normalized.entities.course)
    }
  })

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
  $: console.log($teachers)
  $: console.log($courses)
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
      {$courses[course] && !$courses[course].teachers.length > 0 ? 'none' : getTeachers(course).join(', ')}
    </dd>
    <dt>Students:</dt>
    <dd>{$courses[course].students.length}</dd>
    <dt>Past sessions:</dt>
    <dd>{pastSessions.length}</dd>
    <dt>Current or Upcoming sessions:</dt>
    <dd>{futureSessions.length}</dd>
  </DL>

  <div class="buttons">
    {#if $auth.role === 'Teacher'}
      {#if !isCourseTeacher()}
        <AddTeacherToCourse user={$auth.id} {course} />
      {:else}
        <RemoveTeacherFromCourse user={$auth.id} {course} />
        <AddCourseSession {course}/>
      {/if}
    {/if}
  </div>

</div>