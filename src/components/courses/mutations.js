import gql from 'nanographql'

export const CREATE_COURSE = gql`
mutation CreateCourse($name: String!, $code: String!, $termId: ID!) {
  createCourse(name:$name, code: $code, termId: $termId){ 
    id
    name
  }
}`
