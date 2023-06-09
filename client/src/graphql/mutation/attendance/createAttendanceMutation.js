import gql from 'graphql-tag';

export const CREATE_ATTENDANCE_MUTATION = gql`
  mutation createAttendance(
    $courseID: ID!
    $date: String!
    $time: String!
    $videoData: String
    $attendees: [ID!]
    $absentees: [ID!]
    $participants: [ID!]
  ) {
    createAttendance(
      attendanceInput: {
        courseID: $courseID
        date: $date
        time: $time
        videoData: $videoData
        attendees: $attendees
        absentees: $absentees
        participants: $participants
      }
    ) {
      _id
      course {
        _id
        shortID
        name
        code
        session
      }
      date
      time
      attendees {
        info {
          _id
          firstName
          lastName
          cardID
        }
      }
      absentees {
        info {
          _id
          firstName
          lastName
          cardID
        }
      }
      participants {
        info {
          _id
          firstName
          lastName
          cardID
        }
      }
    }
  }
`;
