<script>
  import { notifications } from '../notifications'
  import { request } from '../../data/fetch-client'
  import { teachers } from '../../data/teachers'
  import { courses } from '../../data/courses'
  import Error from '../Error.svelte'
  import { REMOVE_TEACHER_FROM_COURSE } from '../../data/mutations'

  export let user
  export let course

  let loading = false
  let errors = ''

  const leaveCourse = async () => {
    loading = true
    try {
      const response = await request(REMOVE_TEACHER_FROM_COURSE, {
        id: user,
        courseId: course
      })
      courses.update(previous => {
        previous[course].teachers = response.removeTeacherFromCourse.teachers
        return previous
      })
      teachers.update(previous => {
        previous[user].courses = previous[user].courses.filter(c => c !== course)
        return previous
      })

      errors = ''
      notifications.add({ text: `Successfully removed teacher from ${response.removeTeacherFromCourse.name}`, type: 'success' })
    } catch (error) {
      errors = error
      console.error(error)
      notifications.add({ text: 'Failed to remove teacher from course', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>
<style>
  button {
    margin: 0.5rem;
  }
</style>

<button class="button" class:is-loading={loading} on:click={leaveCourse}>leave</button>
<Error {errors} />