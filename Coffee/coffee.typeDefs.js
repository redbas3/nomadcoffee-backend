import { gql } from "apollo-server";

export default gql`
  type Coffee {
    id: Int!
    coffeename: String!
    createdAt: String!
    updatedAt: String!
  }
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String!
    avatarURL: String!
    githubUsername: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    coffees: [Coffee]
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String
      password: String!
      avatarURL: String!
      githubUsername: String!
    ): Boolean
  }
`;
