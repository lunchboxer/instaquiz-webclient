import gql from 'nanographql'

export const GET_TERMS = gql`
{
  terms(orderBy: startDate_ASC) {
    id
    startDate
    endDate
    name
    courses {
      id
      name
      teachers {
        id
        name
      }
      students {
        id
        username
        name
      }
    }
  }
}`

export const GET_MY_COURSES = gql`
query ($id: ID!){
  user(id: $id) {
    coursesAttending {
      id
    }
    coursesTeaching {
      id
    }
  }
}
`
