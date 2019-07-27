import gql from 'nanographql'

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
    id
    startsAt
    endsAt
    course {
      id
    }
  }
}`
