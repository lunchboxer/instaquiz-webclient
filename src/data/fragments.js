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
    }
    students {
      id
    }
  }`
