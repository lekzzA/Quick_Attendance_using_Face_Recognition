import { FETCH_COURSE_QUERY } from './course/courseQuery';
import {
  FETCH_CREATEDCOURSES_COUNT_QUERY,
  FETCH_ALL_CREATEDCOURSES_QUERY,
  FETCH_CREATEDCOURSES_QUERY,
} from './course/createdCoursesQuery';
import {
  FETCH_ENROLLEDCOURSES_COUNT_QUERY,
  FETCH_ENROLLEDCOURSES_QUERY,
} from './course/enrolledCoursesQuery';
import {
  FETCH_ENROLPENDING_COUNT_QUERY,
  FETCH_ENROLPENDING_QUERY,
} from './enrolment/enrolPendingQuery';
import {
  FETCH_ENROLREQUEST_COUNT_QUERY,
  FETCH_ENROLREQUEST_QUERY,
} from './enrolment/enrolRequestQuery';
import {
  FETCH_FACE_PHOTOS_COUNT_QUERY,
  FETCH_FACE_PHOTOS_QUERY,
  FETCH_FACE_MATCHER_IN_COURSE_QUERY,
} from './facePhoto/facePhotosQuery';

import {
  FETCH_NOTIFICATIONS_QUERY,
  FETCH_UNCHECKED_NOTIFICATIONS_QUERY,
} from './notification/notificationsQuery';
import { GET_WARNING_COUNT_QUERY } from './warning/getWarningCountQuery';
import { FETCH_PHOTO_PRIVACY_QUERY } from './facePhoto/photoPrivacyQuery';

import {
  FETCH_ATTENDANCES_COUNT_QUERY,
  FETCH_ATTENDANCES_COUNT_IN_COURSE_QUERY,
  FETCH_ATTENDANCE_QUERY,
  FETCH_ATTENDANCES_QUERY,
  FETCH_ATTENDANCES_IN_COURSE_QUERY,
} from './attendance/attendanceQuery';

export { FETCH_COURSE_QUERY };
export {
  FETCH_CREATEDCOURSES_COUNT_QUERY,
  FETCH_ALL_CREATEDCOURSES_QUERY,
  FETCH_CREATEDCOURSES_QUERY,
};
export { FETCH_ENROLLEDCOURSES_COUNT_QUERY, FETCH_ENROLLEDCOURSES_QUERY };
export { FETCH_ENROLREQUEST_COUNT_QUERY, FETCH_ENROLREQUEST_QUERY };
export { FETCH_ENROLPENDING_COUNT_QUERY, FETCH_ENROLPENDING_QUERY };
export { FETCH_UNCHECKED_NOTIFICATIONS_QUERY, FETCH_NOTIFICATIONS_QUERY };
export { GET_WARNING_COUNT_QUERY };
export {
  FETCH_FACE_PHOTOS_QUERY,
  FETCH_FACE_PHOTOS_COUNT_QUERY,
  FETCH_FACE_MATCHER_IN_COURSE_QUERY,
};
export { FETCH_PHOTO_PRIVACY_QUERY };
export {
  FETCH_ATTENDANCES_COUNT_QUERY,
  FETCH_ATTENDANCES_COUNT_IN_COURSE_QUERY,
  FETCH_ATTENDANCE_QUERY,
  FETCH_ATTENDANCES_QUERY,
  FETCH_ATTENDANCES_IN_COURSE_QUERY,
};
