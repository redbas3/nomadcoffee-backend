import { gql } from "graphql-tag";

export default gql`
  scalar Upload
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      username: String
      email: String
      name: String
      location: String
      password: String
      avatarUrl: Upload
      githubUsername: String
    ): EditProfileResult!
  }
`;
