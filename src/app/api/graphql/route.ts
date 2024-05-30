// example code for graphql
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'

export const dynamic = 'force-static'

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }
  type Post {
    id: String!
    title: String!
  }
  type Query {
    getUser(id: String!): User
    getPosts: [Post!]!
  }
`

const resolvers = {
  Query: {
    getUser: async () =>
      new Promise((resolve) => {
        setTimeout(() => resolve({ id: '1', name: 'John' }), 1000)
      }),
    getPosts: async () =>
      new Promise((resolve) => {
        setTimeout(
          () =>
            resolve([
              { id: '1', title: 'Post 1' },
              { id: '2', title: 'Post 2' },
            ]),
          3500,
        )
      }),
  },
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
})

const handler = startServerAndCreateNextHandler(server)

export const GET = async (request: Request) => {
  return handler(request)
}

export const POST = async (request: Request) => {
  return handler(request)
}
