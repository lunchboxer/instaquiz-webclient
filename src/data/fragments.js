import gql from 'graphql-tag'

export const CourseFields = gql`
  fragment CourseFields on Course {
    id
    name
    term {
      id
      name
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

export const QuestionFields = gql`
  fragment QuestionFields on Question {
    id
    text
    order
    answers {
      id
      text
    }
    session {
      id
    }
  }`
