<script>
  import { NotificationList } from './components/notifications'
  import { auth } from './data/auth'
  import Router, { location } from 'svelte-spa-router'
  import routes from './routes'
  import Login from './components/Login.svelte'
  import Navbar from './components/Navbar.svelte'
  import { nowSession } from './components/dashboard/stores'
  import UpcomingSessions from './components/dashboard/UpcomingSessions.svelte'
</script>

<style>
  main {
    height: calc(100% - 5rem);
    padding: 1rem;
    margin: 0;
  }
</style>

<Navbar />


<main>

  {#if $auth.username && !$nowSession}
    <UpcomingSessions />
  {/if}

  {#if $auth.username || $location === '/signup'}
    <Router {routes}/>
  {:else}
    <Login/>
  {/if}
        
</main>
  
<NotificationList/>