import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { CREATE_COURSE } from './mutations'

const createCourseStore = () => {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    // remove: async id => {
    //   const response = await request(DELETE_COURSE, { id })
    //   update(previous =>
    //     previous.filter(term => response.deleteCourse.id !== term.id)
    //   )
    // },
    create: async (input) => {
      const response = await request(CREATE_COURSE, { ...input })
      update(previous => [...previous, response.createCourse])
    }
  }
}

export const courses = createCourseStore()
