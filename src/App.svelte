<script>
  import { NotificationList } from './components/notifications'
  import { auth } from './data/auth'
  import Router from './components/Router.svelte'
  import Login from './components/Login.svelte'
  import Navbar from './components/Navbar.svelte'

  let active = '/'
  let uri = location.pathname

</script>

<style>
  main {
    height: calc(100% - 5rem);
    padding: 1rem;
    margin: 0;
  }
</style>

<Navbar {active} />

<main>

  {#if $auth.username || uri === "/signup"}
    <Router bind:active bind:uri/>
  {:else}
    <Login/>
  {/if}
        
  </main>
  
  <NotificationList/>