import gql from 'nanographql'

export const GET_MY_COURSES = gql`
query ($id: ID!){
  user(id: $id) {
    coursesTeaching {
      name
      term {
        id
        name
      }
    }
  }
}
`
