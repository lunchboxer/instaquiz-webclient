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
    }
  }
}`
