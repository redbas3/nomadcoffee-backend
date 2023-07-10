import { gql } from "graphql-tag";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String
      password: String!
      githubUsername: String
    ): CreateAccountResult!
  }
`;
