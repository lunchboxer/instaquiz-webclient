import gql from 'nanographql'

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        name
        role
      }
    }
  }
`

export const SIGNUP = gql`
  mutation Signup($username: String!, $name: String!, $password: String!) {
    signup(username: $username, name: $name, password: $password) {
      token
      user {
        id
        username
        name
        role
      }
    }
  }
`
export const ADD_STUDENT_TO_COURSE = gql`
mutation ($id: ID!, $code: String!){
  addStudentToCourse(id: $id, code: $code ) {
    id
    name
    students {
      id
    }
  }
}`

export const ADD_TEACHER_TO_COURSE = gql`
mutation ($id: ID!, $courseId: ID!){
  addTeacherToCourse(id: $id, courseId: $courseId ) {
    id
    name
    teachers {
      id
    }
  }
}`

export const REMOVE_TEACHER_FROM_COURSE = gql`
mutation ($id: ID!, $courseId: ID!){
  removeTeacherFromCourse(id: $id, courseId: $courseId ) {
    id
    name
    teachers {
      id
    }
  }
}`
