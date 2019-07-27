import { writable } from 'svelte/store'
import { extend } from './utils'

const createSessionsStore = () => {
  const { subscribe, update } = writable({})
  return {
    subscribe,
    update,
    merge: (newItems) => {
      update(previous => extend(previous, newItems))
    }
  }
}
export const sessions = createSessionsStore()
