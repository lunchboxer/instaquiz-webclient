<script>
  import { push } from 'svelte-spa-router'
  import { mutate } from 'svelte-apollo'
  import { notifications } from '../notifications'
  import { auth } from '../../data/auth'
  import { ADD_STUDENT_TO_COURSE } from '../../data/mutations'
  import { client } from '../../data/apollo'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'

  let code = ''
  let form
  let submit
  let loading = false
  let errors = ''

  const join = async () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    loading = true
    submit.disabled = true
    try {
      const response = await mutate(client, {
        mutation: ADD_STUDENT_TO_COURSE,
        variables: { id: $auth.id, code }
      })
      errors = ''
      notifications.add({ text: `Student ${$auth.name} added to ${response.data.addStudentToCourse.name}`, type: 'success' })
      push('/')
    } catch (error) {
      errors = error
      notifications.add({ text: 'registration failed.', type: 'danger' })
    } finally {
      loading = false
      submit.disabled = false
    }
  }
</script>

<style>
  .container-centered {
    margin-top: 10vh;
    display: flex;
    justify-content: center;
  }
</style>

<div class="container-centered">
  <div class="join-course">

    <h1 class="title">Join a course</h1>

    <p>
      Simply enter the code word given by your instructor and you'll be added to
      the course roster.
    </p>

    <br />

    <Error {errors} />
    <form bind:this="{form}" novalidate on:submit|preventDefault="{join}">
      <Input label="Code word" bind:value="{code}" required />

      <button type="submit" class="button is-primary" class:is-loading="{loading}" bind:this="{submit}">
        Join!
      </button>
    </form>
  </div>
</div>