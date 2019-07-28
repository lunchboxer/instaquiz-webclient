import gql from 'graphql-tag'
import { CourseFields } from './fragments'

// Auth

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

// Courses

export const CREATE_COURSE = gql`
mutation CreateCourse($name: String!, $code: String!, $termId: ID!) {
  createCourse(name:$name, code: $code, termId: $termId){ 
    ...CourseFields
  }
}
${CourseFields}`

export const ADD_STUDENT_TO_COURSE = gql`
mutation ($id: ID!, $code: String!){
  addStudentToCourse(id: $id, code: $code ) {
    ...CourseFields
  }
}
${CourseFields}`

export const ADD_TEACHER_TO_COURSE = gql`
mutation ($id: ID!, $courseId: ID!){
  addTeacherToCourse(id: $id, courseId: $courseId ) {
    ...CourseFields
  }
}
${CourseFields}`

export const REMOVE_TEACHER_FROM_COURSE = gql`
mutation ($id: ID!, $courseId: ID!){
  removeTeacherFromCourse(id: $id, courseId: $courseId ) {
    ...CourseFields
  }
}
${CourseFields}`

// Terms

export const CREATE_TERM = gql`
  mutation CreateTerm($startDate: DateTime!, $endDate: DateTime!, $name: String!) {
    createTerm(startDate: $startDate, endDate: $endDate, name: $name) {
      id
      startDate
      endDate
      name
      courses {
        id
      }
    }
  }
`
