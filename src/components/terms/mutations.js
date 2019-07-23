import gql from 'nanographql'

export const CREATE_TERM = gql`
  mutation CreateTerm($startDate: DateTime!, $endDate: DateTime!, $name: String!) {
    createTerm(startDate: $startDate, endDate: $endDate, name: $name) {
      id
      startDate
      endDate
      name
      courses {
        id
        name
      }
    }
  }
`

export const DELETE_TERM = gql`
mutation DeleteTerm($id: ID!) {
  deleteTerm(id: $id) {
    id
    name
  }
}
`

export const UPDATE_TERM = gql`
  mutation updateTerm($id: ID!, $name: String!, $startDate: DateTime!, $endDate: DateTime!) {
  updateSemester(id: $id, name: $name, startDate: $startDate, endDate: $endDate) {
    name
      id
      startDate
      endDate
      name
      courses {
        id
        name
      }
  }
}
`
