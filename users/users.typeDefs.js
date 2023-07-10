import { gql } from "graphql-tag";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    password: String!
    avatarUrl: String
    githubUsername: String
    createdAt: String!
    updatedAt: String!
  }
`;
