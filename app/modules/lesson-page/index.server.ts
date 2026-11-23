/**
 * The data behind a Student's Lesson page: the Course and its curriculum,
 * progress and watch position, the Discussion thread and the Lesson quiz.
 * Moved out of the route so the route file stays readable.
 */
export {
  calculateWatchProgress,
  flattenCourseLessons,
  getCommentById,
  getCourseWithDetails,
  getLastWatchPosition,
  getLessonById,
  getLessonProgress,
  getLessonProgressForCourse,
  getLessonThread,
  getModuleById,
  getUserById,
  markLessonComplete,
  markLessonInProgress,
  renderThread,
} from "./lib/lesson-data.server";
export {
  computeResult,
  getBestAttempt,
  getQuizById,
  getQuizByLessonId,
  getQuizWithQuestions,
} from "./lib/quiz.server";
