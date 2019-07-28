const resolvers = {
  Query: {
    isLoggedIn () {
      return !!window.localStorage.getItem('token')
    }
  }
}

export default resolvers
