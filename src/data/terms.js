import { writable, derived } from 'svelte/store'

const createTermsStore = () => {
  const { subscribe, update } = writable({})
  return {
    subscribe,
    update
  }
}
export const terms = createTermsStore()

export const currentTerm = derived(terms, ($terms, set) => {
  const now = new Date().toJSON()
  const currentKey = Object.keys($terms).find(key => {
    return $terms[key].startDate < now && $terms[key].endDate > now
  })
  set($terms[currentKey])
})

export const nextTerm = derived(terms, ($terms, set) => {
  const now = new Date().toJSON()
  const future = Object.keys($terms).filter(key => {
    return $terms[key].startDate > now
  })
  const ids = future.sort((a, b) => {
    return $terms[a].startDate.localeCompare($terms[b].startDate)
  })
  set($terms[ids[0]])
})
