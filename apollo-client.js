import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://parksville.stepzen.net/api/ornery-waterbuffalo/__graphql',
  headers: {
    Authorization: `Apikey  ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
  },
  cache: new InMemoryCache(),
})

export default client
