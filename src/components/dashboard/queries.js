import gql from 'nanographql'

export const GET_MY_COURSES = gql`
query ($id: ID!){
  user(id: $id) {
    coursesAttending {
      id
      name
      term {
        id
        name
      }
    }
    coursesTeaching {
      id
      name
      term {
        id
        name
      }
    }
  }
}
`

export const CURRENT_COURSES = gql`
query CurrentCourses($now: DateTime!){
  courses(where: {term: {startDate_lte:$now, endDate_gte:$now}}) {
    id
    name
    students {
      name
    }
  }
}`

export const CURRENT_TERM_COURSES = gql`
query CurrentTermCourses($now: DateTime!){
  terms(where: {startDate_lte:$now, endDate_gte:$now}) {
    id
    name
    courses {
      id
      name
    }
  }
}`

export const FUTURE_TERM_COURSES = gql`
query FutureTermCourses($now: DateTime!){
  terms(where: {startDate_gte:$now}, orderBy: startDate_ASC) {
    id
    name
    courses {
      id
      name
    }
  }
}`
