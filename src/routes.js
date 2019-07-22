import Signup from './components/Signup.svelte'
import Dashboard from './components/dashboard/Dashboard.svelte'
import NotFound from './components/NotFound.svelte'

export default {
  '/': Dashboard,
  '/signup': Signup,
  '*': NotFound
}
