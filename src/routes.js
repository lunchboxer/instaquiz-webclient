import Signup from './components/Signup.svelte'
import Dashboard from './components/dashboard/Dashboard.svelte'
import NotFound from './components/NotFound.svelte'
import AddStudentToCourse from './components/courses/AddStudentToCourse.svelte'
import Profile from './components/profile/Profile.svelte'
import Test from './components/test/Test.svelte'

export default {
  '/': Dashboard,
  '/signup': Signup,
  '/join-course': AddStudentToCourse,
  '/me': Profile,
  '/test': Test,
  '*': NotFound
}
