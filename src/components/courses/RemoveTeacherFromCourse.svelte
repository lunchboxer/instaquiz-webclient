<script>
  import { mutate } from 'svelte-apollo'
  import { notifications } from '../notifications'
  import { client } from '../../data/apollo'
  import Error from '../Error.svelte'
  import { REMOVE_TEACHER_FROM_COURSE } from '../../data/mutations'

  export let user
  export let course

  let loading = false
  let errors = ''

  const leaveCourse = async () => {
    loading = true
    try {
      const response = await mutate(client, {
        mutation: REMOVE_TEACHER_FROM_COURSE,
        variables: { id: user, courseId: course.id }
      })
      errors = ''
      notifications.add({ text: `Successfully added teacher to ${response.data.removeTeacherFromCourse.name}`, type: 'success' })
    } catch (error) {
      errors = error
      notifications.add({ text: 'Failed to add teacher to course', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<button class="button" class:is-loading={loading} on:click={leaveCourse}>Leave</button>
<Error {errors} />