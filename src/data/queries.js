import gql from 'graphql-tag'
import { CourseFields, SessionFields } from './fragments'

export const ME = gql`
{
  me {
    username
    id
  }
}`

export const GET_MY_SESSIONS = gql`
query GetMYSessions($id: ID!, $now: DateTime!){
  sessions( orderBy: startsAt_ASC, where: { AND: [ 
    { OR: [
      { course: { teachers_some: { id: $id } }},
      { course: { students_some: { id: $id } }}
    ]},
    { endsAt_gte: $now }
  ]}){
    ...SessionFields
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
