<script>
  import { auth } from '../data/auth'
  import { notifications } from './notifications'
  import Input from './Input.svelte'
  import Error from './Error.svelte'
  import { push } from 'svelte-spa-router'

  let username = ''
  let name = ''
  let password = ''
  let confirmpass = ''
  let errors = ''
  let loading = false
  let submit
  let form

  const signup = async () => {
    let isValid = form.checkValidity()
    if (password !== confirmpass) {
      errors = 'Passwords do not match.'
      isValid = false
    }
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
      await auth.signup(username, name, password)
      errors = ''
      notifications.add({ text: `Created account for '${username}'`, type: 'success' })
      push('/join-course')
    } catch (error) {
      errors = error
      notifications.add({ text: 'registration failed.', type: 'danger' })
      submit.disabled = false
    } finally {
      loading = false
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

<svelte:head>
  <title>Signup</title>
</svelte:head>

<div class="container-centered">
  <div class="login">
    <h1 class="title">Create an acount</h1>

    <Error {errors} />
    <form bind:this={form} novalidate on:submit|preventDefault={signup}>
      <Input type="text" bind:value={username} label="Student ID" required leftIcon="id-card" />

      <Input type="text" bind:value={name} label="Name" required leftIcon="user" />

      <Input type="password" bind:value={password} label="Password" required leftIcon="key" />
      <Input type="password" label="Confirm password" bind:value={confirmpass} leftIcon="check" />
      <div class="field">
        <div class="control">
          <button type="submit" class="button is-primary" class:is-loading={loading} bind:this={submit}>
            Register
          </button>
          <p>or</p>
          <a href="#/login" class="button">Log in with existing account</a>
        </div>
      </div>
    </form>
  </div>
</div>