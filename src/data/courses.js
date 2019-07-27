import { writable } from 'svelte/store'
import { extend } from './utils'
import { ADD_TEACHER_TO_COURSE } from './mutations'
import { request } from './fetch-client'
import { teachers } from './teachers'
import { normalize } from './normalizer'

const createCoursesStore = () => {
  const { subscribe, update } = writable({})
  return {
    subscribe,
    update,
    merge: (newItems) => {
      update(previous => extend(previous, newItems))
    },
    addTeacher: async (userId, courseId) => {
      const response = await request(ADD_TEACHER_TO_COURSE, { courseId, id: userId })
      if (response.addTeacherToCourse) {
        update(previous => {
          previous[courseId].teachers = [...previous[courseId].teachers, userId]
          return previous
        })
        teachers.update(previous => {
          if (previous[userId]) {
            previous[userId].courses = [...previous[userId].courses, courseId]
          } else {
            previous[userId] = { ...response.addTeacherToCourse.teachers[0], courses: [courseId] }
          }
          return previous
        })
      }
    }
  }
}
export const courses = createCoursesStore()
