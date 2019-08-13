import Signup from './components/Signup.svelte'
import Dashboard from './components/dashboard/Dashboard.svelte'
import NotFound from './components/NotFound.svelte'
import AddStudentToCourse from './components/courses/AddStudentToCourse.svelte'
import Profile from './components/profile/Profile.svelte'
import Term from './components/terms/Term.svelte'
import Terms from './components/terms/Terms.svelte'
import Course from './components/courses/Course.svelte'
import Session from './components/sessions/Session.svelte'
import Courses from './components/courses/Courses.svelte'
import Question from './components/questions/Question.svelte'

export default {
  '/': Dashboard,
  '/signup': Signup,
  '/join-course': AddStudentToCourse,
  '/me': Profile,
  '/term/:id': Term,
  '/terms': Terms,
  '/course/:id': Course,
  '/courses': Courses,
  '/session/:id': Session,
  '/question/:id': Question,
  '*': NotFound
}
