import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    password: String!
    avatarUrl: Upload
    githubUsername: String
    createdAt: String!
    updatedAt: String!
  }
`;
