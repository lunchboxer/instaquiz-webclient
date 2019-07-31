<script>
  import { NotificationList } from './components/notifications'
  import { auth } from './data/auth'
  import { Router, Route } from 'svelte-routing'
  import Login from './components/Login.svelte'
  import Navbar from './components/Navbar.svelte'
  import UpcomingSessions from './components/sessions/UpcomingSessions.svelte'
  import Signup from './components/Signup.svelte'
  import Dashboard from './components/dashboard/Dashboard.svelte'
  import NotFound from './components/NotFound.svelte'
  import AddStudentToCourse from './components/courses/AddStudentToCourse.svelte'
  import Profile from './components/profile/Profile.svelte'
  import Terms from './components/terms/Terms.svelte'
  import Term from './components/terms/Term.svelte'
  import Courses from './components/courses/Courses.svelte'
  import Course from './components/courses/Course.svelte'
  import Session from './components/sessions/Session.svelte'
  import Question from './components/questions/Question.svelte'

  export let url = ''
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

  {#if $auth.username}
    <UpcomingSessions />
  {/if}

  {#if $auth.username || url === '/signup'}
 
    <Router {url}>
      <Route path="/join-course" component={AddStudentToCourse} />
      <Route path="/signup" component={Signup} />
      <Route path="/course/:id" component={Course} />
      <Route path="/courses" component={Courses}/>
      <Route path="/session/:id" component={Session} />
      <Route path="/question/:id" component={Question} />
      <Route path="/terms" component={Terms} />
      <Route path="/term/:id" component={Term} />
      <Route path="/me" component={Profile}/>
      <Route path="/" component={Dashboard}/>
      <Route path="*"><NotFound /></Route>
    </Router>
  {:else}
    <Login/>
  {/if}
        
</main>
  
<NotificationList/>