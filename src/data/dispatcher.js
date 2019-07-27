import { normalize } from './normalizer'
import { request } from './fetch-client'
import { terms } from './terms'
import { students } from './students'
import { teachers } from './teachers'
import { courses } from './courses'
import { sessions } from './sessions'
import { extend } from './utils'

export const getIDsarray = (arrayOfObjects) => arrayOfObjects.map(i => i.id)

const stores = { terms, courses, students, teachers, sessions }

export const deluxeRequest = async ({ query, variables, remove = false, parentKey }) => {
  const response = await request(query, variables)
  console.log(response)
  if (remove) {
    stores[parentKey].update(previous => {
      const { [variables.id]: value, ...withoutThisOne } = previous
      return withoutThisOne
    })
    return true
  }

  // assumes the data in the response is the only property of the object
  // this doesn't seem like a safe assumption
  // probably best to get it from the query with regex
  const newResponse = { ...response }
  const normalized = normalize(newResponse[Object.keys(response)[0]], parentKey)
  console.log(normalized)
  for (const type in normalized.entities) {
    if ({}.hasOwnProperty.call(normalized.entities, type)) {
      stores[type].update(previous => extend(previous, normalized.entities[type]))
    }
  }
  return response
}
