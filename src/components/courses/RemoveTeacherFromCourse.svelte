<script>
  import { notifications } from '../notifications'
  // import { request } from '../../data/fetch-client'
  import Error from '../Error.svelte'
  import { REMOVE_TEACHER_FROM_COURSE } from '../../data/mutations'

  export let user
  export let course

  const loading = false
  const errors = ''

  const leaveCourse = () => {

  }
</script>
<style>
  button {
    margin: 0.5rem;
  }
</style>

<button class="button" class:is-loading={loading} on:click={leaveCourse}>leave</button>
<Error {errors} />