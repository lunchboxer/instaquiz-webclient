import { writable } from 'svelte/store'

const createCoursesStore = () => {
  const { subscribe, update } = writable({})
  return {
    subscribe,
    update
  }
}
export const courses = createCoursesStore()
