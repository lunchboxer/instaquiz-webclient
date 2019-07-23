import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { GET_TERMS } from './queries'
import { DELETE_TERM, CREATE_TERM, UPDATE_TERM } from './mutations'

const createTermStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    get: async () => {
      const response = await request(GET_TERMS)
      set(response.terms)
    },
    remove: async id => {
      const response = await request(DELETE_TERM, { id })
      update(previous =>
        previous.filter(term => response.deleteTerm.id !== term.id)
      )
    },
    create: async (input) => {
      const response = await request(CREATE_TERM, { ...input })
      update(previous => [...previous, response.createTerm])
    },
    patch: async (id, input) => {
      const response = await request(UPDATE_TERM, { id, input })
      update(previous => previous.map((term) => {
        if (term.id !== id) return term
        return response.updateTerm
      }))
    }
  }
}

export const terms = createTermStore()
