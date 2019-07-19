import gql from 'nanographql'

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        name
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
      }
    }
  }
`
export const ADD_TO_COURSE = gql`
mutation ($id: ID!, $code: String!){
  addStudentToCourse(id: $id, code: $code ) {
    id
    name
    term {
      name
    }
  }
}`
