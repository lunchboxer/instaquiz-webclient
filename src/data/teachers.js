import { writable } from 'svelte/store'
import { extend } from './utils'

const createTeachersStore = () => {
  const { subscribe, update } = writable({})
  return {
    subscribe,
    update,
    merge: (newItems) => {
      update(previous => extend(previous, newItems))
    }
  }
}
export const teachers = createTeachersStore()
