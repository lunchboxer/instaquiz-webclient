import gql from 'graphql-tag'

export const CourseFields = gql`
  fragment CourseFields on Course {
    id
    name
    term {
      id
    }
    teachers {
      id
      name
    }
    students {
      id
    }
  }`

export const SessionFields = gql`
  fragment SessionFields on Session {
    id
    startsAt
    endsAt
    order
    course {
      name
      id
    }
  }`
