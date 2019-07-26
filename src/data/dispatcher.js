import normalize from 'universal-normalizer'
import { request } from './fetch-client'
import { terms } from './terms'
import { students } from './students'
import { teachers } from './teachers'
import { courses } from './courses'

function extend (object, source) {
  Object.keys(source).forEach(function (key) { object[key] = source[key] })
  return object
}

export const getIDsarray = (arrayOfObjects) => arrayOfObjects.map(i => i.id)

const stores = { terms, courses, students, teachers }

export const deluxeRequest = async ({ query, variables, remove = false, parentKey }) => {
  const response = await request(query, variables)
  if (remove) {
    stores[parentKey].update(previous => {
      const { [variables.id]: value, ...withoutThisOne } = previous
      return withoutThisOne
    })
    return true
  }
  console.log('response', response)
  // assumes the data in the response is the only property of the object
  // this doesn't seem like a safe assumption
  // probably best to get it from the query with regex
  const normalized = normalize(response[Object.keys(response)[0]], parentKey)
  console.log('normalized', normalized)
  for (const type in normalized.entities) {
    if (normalized.entities.hasOwnProperty(type)) {
      stores[type].update(previous => extend(previous, normalized.entities[type]))
    }
  }
  return response
}
