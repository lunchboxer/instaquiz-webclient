<script>
  import { notifications } from '../notifications'
  import { ADD_TEACHER_TO_COURSE } from '../../data/mutations'
  import { deluxeRequest } from '../../data/dispatcher'
  import Error from '../Error.svelte'

  export let user
  export let course
  let errors = ''
  let loading = false

  const joinCourse = async () => {
    loading = true
    try {
      const response = await deluxeRequest({
        query: ADD_TEACHER_TO_COURSE,
        variables: {
          id: user,
          courseId: course
        },
        parentKey: 'courses'
      })
      errors = ''
      notifications.add({ text: `Successfully added teacher to ${response.addTeacherToCourse.name}`, type: 'success' })
    } catch (error) {
      errors = error
      notifications.add({ text: 'Failed to add teacher to course', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<style>
  button {
    margin: 0.5rem;
  }

  button i {
    margin-right: 0.5rem;
  }
</style>

<button class="button" class:is-loading={loading} on:click={joinCourse}><i class="fas fa-user-plus"></i>join</button>
<Error {errors} />