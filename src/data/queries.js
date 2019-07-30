import gql from 'graphql-tag'
import { CourseFields, SessionFields } from './fragments'

export const ME = gql`
{
  me {
    username
    name
    role
    id
    coursesTeaching {
      id
      name
    }
    coursesAttending {
      id
      name
    }
  }
}`

export const GET_MY_SESSIONS = gql`
query GetMYSessions($id: ID!, $now: DateTime!, $latest: DateTime!){
  sessions( orderBy: startsAt_ASC, where: { AND: [ 
    { OR: [
      { course: { teachers_some: { id: $id } }},
      { course: { students_some: { id: $id } }}
    ]},
    { endsAt_gte: $now, endsAt_lt: $latest }
  ]}){
    ...SessionFields
  }
}
${SessionFields}`

export const SESSION = gql`
query Session($id: ID!){
  session(id: $id){
    ...SessionFields
    prompts {
      id
      text
      answers{
        id
        text
      }
    }
  }
}
${SessionFields}`

export const TERMS_AND_ALL = gql`
{
  terms(orderBy: startDate_ASC) {
    id
    startDate
    endDate
    name
    courses {
      ...CourseFields
    }
  }
}
${CourseFields}`

export const TERMS = gql`
{
  terms(orderBy: startDate_ASC) {
    id
    name
  }
}`

export const COURSE_SESSIONS = gql`
  query CourseSessions($courseId: ID!){
    sessions(orderBy: startsAt_ASC, where : { course: {id: $courseId}}) {
      ...SessionFields
    }
  }
${SessionFields}`

export const COURSE = gql`
  query Course($id: ID!){
    course(id: $id){
      ...CourseFields
      sessions(orderBy: startsAt_DESC) {
        ...SessionFields
      }
    }
    terms {
      id
      name
    }
  }
  ${SessionFields}
  ${CourseFields}`

export const COURSES = gql`
query Courses {
  courses{
    id
    name
    term {
      name
      id
      startDate
    }
    teachers {
      id
      name
    }
    students {
      id
    }
  }
}`
