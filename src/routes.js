import Signup from './components/Signup.svelte'
import Dashboard from './components/dashboard/Dashboard.svelte'
import NotFound from './components/NotFound.svelte'
import AddToCourse from './components/AddToCourse.svelte'
import Profile from './components/profile/Profile.svelte'

export default {
  '/': Dashboard,
  '/signup': Signup,
  '/join-course': AddToCourse,
  '/me': Profile,
  '*': NotFound
}
