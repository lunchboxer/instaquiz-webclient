import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { split, ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const coldAuth = window.localStorage.getItem('token')
  const token = coldAuth ? JSON.parse(coldAuth) : null
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const cache = new InMemoryCache()

let errorsLink

if (process.env.NODE_ENV === 'development') {
  errorsLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }
    if (networkError) console.error(`[Network error]: ${networkError}`)
  })
}

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4001',
  options: {
    reconnect: true,
    lazy: true
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4001'
})

const remoteLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

export const client = new ApolloClient({
  link: ApolloLink.from([errorsLink, authLink, remoteLink]),
  cache
})

const data = { isLoggedIn: !!window.localStorage.getItem('token') }
// Default Data
cache.writeData({ data })

client.onResetStore(() => cache.writeData({ data }))